'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import { Calendar, Tag, FolderOpen, Eye, ThumbsUp, Bookmark, Search, X } from 'lucide-react'
import LiveStat from './LiveStat'

export interface BlogListItem {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  stats?: { views: number; likes: number; favorites: number }
}

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category).filter(Boolean))
    return ['全部', ...Array.from(set)]
  }, [posts])

  const [active, setActive] = useState('全部')
  const [query, setQuery] = useState('')

  if (posts.length === 0) {
    return (
      <p className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
        还没有文章，去 content/blog/ 添加你的第一篇吧。
      </p>
    )
  }

  const keyword = query.trim().toLowerCase()
  const visible = posts.filter(post => {
    if (active !== '全部' && post.category !== active) return false
    if (!keyword) return true
    return [post.title, post.excerpt, post.category, ...post.tags]
      .join(' ')
      .toLowerCase()
      .includes(keyword)
  })

  return (
    <div>
      {/* 搜索框：按标题 / 摘要 / 分类 / 标签做纯前端匹配 */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--text-secondary)' }}
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索标题、摘要或标签…"
          aria-label="搜索文章"
          className="glass-input"
          style={{ paddingLeft: 46, paddingRight: query ? 44 : 16 }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="清空搜索"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:text-[var(--accent-pink)]"
            style={{ color: 'var(--text-secondary)', background: 'var(--tag-bg)' }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`glass-tag ${active === category ? 'glass-tag-active' : ''}`}
            aria-pressed={active === category}
          >
            {category}
            {category !== '全部' && (
              <span className="ml-1.5 opacity-70">
                {posts.filter(p => p.category === category).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
        共 {visible.length} 篇
      </p>

      <div className="space-y-6">
        {visible.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <GlassCard hover>
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
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
                    <span className="inline-flex items-center gap-3 ml-auto">
                      <span className="inline-flex items-center gap-1">
                        <Eye size={13} /> <LiveStat kind="views" slug={post.slug} fallback={post.stats.views} />
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp size={13} /> <LiveStat kind="likes" slug={post.slug} fallback={post.stats.likes} />
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bookmark size={13} /> <LiveStat kind="favorites" slug={post.slug} fallback={post.stats.favorites} />
                      </span>
                    </span>
                  )}
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

      {visible.length === 0 && (
        <p className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
          {keyword ? '没有匹配的文章，换个关键词试试。' : '该分类下还没有文章。'}
        </p>
      )}
    </div>
  )
}
