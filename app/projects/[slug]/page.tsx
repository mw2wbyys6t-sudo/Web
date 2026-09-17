import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllProjects, getProjectBySlug, markdownToHtml } from '@/lib/content'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'

export function generateStaticParams() {
  return getAllProjects().map(project => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: '项目未找到 | 个人网站' }
  return {
    title: `${project.title} | 个人网站`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const contentHtml = await markdownToHtml(project.content)

  return (
    <article className="relative z-10 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[var(--accent-pink)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> 返回作品列表
        </Link>

        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h1>
          <p className="text-base mb-5" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="glass-tag text-xs">{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn glass-btn-primary inline-flex items-center gap-2 !py-2.5 !px-5 !text-sm"
              >
                <ExternalLink size={16} /> 在线预览
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn inline-flex items-center gap-2 !py-2.5 !px-5 !text-sm"
              >
                <GithubIcon width={16} height={16} /> 查看源码
              </a>
            )}
          </div>
        </header>

        <div className="glass-card p-8 md:p-10">
          <div className="prose-glass" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </article>
  )
}
