'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import GlassCard from '@/components/GlassCard'
import { siteConfig } from '@/lib/config'
import { Download, Send, MapPin } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="relative z-10 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            联系我
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            有任何问题或合作意向，欢迎联系我
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Info Card */}
          <GlassCard delay={0.1} className="p-8">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden relative">
              <Image src={siteConfig.avatar} alt={siteConfig.name} fill className="object-cover" />
            </div>

            <h2 className="text-xl font-semibold text-center mb-2">{siteConfig.name}</h2>
            <p className="text-sm text-center mb-1" style={{ color: 'var(--text-secondary)' }}>
              {siteConfig.subtitle}
            </p>
            <p className="text-xs text-center mb-3" style={{ color: 'var(--text-secondary)' }}>
              {siteConfig.subtitleEn}
            </p>
            <div className="flex items-center justify-center gap-1 text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
              <MapPin size={12} />
              {siteConfig.location} · {siteConfig.locationEn}
            </div>

            {/* Social Links */}
            <SocialLinks variant="glass" size={20} className="justify-center mb-6" />

            {/* Email */}
            <p className="text-sm text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
              {siteConfig.email}
            </p>

            {/* Download Resume */}
            <a href="#" className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2">
              <Download size={18} /> 下载简历
            </a>
          </GlassCard>

          {/* Right: Contact Form */}
          <GlassCard delay={0.2} className="p-8">
            <h2 className="text-xl font-semibold mb-6">发送消息</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
              >
                <p className="text-lg font-semibold text-[var(--accent-pink)] mb-2">发送成功！</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  感谢你的留言，我会尽快回复你。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名</label>
                  <input type="text" className="glass-input" placeholder="你的名字" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱</label>
                  <input type="email" className="glass-input" placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">留言</label>
                  <textarea className="glass-input min-h-[120px] resize-none" placeholder="想说些什么..." required />
                </div>
                <button type="submit" className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2">
                  <Send size={18} /> 发送
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
