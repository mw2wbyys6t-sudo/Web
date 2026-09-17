'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const count = Math.min(30, Math.floor(window.innerWidth / 50))
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 3,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.3 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }))

    const isDark = resolvedTheme === 'dark'

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity

      if (isDark) {
        // Star shape for night mode
        ctx.fillStyle = '#F0F0FF'
        ctx.beginPath()
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2
          ctx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size)
          ctx.lineTo(Math.cos(angle + Math.PI / 4) * p.size * 0.3, Math.sin(angle + Math.PI / 4) * p.size * 0.3)
        }
        ctx.closePath()
        ctx.fill()

        // Glow
        ctx.shadowColor = '#7B68EE'
        ctx.shadowBlur = 8
        ctx.fill()
      } else {
        // Cherry blossom petal for day mode
        ctx.fillStyle = '#FFB7C5'
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          const angle = (i * Math.PI * 2) / 5
          ctx.ellipse(
            Math.cos(angle) * p.size * 0.4,
            Math.sin(angle) * p.size * 0.4,
            p.size * 0.5,
            p.size * 0.25,
            angle,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
        // Center
        ctx.fillStyle = '#FF6B9D'
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.15, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        // Wrap around
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20

        drawPetal(ctx, p)
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
