import { siteConfig } from '@/lib/config'
import { Heart } from 'lucide-react'
import SocialLinks from './SocialLinks'
import GithubCta from './GithubCta'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20">
      <div
        className="glass-card !rounded-none border-l-0 border-r-0 border-b-0 py-8"
        style={{ background: 'var(--footer-bg)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center mb-7">
            <GithubCta label="我的开源项目都在 GitHub" className="!py-2.5 !px-6 !text-sm" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} {siteConfig.name}. Made with <Heart size={14} className="inline text-[var(--accent-pink)]" />
            </p>

            <SocialLinks size={18} />
          </div>
        </div>
      </div>
    </footer>
  )
}
