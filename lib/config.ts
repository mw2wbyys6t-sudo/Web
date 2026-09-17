export const siteConfig = {
  name: '你的名字',
  title: '你好，我是[你的名字]',
  subtitle: '全栈开发者 · 热爱创造有趣东西的人',
  description: '一个热爱技术与创作的开发者，用代码构建有趣的东西',
  avatar: '/images/avatar-placeholder.png',
  email: 'your@email.com',
  social: {
    github: 'https://github.com/yourname',
    twitter: 'https://twitter.com/yourname',
    linkedin: 'https://linkedin.com/in/yourname',
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '作品', href: '/projects' },
    { label: '博客', href: '/blog' },
    { label: '联系', href: '/contact' },
  ],
  skills: [
    { category: '前端', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue'] },
    { category: '后端', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
    { category: '工具', items: ['Git', 'Docker', 'Figma', 'VS Code'] },
  ],
}

export type SiteConfig = typeof siteConfig
