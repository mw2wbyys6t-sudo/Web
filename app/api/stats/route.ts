import { NextResponse } from 'next/server'
import { fetchProjectStars, fetchPostStats } from '@/lib/stats'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const GITHUB_TTL = 60 * 60 * 1000
const CSDN_TTL = 6 * 60 * 60 * 1000

type ProjectMap = Record<string, number>
type PostMap = Record<string, { views: number; likes: number; favorites: number }>

interface Slot<T> {
  data: T
  at: number
  refreshing: Promise<void> | null
}

const projectsSlot: Slot<ProjectMap> = { data: {}, at: 0, refreshing: null }
const postsSlot: Slot<PostMap> = { data: {}, at: 0, refreshing: null }

function refresh<T>(slot: Slot<T>, loader: () => Promise<T>) {
  if (slot.refreshing) return
  slot.refreshing = loader()
    .then(data => {
      // 只有拿到数据才刷新时间戳，避免抓取失败时把空结果缓存一整个周期。
      if (Object.keys(data as object).length > 0) {
        slot.data = data
        slot.at = Date.now()
      }
    })
    .catch(() => {
      /* 保留旧缓存 */
    })
    .finally(() => {
      slot.refreshing = null
    })
}

export async function GET() {
  // 全部走「内存缓存 + 后台刷新」，接口本身永不阻塞在外部请求上。
  if (Date.now() - projectsSlot.at > GITHUB_TTL) refresh(projectsSlot, fetchProjectStars)
  if (Date.now() - postsSlot.at > CSDN_TTL) refresh(postsSlot, fetchPostStats)

  return NextResponse.json(
    {
      projects: projectsSlot.data,
      posts: postsSlot.data,
      updatedAt: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
