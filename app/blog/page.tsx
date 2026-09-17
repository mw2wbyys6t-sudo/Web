'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import { Calendar, Tag } from 'lucide-react'

const samplePosts = [
  {
    slug: 'first-post',
    title: '我的第一篇文章',
    date: '2024-01-15',
    excerpt: '这是一篇示例文章，展示了如何使用 Markdown 来写博客。你可以在 content/blog/ 目录下添加你的真实文章。',
    tags: ['技术', '生活'],
  },
  {
    slug: 'second-post',
    title: '关于 Next.js 的一些思考',
    date: '2024-01-20',
    excerpt: 'Next.js 是一个非常强大的 React 框架，它提供了很多开箱即用的功能，比如路由、SSR、静态生成等。',
    tags: ['React', 'Next.js'],
  },
  {
    slug: 'third-post',
    title: '如何搭建一个漂亮的个人网站',
    date: '2024-02-01',
    excerpt: '本文将分享如何从零开始搭建一个具有昼夜切换和液态玻璃效果的个人网站。',
    tags: ['教程', '前端'],
  },
]

export default function BlogPage() {
  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            我的文章
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            记录技术思考和生活感悟
          </p>
        </motion.div>

        {/* Blog List */}
        <div className="space-y-6">
          {samplePosts.map((post, i) => (
            <GlassCard key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block p-6">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-3 hover:text-[var(--accent-pink)] transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2">
                  <Tag size={14} style={{ color: 'var(--text-secondary)' }} />
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="glass-tag text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          提示：在 content/blog/ 目录下添加 Markdown 文件即可发布新文章
        </motion.p>
      </div>
    </div>
  )
}
