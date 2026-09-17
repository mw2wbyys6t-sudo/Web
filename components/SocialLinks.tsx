import { Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { socialIcon } from './icons/SocialIcons'

interface SocialLinksProps {
  size?: number
  variant?: 'plain' | 'glass'
  className?: string
}

export default function SocialLinks({ size = 20, variant = 'plain', className = '' }: SocialLinksProps) {
  const itemClass =
    variant === 'glass'
      ? 'rounded-full glass-btn !p-3'
      : 'p-2 rounded-full transition-colors hover:bg-[var(--tag-bg)]'

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {siteConfig.social.map(item => {
        const Icon = socialIcon(item.key)
        return (
          <a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass}
            style={{ color: 'var(--text-secondary)' }}
            aria-label={item.name}
            title={`${item.name}${item.handle ? ' · ' + item.handle : ''}`}
          >
            <Icon width={size} height={size} />
          </a>
        )
      })}
      <a
        href={`mailto:${siteConfig.email}`}
        className={itemClass}
        style={{ color: 'var(--text-secondary)' }}
        aria-label="邮箱"
        title={`邮箱 · ${siteConfig.email}`}
      >
        <Mail width={size} height={size} />
      </a>
    </div>
  )
}
