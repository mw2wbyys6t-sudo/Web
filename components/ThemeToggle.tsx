'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="glass-btn !p-3 !rounded-full"
      aria-label="切换主题"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} className="text-[var(--accent-pink)]" />
        ) : (
          <Sun size={20} className="text-[var(--accent-pink)]" />
        )}
      </motion.div>
    </motion.button>
  )
}
