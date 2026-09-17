import { siteConfig } from '@/lib/config'
import { Mail, Heart } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from './icons/BrandIcons'

const socialIcons = [
  { icon: GithubIcon, href: siteConfig.social.github, label: 'GitHub' },
  { icon: TwitterIcon, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20">
      <div
        className="glass-card !rounded-none border-l-0 border-r-0 border-b-0 py-8"
        style={{ background: 'var(--footer-bg)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} {siteConfig.name}. Made with <Heart size={14} className="inline text-[var(--accent-pink)]" />
          </p>

          <div className="flex items-center gap-4">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-colors hover:bg-[var(--tag-bg)]"
                style={{ color: 'var(--text-secondary)' }}
                aria-label={label}
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
