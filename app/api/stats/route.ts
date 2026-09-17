import { getAllPosts, getAllProjects } from '@/lib/content'
import type { ContentStats } from '@/lib/types'

// 静态导出（GitHub Pages）只支持「构建期预渲染」的 Route Handler。
// 数据来源与页面保持一致：content/ 下 frontmatter 里的快照，
// 由 `npm run sync-stats` 抓取并写入（部署流水线会在构建前执行）。
// 这样构建过程完全不联网：既快，也不会因为外部抓取失败而中断部署。
export const dynamic = 'force-static'

export async function GET() {
  const projects: Record<string, number> = {}
  for (const project of getAllProjects()) {
    if (typeof project.stars === 'number') projects[project.slug] = project.stars
  }

  const posts: Record<string, ContentStats> = {}
  for (const post of getAllPosts()) {
    if (post.stats) posts[post.slug] = post.stats
  }

  return Response.json({
    projects,
    posts,
    updatedAt: new Date().toISOString(),
  })
}
