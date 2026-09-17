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
  modelscope: ModelScopeIcon,
  csdn: CsdnIcon,
  zhihu: ZhihuIcon,
  xiaohongshu: XiaohongshuIcon,
}

export function socialIcon(key: string): ComponentType<IconProps> {
  return socialIconMap[key] ?? LinkBadgeIcon
}
