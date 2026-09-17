export interface ContentLink {
  label: string
  url: string
}

export interface ContentStats {
  views: number
  likes: number
  favorites: number
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  stats?: ContentStats
  links: ContentLink[]
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
  stars?: number
  link?: string
  github?: string
  links: ContentLink[]
  content: string
}
