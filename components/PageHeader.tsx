'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
}

export default function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      {eyebrow && (
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: 'var(--accent-violet)', fontFamily: 'var(--font-latin)' }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className="text-4xl md:text-5xl font-bold mb-4 text-flow"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
