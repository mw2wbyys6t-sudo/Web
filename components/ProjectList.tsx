'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'

export interface ProjectListItem {
  slug: string
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
}

export default function ProjectList({ projects }: { projects: ProjectListItem[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-center py-20" style={{ color: 'var(--text-secondary)' }}>
        还没有项目，去 content/projects/ 添加你的第一个吧。
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, i) => (
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
                  opacity: 0.85,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/70 text-sm">项目封面</span>
                </div>
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
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}
