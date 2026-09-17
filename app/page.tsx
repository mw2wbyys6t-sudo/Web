'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import { siteConfig } from '@/lib/config'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-56 h-72 md:w-64 md:h-80 rounded-3xl overflow-hidden glass-card !p-0">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-blue))', opacity: 0.15 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles size={40} className="mx-auto mb-3 text-[var(--accent-pink)]" />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>你的头像</p>
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div
              className="absolute -inset-4 rounded-3xl -z-10 opacity-30 blur-xl"
              style={{ background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-blue))' }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {siteConfig.title}
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              {siteConfig.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/projects" className="glass-btn glass-btn-primary flex items-center gap-2">
                看看我的作品 <ArrowRight size={18} />
              </Link>
              <a href="#about" className="glass-btn">了解更多</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About / Skills Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            我的技能
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.skills.map((group, gi) => (
              <GlassCard key={group.category} delay={gi * 0.1} className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-[var(--accent-pink)]">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span key={skill} className="glass-tag">{skill}</span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            精选作品
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <GlassCard key={i} delay={i * 0.1} className="overflow-hidden">
                <div
                  className="h-40 w-full"
                  style={{ background: `linear-gradient(${135 + i * 30}deg, var(--accent-pink), var(--accent-blue))`, opacity: 0.2 }}
                />
                <div className="p-5">
                  <h3 className="font-semibold mb-2">项目 {i}</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                    这是一个示例项目描述，你可以在 content/projects/ 中添加你的真实项目。
                  </p>
                  <div className="flex gap-2">
                    <span className="glass-tag text-xs">React</span>
                    <span className="glass-tag text-xs">TypeScript</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/projects" className="glass-btn inline-flex items-center gap-2">
              查看全部作品 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            最新文章
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <GlassCard key={i} delay={i * 0.1} className="p-6">
                <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>2024-01-{10 + i}</p>
                <h3 className="font-semibold mb-2">文章标题 {i}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  这是一篇示例文章的摘要，你可以在 content/blog/ 中添加你的真实文章。
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/blog" className="glass-btn inline-flex items-center gap-2">
              查看全部文章 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
