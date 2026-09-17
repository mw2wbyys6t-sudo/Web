import { getAllProjects } from '@/lib/content'
import ProjectList from '@/components/ProjectList'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: '我的作品 | 个人网站',
  description: '这里是我做过的一些项目',
}

export default function ProjectsPage() {
  const projects = getAllProjects().map(project => ({
    slug: project.slug,
    title: project.title,
    description: project.description,
    tags: project.tags,
    link: project.link,
    github: project.github,
  }))

  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <PageHeader title="我的作品" subtitle="这里是我做过的一些项目，点击查看详情" />
        <ProjectList projects={projects} />
        <p className="text-center mt-12 text-sm" style={{ color: 'var(--text-secondary)' }}>
          提示：在 content/projects/ 目录下添加 Markdown 文件即可添加新项目
        </p>
      </div>
    </div>
  )
}
