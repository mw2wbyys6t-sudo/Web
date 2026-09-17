import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'
import type { BlogPost, Project, ContentLink, ContentStats } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

function parseLinks(value: unknown): ContentLink[] {
  if (!Array.isArray(value)) return []
  return value
    .map(item => {
      const link = item as { label?: unknown; url?: unknown }
      return {
        label: typeof link?.label === 'string' ? link.label : '',
        url: typeof link?.url === 'string' ? link.url : '',
      }
    })
    .filter(link => link.url.length > 0)
}

function parseStats(value: unknown): ContentStats | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const stats = value as { views?: unknown; likes?: unknown; favorites?: unknown }
  const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
  return { views: num(stats.views), likes: num(stats.likes), favorites: num(stats.favorites) }
}

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
      category: data.category || '未分类',
      tags: data.tags || [],
      stats: parseStats(data.stats),
      links: parseLinks(data.links),
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
  const result = await remark().use(remarkGfm).use(html).process(markdown)
  return result.toString()
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, 'projects')
  if (!fs.existsSync(projectsDir)) return []

  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
  const projects = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(projectsDir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      category: data.category || '未分类',
      tags: data.tags || [],
      image: data.image || '/images/project-placeholder.png',
      order: typeof data.order === 'number' ? data.order : 999,
      stars: typeof data.stars === 'number' ? data.stars : undefined,
      link: data.link || '',
      github: data.github || '',
      links: parseLinks(data.links),
      content,
    }
  })

  return projects.sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects()
  return projects.find(p => p.slug === slug) || null
}
