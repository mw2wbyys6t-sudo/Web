import { getAllProjects } from '@/lib/content'
import ProjectList from '@/components/ProjectList'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: '我的作品 | 个人网站',
  description: '我做过的项目：AI Skill、独立游戏与跨平台应用',
}

export default function ProjectsPage() {
  const projects = getAllProjects().map(project => ({
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: project.category,
    tags: project.tags,
    link: project.link,
    github: project.github,
  }))

  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <PageHeader title="我的作品" subtitle="AI Skill、独立游戏与跨平台应用，点击查看详情" />
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}
