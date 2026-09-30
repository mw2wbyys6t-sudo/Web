// 访客端实时数据源：直接向 GitHub 公开 API 拿星标数与关注者数。
//
// 为什么放在浏览器里做：站点是纯静态托管的（GitHub Pages 没有服务端），
// 构建期快照只有在重新部署时才会变。而 api.github.com 允许跨域，
// 因此访客打开页面时就能拿到当前真实的数字，不需要等下一次构建。
//
// 拿不到时（限流、断网）一律返回 null，由调用方回落到构建期快照，页面不会空着。

import { siteConfig } from './config'

const API = 'https://api.github.com'
// 同一浏览器会话内的缓存时长：既保证“够新”，也避免翻页时反复请求把额度用光
// （未鉴权的 GitHub API 是每个 IP 每小时 60 次）。
const TTL_MS = 10 * 60 * 1000

const memory = new Map<string, number>()
const inflight = new Map<string, Promise<number | null>>()

/** 从 GitHub 仓库地址解析出 `owner/repo`，非 GitHub 或格式不对时返回 null。 */
export function parseRepo(githubUrl?: string | null): string | null {
  if (!githubUrl) return null
  try {
    const segments = new URL(githubUrl).pathname.split('/').filter(Boolean)
    if (segments.length >= 2) return `${segments[0]}/${segments[1]}`
  } catch {
    // 不是合法 URL，按拿不到处理
  }
  return null
}

function storageKey(id: string) {
  return `live-github:${id}`
}

function readCache(id: string): number | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(storageKey(id))
    if (!raw) return null
    const entry = JSON.parse(raw) as { value?: unknown; at?: unknown }
    if (typeof entry.value !== 'number' || typeof entry.at !== 'number') return null
    if (Date.now() - entry.at > TTL_MS) return null
    return entry.value
  } catch {
    // sessionStorage 不可用（隐私模式等）时退化为仅内存缓存
    return null
  }
}

function writeCache(id: string, value: number) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(storageKey(id), JSON.stringify({ value, at: Date.now() }))
  } catch {
    // 写不进去就只留内存缓存
  }
}

function githubLogin(): string | null {
  const github = siteConfig.social.find(item => item.key === 'github')
  return parseRepo(github?.url)?.split('/')[0] ?? null
}

async function fetchNumber(id: string, endpoint: string, field: string): Promise<number | null> {
  const cachedMemory = memory.get(id)
  if (typeof cachedMemory === 'number') return cachedMemory

  const cachedStorage = readCache(id)
  if (cachedStorage !== null) {
    memory.set(id, cachedStorage)
    return cachedStorage
  }

  const pending = inflight.get(id)
  if (pending) return pending

  const task = (async () => {
    try {
      const res = await fetch(`${API}/${endpoint}`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) return null
      const data = (await res.json()) as Record<string, unknown>
      const value = data[field]
      if (typeof value !== 'number' || !Number.isFinite(value)) return null
      memory.set(id, value)
      writeCache(id, value)
      return value
    } catch {
      return null
    } finally {
      inflight.delete(id)
    }
  })()

  inflight.set(id, task)
  return task
}

/** 仓库当前星标数；repo 为空或请求失败时返回 null。 */
export function fetchRepoStars(repo: string | null): Promise<number | null> {
  if (!repo) return Promise.resolve(null)
  return fetchNumber(`stars:${repo}`, `repos/${repo}`, 'stargazers_count')
}

/** 站点 GitHub 账号当前的关注者数；获取失败时返回 null。 */
export function fetchFollowers(): Promise<number | null> {
  const login = githubLogin()
  if (!login) return Promise.resolve(null)
  return fetchNumber(`followers:${login}`, `users/${login}`, 'followers')
}