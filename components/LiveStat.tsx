'use client'

import { useEffect, useState } from 'react'

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

export type LiveStatKind = 'stars' | 'views' | 'likes' | 'favorites'

interface LiveStatProps {
  kind: LiveStatKind
  slug: string
  fallback: number
}

export default function LiveStat({ kind, slug, fallback }: LiveStatProps) {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    let alive = true
    loadStats().then(data => {
      if (!alive || !data) return
      const next = kind === 'stars' ? data.projects?.[slug] : data.posts?.[slug]?.[kind]
      if (typeof next === 'number' && Number.isFinite(next)) setValue(next)
    })
    return () => {
      alive = false
    }
  }, [kind, slug])

  return <>{value}</>
}
