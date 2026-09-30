'use client'

import { useEffect, useState } from 'react'
import { fetchFollowers, fetchRepoStars } from '@/lib/live-github'

export interface StatsPayload {
  projects: Record<string, number>
  posts: Record<string, { views: number; likes: number; favorites: number }>
  updatedAt?: string
}

// 静态部署在 GitHub Pages 子路径下，接口地址必须带上 basePath。
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

let memory: StatsPayload | null = null
let inflight: Promise<StatsPayload | null> | null = null

function loadStats(): Promise<StatsPayload | null> {
  if (memory) return Promise.resolve(memory)
  if (inflight) return inflight

  inflight = (async () => {
    try {
      const res = await fetch(`${BASE_PATH}/api/stats`, { cache: 'no-store' })
      if (!res.ok) return null
      const data = (await res.json()) as StatsPayload
      memory = data
      return data
    } catch {
      return null
    }
  })()

  return inflight
}

export type LiveStatKind = 'stars' | 'views' | 'likes' | 'favorites' | 'followers'

interface LiveStatProps {
  kind: LiveStatKind
  slug: string
  fallback: number
  /** 作品对应的仓库（`owner/repo`）。传入后 stars 优先取 GitHub 实时值。 */
  repo?: string | null
}

export default function LiveStat({ kind, slug, fallback, repo }: LiveStatProps) {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    let alive = true

    const apply = (next: number | null | undefined) => {
      if (alive && typeof next === 'number' && Number.isFinite(next)) setValue(next)
    }

    // 构建期快照（由 sync-stats 写入 content/）作为兜底
    const applySnapshot = () => {
      if (kind === 'followers') return
      loadStats().then(data => {
        if (!data) return
        if (kind === 'stars') {
          apply(data.projects?.[slug])
          return
        }
        apply(data.posts?.[slug]?.[kind])
      })
    }

    if (kind === 'followers') {
      // 关注者数只有 GitHub API 拿得到，失败就保留构建期快照
      fetchFollowers().then(apply)
    } else if (kind === 'stars' && repo) {
      // 星标数以 GitHub 实时值为准，限流/断网时回落到快照
      fetchRepoStars(repo).then(live => (live === null ? applySnapshot() : apply(live)))
    } else {
      applySnapshot()
    }

    return () => {
      alive = false
    }
  }, [kind, slug, repo])

  return <>{value}</>
}
