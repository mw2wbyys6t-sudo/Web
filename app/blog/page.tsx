import { getAllPosts } from '@/lib/content'
import BlogList from '@/components/BlogList'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: '我的文章 | 个人网站',
  description: '记录 AI 智能体、AI 编程与鸿蒙跨平台开发的实践与踩坑',
}

export default function BlogPage() {
  const posts = getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
  }))

  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <PageHeader eyebrow="Blog" title="我的文章" subtitle="记录 AI 智能体、AI 编程与鸿蒙跨平台开发的实践与踩坑" />
        <BlogList posts={posts} />
      </div>
    </div>
  )
}
