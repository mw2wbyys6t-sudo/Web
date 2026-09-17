'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import { ExternalLink, Github } from 'lucide-react'

const sampleProjects = [
  {
    slug: 'project-1',
    title: '示例项目 1',
    description: '一个使用 React 和 TypeScript 构建的 Web 应用，展示了现代前端开发的最佳实践。',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    github: '#',
  },
  {
    slug: 'project-2',
    title: '示例项目 2',
    description: '一个全栈应用，使用 Next.js 和 PostgreSQL，实现了用户认证和数据管理功能。',
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    link: '#',
    github: '#',
  },
  {
    slug: 'project-3',
    title: '示例项目 3',
    description: '一个移动端友好的 PWA 应用，支持离线使用和推送通知。',
    tags: ['Vue', 'PWA', 'Firebase'],
    link: '#',
    github: '#',
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            我的作品
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            这里是我做过的一些项目，点击查看详情
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProjects.map((project, i) => (
            <GlassCard key={project.slug} delay={i * 0.1} className="overflow-hidden group">
              {/* Image Placeholder */}
              <div
                className="h-48 w-full relative overflow-hidden"
                style={{ background: `linear-gradient(${135 + i * 45}deg, var(--accent-pink), var(--accent-blue))`, opacity: 0.85 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/60 text-sm">项目封面</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="glass-tag text-xs">{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      className="flex items-center gap-1 text-sm font-medium text-[var(--accent-pink)] hover:underline"
                    >
                      <ExternalLink size={14} /> 在线预览
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-pink)]"
                    >
                      <Github size={14} /> 源码
                    </a>
                  )}
                </div>
              </div>
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
          提示：在 content/projects/ 目录下添加 Markdown 文件即可添加新项目
        </motion.p>
      </div>
    </div>
  )
}
