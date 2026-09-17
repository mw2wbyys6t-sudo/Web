import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/content'
import { ArrowLeft, Calendar, FolderOpen, Eye, ThumbsUp, Bookmark } from 'lucide-react'
import ContentLinks from '@/components/ContentLinks'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: '文章未找到 | 个人网站' }
  return {
    title: `${post.title} | 个人网站`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentHtml = await markdownToHtml(post.content)

  return (
    <article className="relative z-10 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[var(--accent-pink)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> 返回文章列表
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="inline-flex items-center gap-1.5 text-[var(--accent-pink)]">
              <FolderOpen size={14} />
              {post.category}
            </span>
            {post.date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
            )}
            {post.stats && (
              <span className="inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1" title="阅读量">
                  <Eye size={13} /> {post.stats.views}
                </span>
                <span className="inline-flex items-center gap-1" title="点赞">
                  <ThumbsUp size={13} /> {post.stats.likes}
                </span>
                <span className="inline-flex items-center gap-1" title="收藏">
                  <Bookmark size={13} /> {post.stats.favorites}
                </span>
              </span>
            )}
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="glass-tag text-xs">{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className="glass-card p-8 md:p-10">
          <div className="prose-glass" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <ContentLinks links={post.links} />
      </div>
    </article>
  )
}
