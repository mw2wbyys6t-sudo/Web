import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { BlogPost, Project } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

export function getAllPosts(): BlogPost[] {
  const postsDir = path.join(contentDirectory, 'blog')
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(postsDir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
    }
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find(p => p.slug === slug) || null
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, 'projects')
  if (!fs.existsSync(projectsDir)) return []

  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
  return files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(projectsDir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      tags: data.tags || [],
      image: data.image || '/images/project-placeholder.png',
      link: data.link || '',
      github: data.github || '',
      content,
    }
  })
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects()
  return projects.find(p => p.slug === slug) || null
}
