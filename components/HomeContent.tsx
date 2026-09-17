'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import GlassCard from './GlassCard'
import GithubCta from './GithubCta'
import WaveDivider from './WaveDivider'
import { GithubIcon } from './icons/BrandIcons'
import { siteConfig } from '@/lib/config'
import { ArrowRight, Sparkles, MapPin, Sparkle } from 'lucide-react'

const MARQUEE_WORDS = [
  'AI AGENT', '二次元', 'CREATIVE CODE', '开源', 'HARMONYOS', '智能体',
  'NEXT.JS', '赛博', 'SKILL', '探索', 'FLUTTER', '未来感',
]

export interface HomeProject {
  slug: string
  title: string
  description: string
  tags: string[]
}

export interface HomePost {
  slug: string
  title: string
  date: string
  excerpt: string
}

interface HomeContentProps {
  projects: HomeProject[]
  posts: HomePost[]
  avatar: string | null
}

export default function HomeContent({ projects, posts, avatar }: HomeContentProps) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 120])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.25])

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-[85vh] flex items-center justify-center px-6"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative shrink-0"
          >
            <div className="w-56 h-72 md:w-64 md:h-80 rounded-3xl overflow-hidden glass-card !p-0 relative">
              {avatar ? (
                <Image src={avatar} alt={siteConfig.name} fill sizes="(max-width: 768px) 224px, 256px" className="object-cover" priority />
              ) : (
                <>
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-blue))',
                      opacity: 0.15,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles size={40} className="mx-auto mb-3 text-[var(--accent-pink)]" />
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>你的头像</p>
                    </div>
                  </div>
                </>
              )}
            </div>
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-flow"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {siteConfig.title}
            </h1>
            <p
              className="text-base md:text-lg mb-5 tracking-wider"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-latin)' }}
            >
              {siteConfig.titleEn}
            </p>
            <p className="text-lg md:text-xl mb-1 text-[var(--accent-pink)]">
              {siteConfig.subtitle}
            </p>
            <p className="text-sm md:text-base mb-5" style={{ color: 'var(--text-secondary)' }}>
              {siteConfig.subtitleEn}
            </p>
            <div className="flex justify-center md:justify-start mb-5">
              <span className="glass-tag inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {siteConfig.location} · {siteConfig.locationEn}
              </span>
            </div>
            <p className="text-sm md:text-base mb-8 max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {siteConfig.description}
              <br />
              <span className="opacity-80">{siteConfig.descriptionEn}</span>
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/projects" className="glass-btn glass-btn-primary flex items-center gap-2">
                看看我的作品 <ArrowRight size={18} />
              </Link>
              <a href="#about" className="glass-btn">了解更多</a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Marquee 跑马灯 */}
      <div className="marquee py-4" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(half => (
            <div key={half} className="flex items-center">
              {MARQUEE_WORDS.map(word => (
                <span
                  key={`${half}-${word}`}
                  className="flex items-center gap-3 px-6 text-sm font-semibold tracking-widest whitespace-nowrap"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-latin)' }}
                >
                  <Sparkle size={12} className="text-[var(--accent-violet)]" />
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <WaveDivider />

      {/* Skills Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span
              className="block text-xs tracking-[0.4em] mb-3 uppercase"
              style={{ color: 'var(--accent-violet)', fontFamily: 'var(--font-latin)' }}
            >
              Skills
            </span>
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

      <WaveDivider flip />

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span
                className="block text-xs tracking-[0.4em] mb-3 uppercase"
                style={{ color: 'var(--accent-violet)', fontFamily: 'var(--font-latin)' }}
              >
                Works
              </span>
              精选作品
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <GlassCard key={project.slug} delay={i * 0.1} className="overflow-hidden h-full flex flex-col">
                  <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
                    <div
                      className="h-40 w-full"
                      style={{
                        background: `linear-gradient(${135 + i * 30}deg, var(--accent-pink), var(--accent-blue))`,
                        opacity: 0.25,
                      }}
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="glass-tag text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
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
      )}

      {/* GitHub CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <span
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-blue))',
                    color: '#fff',
                  }}
                >
                  <GithubIcon width={32} height={32} />
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                我的开源项目都在 GitHub
              </h2>
              <p
                className="text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                这里展示的每一个作品，完整源码、开发过程与后续更新都托管在我的 GitHub 仓库，欢迎前往查看、star 与交流。
              </p>
              <GithubCta />
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <WaveDivider />

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span
                className="block text-xs tracking-[0.4em] mb-3 uppercase"
                style={{ color: 'var(--accent-violet)', fontFamily: 'var(--font-latin)' }}
              >
                Blog
              </span>
              最新文章
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <GlassCard key={post.slug} delay={i * 0.1} className="p-6 h-full">
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>{post.date}</p>
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                  </Link>
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
      )}
    </div>
  )
}
