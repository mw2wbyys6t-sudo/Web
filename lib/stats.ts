import { getAllPosts, getAllProjects } from './content'
import type { ContentStats } from './types'

const REQUEST_TIMEOUT = 10000
const GITHUB_CONCURRENCY = 2
const GITHUB_GAP_MS = 250
const CSDN_GAP_MS = 5000

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

export interface ProjectStars {
  [slug: string]: number
}

export interface PostStats {
  [slug: string]: ContentStats
}

export interface LiveStats {
  projects: ProjectStars
  posts: PostStats
  updatedAt: string
}

const CSDN_META =
  /文章浏览阅读\s*(\d+)\s*次\s*[，,]\s*点赞\s*(\d+)\s*次\s*[，,]\s*收藏\s*(\d+)\s*次/

// GitHub 星标改抓 HTML：GitHub API 未鉴权时限流很严（共享 IP 常 403），
// 页面里的 repo-stars-counter-star 带有精确数字，更稳定。
const GH_STARS_TITLE = /id="repo-stars-counter-star"[^>]*title="([\d,]+)"/
const GH_STARS_TEXT = /id="repo-stars-counter-star"[^>]*>\s*([\d.,]+)\s*([km])?\s*</i

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length)
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

async function fetchOnce(url: string, accept: string): Promise<string | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': UA, Accept: accept },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function fetchText(url: string, accept = 'text/html', retries = 2): Promise<string | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const text = await fetchOnce(url, accept)
    if (text) return text
    if (attempt < retries) await sleep(3000 * (attempt + 1))
  }
  return null
}

function githubSlug(url: string): string | null {
  if (!url) return null
  try {
    const seg = new URL(url).pathname.split('/').filter(Boolean)
    if (seg.length >= 2) return `${seg[0]}/${seg[1]}`
  } catch {
    return null
  }
  return null
}

export function parseCsdnStats(html: string): ContentStats | null {
  // 仅信任 meta 描述中的聚合数据；其余 DOM 计数由 JS 渲染，静态 HTML 可能为空，
  // 若用它们兜底会把 0 写进去，因此缺失时直接跳过、保留原值。
  const meta = html.match(CSDN_META)
  if (!meta) return null
  return { views: Number(meta[1]), likes: Number(meta[2]), favorites: Number(meta[3]) }
}

export function parseStarCount(html: string): number | null {
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

export async function fetchProjectStars(): Promise<ProjectStars> {
  const projects = getAllProjects().filter(project => githubSlug(project.github || ''))
  const out: ProjectStars = {}

  await mapLimit(projects, GITHUB_CONCURRENCY, async project => {
    const repo = githubSlug(project.github || '') as string
    const html = await fetchText(`https://github.com/${repo}`, 'text/html', 1)
    await sleep(GITHUB_GAP_MS)
    if (!html) return
    const stars = parseStarCount(html)
    if (stars !== null) out[project.slug] = stars
  })

  return out
}

export async function fetchPostStats(): Promise<PostStats> {
  const entries = getAllPosts()
    .map(post => ({
      slug: post.slug,
      url: post.links.find(link => /blog\.csdn\.net/i.test(link.url))?.url,
    }))
    .filter((entry): entry is { slug: string; url: string } => Boolean(entry.url))

  const out: PostStats = {}

  // CSDN 有 Cloudflare 频率限制，必须串行 + 留出间隔，否则会返回 521。
  await mapLimit(entries, 1, async entry => {
    const html = await fetchText(entry.url)
    await sleep(CSDN_GAP_MS)
    if (!html) return
    const stats = parseCsdnStats(html)
    if (stats) out[entry.slug] = stats
  })

  return out
}
