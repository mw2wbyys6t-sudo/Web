import Link from 'next/link'
import { Link2, ExternalLink, CornerDownRight } from 'lucide-react'
import type { ContentLink } from '@/lib/types'

export default function ContentLinks({ links }: { links?: ContentLink[] }) {
  if (!links || links.length === 0) return null

  return (
    <section className="mt-8">
      <h2
        className="text-base font-semibold mb-4 inline-flex items-center gap-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <Link2 size={16} className="text-[var(--accent-pink)]" />
        相关链接
      </h2>

      <div className="flex flex-wrap gap-3">
        {links.map(link => {
          const external = /^https?:\/\//.test(link.url)

          if (external) {
            return (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn inline-flex items-center gap-2 !text-sm !py-2.5 !px-5"
              >
                <ExternalLink size={15} />
                {link.label}
              </a>
            )
          }

          return (
            <Link
              key={`${link.label}-${link.url}`}
              href={link.url}
              className="glass-btn glass-btn-primary inline-flex items-center gap-2 !text-sm !py-2.5 !px-5"
            >
              <CornerDownRight size={15} />
              {link.label}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
