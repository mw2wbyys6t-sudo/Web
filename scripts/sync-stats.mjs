#!/usr/bin/env node
// 刷新内容快照：从 GitHub 抓取 stars、从 CSDN 抓取阅读/点赞/收藏，回写 frontmatter。
// 用法：npm run sync-stats

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const CONTENT = path.join(ROOT, 'content')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const TIMEOUT = 12000
const GH_CONCURRENCY = 2
const GH_GAP_MS = 250
const CSDN_GAP_MS = 5000

const CSDN_META =
  /文章浏览阅读\s*(\d+)\s*次\s*[，,]\s*点赞\s*(\d+)\s*次\s*[，,]\s*收藏\s*(\d+)\s*次/
const GH_STARS_TITLE = /id="repo-stars-counter-star"[^>]*title="([\d,]+)"/
const GH_STARS_TEXT = /id="repo-stars-counter-star"[^>]*>\s*([\d.,]+)\s*([km])?\s*</i

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length)
  let cursor = 0
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
    }
  }
  const size = Math.max(1, Math.min(limit, items.length))
  await Promise.all(Array.from({ length: size }, () => worker()))
  return results
}

async function fetchOnce(url, accept) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': UA, Accept: accept },
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function fetchText(url, accept = 'text/html', retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const text = await fetchOnce(url, accept)
    if (text) return text
    if (attempt < retries) await sleep(3000 * (attempt + 1))
  }
  return null
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(dir, f))
}

function frontmatterBlock(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? match[1] : ''
}

function parseStarCount(html) {
  const title = html.match(GH_STARS_TITLE)
  if (title) {
    const exact = Number(title[1].replace(/,/g, ''))
    if (Number.isFinite(exact)) return exact
  }
  const text = html.match(GH_STARS_TEXT)
  if (text) {
    const base = Number(text[1].replace(/,/g, ''))
    if (!Number.isFinite(base)) return null
    const unit = (text[2] || '').toLowerCase()
    if (unit === 'k') return Math.round(base * 1000)
    if (unit === 'm') return Math.round(base * 1000000)
    return base
  }
  return null
}

function parseCsdnStats(html) {
  // 仅信任 meta 描述中的聚合数据，缺失则跳过以避免写入错误值。
  const meta = html.match(CSDN_META)
  if (!meta) return null
  return { views: Number(meta[1]), likes: Number(meta[2]), favorites: Number(meta[3]) }
}

function firstCsdnUrl(block) {
  const url = block.match(/url:\s*"([^"]*blog\.csdn\.net[^"]*)"/i)
  return url ? url[1] : null
}

function githubRepo(block) {
  const url = block.match(/^github:\s*"([^"]+)"/m)
  if (!url) return null
  try {
    const seg = new URL(url[1]).pathname.split('/').filter(Boolean)
    if (seg.length >= 2) return `${seg[0]}/${seg[1]}`
  } catch {
    return null
  }
  return null
}

async function syncProjects() {
  const files = listMarkdown(path.join(CONTENT, 'projects'))
  const jobs = files
    .map(file => ({ file, repo: githubRepo(frontmatterBlock(fs.readFileSync(file, 'utf8'))) }))
    .filter(job => job.repo)

  const results = await mapLimit(jobs, GH_CONCURRENCY, async job => {
    const html = await fetchText(`https://github.com/${job.repo}`, 'text/html', 1)
    await sleep(GH_GAP_MS)
    if (!html) return null

    const stars = parseStarCount(html)
    if (stars === null) return null

    const raw = fs.readFileSync(job.file, 'utf8')
    const updated = raw.replace(/^(stars:\s*)\d+\s*$/m, `$1${stars}`)
    if (updated === raw) return null
    fs.writeFileSync(job.file, updated)
    return `${path.basename(job.file, '.md')} → ${stars}★`
  })

  return results.filter(Boolean)
}

async function syncPosts() {
  const files = listMarkdown(path.join(CONTENT, 'blog'))
  const jobs = files
    .map(file => ({ file, url: firstCsdnUrl(frontmatterBlock(fs.readFileSync(file, 'utf8'))) }))
    .filter(job => job.url)

  const results = await mapLimit(jobs, 1, async job => {
    const html = await fetchText(job.url)
    await sleep(CSDN_GAP_MS)
    if (!html) return null
    const stats = parseCsdnStats(html)
    if (!stats) return null

    const raw = fs.readFileSync(job.file, 'utf8')
    const updated = raw.replace(
      /(stats:\s*\n\s*views:\s*)\d+(\s*\n\s*likes:\s*)\d+(\s*\n\s*favorites:\s*)\d+/,
      `$1${stats.views}$2${stats.likes}$3${stats.favorites}`
    )
    if (updated === raw) return null
    fs.writeFileSync(job.file, updated)
    return `${path.basename(job.file, '.md')} → ${stats.views}阅读 / ${stats.likes}赞 / ${stats.favorites}收藏`
  })

  return results.filter(Boolean)
}

async function main() {
  console.log('同步 GitHub stars ...')
  const projects = await syncProjects()
  projects.forEach(line => console.log(`  ✓ ${line}`))

  console.log('同步 CSDN 数据 ...')
  const posts = await syncPosts()
  posts.forEach(line => console.log(`  ✓ ${line}`))

  if (projects.length === 0 && posts.length === 0) {
    console.log('  数据已是最新，无需更新。')
  } else {
    console.log(`\n完成：更新 ${projects.length + posts.length} 项。`)
  }
}

main().catch(err => {
  console.error('同步失败：', err)
  process.exit(1)
})
