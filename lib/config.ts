export const siteConfig = {
  name: '0mecihuatl',
  title: '你好，我是 0mecihuatl',
  titleEn: "Hi, I'm 0mecihuatl",
  subtitle: 'TRAE 专业用户 · 前沿人工智能领域探索者 · AI 深度使用者',
  subtitleEn: 'TRAE Power User · Frontier AI Explorer · Deep AI Practitioner',
  location: '来自江苏南通',
  locationEn: 'From Nantong, Jiangsu',
  description: '上海杉达学院在校生，专注于人工智能领域的不断探索与实践。',
  descriptionEn:
    'A student at Sanda University, dedicated to the continuous exploration and practice in the field of artificial intelligence.',
  avatar: '/images/avatar.jpg',
  email: 'your@email.com',
  social: [
    {
      key: 'github',
      name: 'GitHub',
      nameEn: 'GitHub',
      handle: '@mw2wbyys6t-sudo',
      url: 'https://github.com/mw2wbyys6t-sudo',
    },
    {
      key: 'modelscope',
      name: '魔搭社区',
      nameEn: 'ModelScope',
      handle: '@ometlcic',
      url: 'https://www.modelscope.cn/profile/ometlcic',
    },
    {
      key: 'csdn',
      name: 'CSDN',
      nameEn: 'CSDN',
      handle: '0mecihuatl',
      url: 'https://blog.csdn.net/2501_94355779',
    },
    {
      key: 'zhihu',
      name: '知乎',
      nameEn: 'Zhihu',
      handle: '0mecihuatl',
      url: 'https://www.zhihu.com/people/6f6cabf3378cc328bb0f72844b96ff7f',
    },
    {
      key: 'xiaohongshu',
      name: '小红书',
      nameEn: 'Xiaohongshu',
      handle: '瑶瑶 · 小红书号 4271200179',
      url: 'https://xhslink.cn/o/4c92eomkuuz',
    },
  ],
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
