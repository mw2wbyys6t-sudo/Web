#!/usr/bin/env node
// 刷新内容快照：从 GitHub 抓取 stars 与关注者数、从 CSDN 抓取阅读/点赞/收藏，回写到源文件。
// 用法：npm run sync-stats

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const CONTENT = path.join(ROOT, 'content')
const CONFIG_FILE = path.join(ROOT, 'lib', 'config.ts')
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

// GitHub 个人页的关注者数量是浏览器端渲染的，静态 HTML 里拿不到数字（已实测确认），
// 因此必须走 REST API。CI 里会带上 GITHUB_TOKEN：既提高额度，也避免共享 IP 被限流。
async function fetchGithubUser(login) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || ''
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)
  try {
    const res = await fetch(`https://api.github.com/users/${login}`, {
      signal: controller.signal,
      headers: {
        'User-Agent': UA,
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

function githubLogin() {
  // 从站点配置里取 GitHub 账号，避免在这里再维护一份用户名。
  const raw = fs.readFileSync(CONFIG_FILE, 'utf8')
  const match = raw.match(/https:\/\/github\.com\/([A-Za-z0-9-]+)/)
  return match ? match[1] : null
}

async function syncFollowers() {
  const login = githubLogin()
  if (!login) return null

  const user = await fetchGithubUser(login)
  if (!user || typeof user.followers !== 'number') return null

  const raw = fs.readFileSync(CONFIG_FILE, 'utf8')
  // 注意 config.ts 里是缩进 + 行尾逗号的写法（`  githubFollowers: 1,`），
  // 因此不能像 frontmatter 那样用 `^key:` 加 `$` 行尾来匹配。
  const updated = raw.replace(/^([ \t]*githubFollowers:[ \t]*)\d+/m, `$1${user.followers}`)
  if (updated === raw) return { login, value: user.followers, changed: false }
  fs.writeFileSync(CONFIG_FILE, updated)
  return { login, value: user.followers, changed: true }
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

  console.log('同步 GitHub 关注者数 ...')
  const followers = await syncFollowers()
  if (!followers) {
    console.log('  未获取到数据，保留原值。')
  } else {
    const suffix = followers.changed ? '' : '（已是最新）'
    console.log(`  ✓ githubFollowers → ${followers.value}（${followers.login}）${suffix}`)
  }

  const total = projects.length + posts.length + (followers && followers.changed ? 1 : 0)
  console.log(total === 0 ? '\n数据已是最新，无需更新。' : `\n完成：更新 ${total} 项。`)
}

main().catch(err => {
  console.error('同步失败：', err)
  process.exit(1)
})
