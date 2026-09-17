import { siteConfig } from '@/lib/config'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './icons/BrandIcons'

interface GithubCtaProps {
  label?: string
  className?: string
}

export default function GithubCta({ label = '我的开源项目都在 GitHub', className = '' }: GithubCtaProps) {
  const github = siteConfig.social.find(item => item.key === 'github')
  if (!github) return null

  return (
    <a
      href={github.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`glass-btn glass-btn-primary inline-flex items-center gap-2 ${className}`}
    >
      <GithubIcon width={18} height={18} />
      {label}
      <ArrowUpRight size={16} />
    </a>
  )
}
