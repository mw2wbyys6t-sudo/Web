'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import { ExternalLink, FolderOpen, Star } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'

export interface ProjectListItem {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  image?: string
  stars?: number
  link?: string
  github?: string
}

export default function ProjectList({ projects }: { projects: ProjectListItem[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map(p => p.category).filter(Boolean))
    return ['全部', ...Array.from(set)]
  }, [projects])

  const [active, setActive] = useState('全部')

  if (projects.length === 0) {
    return (
      <p className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
        还没有项目，去 content/projects/ 添加你的第一个吧。
      </p>
    )
  }

  const visible = active === '全部' ? projects : projects.filter(p => p.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-center mb-10">
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
                {projects.filter(p => p.category === category).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <GlassCard hover className="overflow-hidden h-full flex flex-col">
              <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
                <div
                  className="h-48 w-full relative overflow-hidden"
                  style={{
                    background: `linear-gradient(${135 + i * 45}deg, var(--accent-pink), var(--accent-blue))`,
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/75 text-sm font-medium">{project.category}</span>
                    </div>
                  )}

                  <span
                    className="absolute top-3 left-3 glass-tag text-xs !bg-[var(--glass-bg)] backdrop-blur-md"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.category}
                  </span>

                  {typeof project.stars === 'number' && (
                    <span
                      className="absolute top-3 right-3 inline-flex items-center gap-1 glass-tag text-xs !bg-[var(--glass-bg)] backdrop-blur-md"
                      style={{ color: 'var(--text-primary)' }}
                      title="GitHub Stars"
                    >
                      <Star size={12} className="text-[var(--accent-pink)]" fill="currentColor" />
                      {project.stars}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="glass-tag text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6 flex gap-4 -mt-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-[var(--accent-pink)] hover:underline"
                  >
                    <ExternalLink size={14} /> 在线预览
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium hover:text-[var(--accent-pink)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <GithubIcon width={14} height={14} /> 源码
                  </a>
                )}
                {!project.link && !project.github && (
                  <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <FolderOpen size={14} /> 查看详情
                  </span>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
          该分类下还没有项目。
        </p>
      )}
    </div>
  )
}
