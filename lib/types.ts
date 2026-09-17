export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  content: string
}

export interface Project {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  image: string
  order: number
  link?: string
  github?: string
  content: string
}
