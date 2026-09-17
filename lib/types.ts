export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
}

export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
  link?: string
  github?: string
  content: string
}
