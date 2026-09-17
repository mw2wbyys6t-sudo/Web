'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { toggleTheme } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={toggleTheme}
      className="glass-btn !p-3 !rounded-full"
      aria-label="切换主题"
    >
      <Sun size={20} className="theme-icon-sun text-[var(--accent-pink)]" />
      <Moon size={20} className="theme-icon-moon text-[var(--accent-pink)]" />
    </motion.button>
  )
}
