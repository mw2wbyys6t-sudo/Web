import type { Metadata } from "next"
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"
import { siteConfig } from "@/lib/config"
import { themeInitScript } from "@/lib/theme-script"

const notoSans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const notoSerif = Noto_Serif_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: siteConfig.name + ' | 个人网站',
  description: siteConfig.description + ' ' + siteConfig.descriptionEn,
  openGraph: {
    title: siteConfig.name + ' | 个人网站',
    description: siteConfig.description + ' ' + siteConfig.descriptionEn,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <ParticleBackground />
          <Navbar />
          <main className="flex-1 relative z-10 pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
