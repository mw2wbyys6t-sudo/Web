import { getAllPosts } from '@/lib/content'
import BlogList from '@/components/BlogList'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: '我的文章 | 个人网站',
  description: '记录技术思考和生活感悟',
}

export default function BlogPage() {
  const posts = getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
  }))

  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="我的文章" subtitle="记录技术思考和生活感悟" />
        <BlogList posts={posts} />
        <p className="text-center mt-12 text-sm" style={{ color: 'var(--text-secondary)' }}>
          提示：在 content/blog/ 目录下添加 Markdown 文件即可发布新文章
        </p>
      </div>
    </div>
  )
}
