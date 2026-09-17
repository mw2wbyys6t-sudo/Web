import fs from 'fs'
import path from 'path'
import { getAllPosts, getAllProjects } from '@/lib/content'
import { siteConfig } from '@/lib/config'
import HomeContent from '@/components/HomeContent'

export default function HomePage() {
  const projects = getAllProjects()
    .slice(0, 3)
    .map(project => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      tags: project.tags,
      image: project.image,
      stars: project.stars,
    }))

  const posts = getAllPosts()
    .slice(0, 3)
    .map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      stats: post.stats,
    }))

  const avatarPath = path.join(process.cwd(), 'public', siteConfig.avatar)
  const avatar = fs.existsSync(avatarPath) ? siteConfig.avatar : null

  return <HomeContent projects={projects} posts={posts} avatar={avatar} />
}
