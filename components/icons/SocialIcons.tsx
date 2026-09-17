import type { ComponentType, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

interface BadgeProps extends IconProps {
  glyph: string
  color?: string
  gradient?: [string, string]
  gradientId?: string
}

function BrandBadge({ glyph, color, gradient, gradientId, ...props }: BadgeProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
      {gradient ? (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6.5" fill={`url(#${gradientId})`} />
        </>
      ) : (
        <rect width="24" height="24" rx="6.5" fill={color} />
      )}
      <text
        x="12"
        y="12.6"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12.5"
        fontWeight="700"
        fill="#ffffff"
      >
        {glyph}
      </text>
    </svg>
  )
}

export function GithubBadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
      <rect width="24" height="24" rx="6.5" fill="#24292F" />
      <g transform="translate(4.9 4.9) scale(0.592)" fill="#ffffff">
        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </g>
    </svg>
  )
}

export function ModelScopeIcon(props: IconProps) {
  return <BrandBadge {...props} glyph="M" gradient={['#7C5CFF', '#4B2FD6']} gradientId="brand-modelscope" />
}

export function CsdnIcon(props: IconProps) {
  return <BrandBadge {...props} glyph="C" color="#FC5531" />
}

export function ZhihuIcon(props: IconProps) {
  return <BrandBadge {...props} glyph="知" color="#0084FF" />
}

export function XiaohongshuIcon(props: IconProps) {
  return <BrandBadge {...props} glyph="红" color="#FF2442" />
}

export function LinkBadgeIcon(props: IconProps) {
  return <BrandBadge {...props} glyph="↗" color="#8A8F98" />
}

const socialIconMap: Record<string, ComponentType<IconProps>> = {
  github: GithubBadgeIcon,
  modelscope: ModelScopeIcon,
  csdn: CsdnIcon,
  zhihu: ZhihuIcon,
  xiaohongshu: XiaohongshuIcon,
}

export function socialIcon(key: string): ComponentType<IconProps> {
  return socialIconMap[key] ?? LinkBadgeIcon
}
