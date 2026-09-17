'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import { Calendar, Tag } from 'lucide-react'

export interface BlogListItem {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
        还没有文章，去 content/blog/ 添加你的第一篇吧。
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <GlassCard hover>
            <Link href={`/blog/${post.slug}`} className="block p-6">
              <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>

              <h2 className="text-xl font-semibold mb-3 hover:text-[var(--accent-pink)] transition-colors">
                {post.title}
              </h2>

              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size={14} style={{ color: 'var(--text-secondary)' }} />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="glass-tag text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}
