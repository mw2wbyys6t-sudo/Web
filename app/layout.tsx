import type { Metadata } from "next"
import { Noto_Sans_SC, ZCOOL_QingKe_HuangYou, Unbounded } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"
import FlowBackground from "@/components/FlowBackground"
import ScrollProgress from "@/components/ScrollProgress"
import { siteConfig } from "@/lib/config"
import { themeInitScript } from "@/lib/theme-script"

const notoSans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

const zcool = ZCOOL_QingKe_HuangYou({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
})

const unbounded = Unbounded({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
})

const siteTitle = `${siteConfig.name} | 个人网站`
const siteDescription = `${siteConfig.description} ${siteConfig.descriptionEn}`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteTitle,
  description: siteDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  // 站点根路径作为 canonical；og:image / twitter:image 由 app/opengraph-image.png 自动注入。
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteTitle,
    locale: 'zh_CN',
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${zcool.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <FlowBackground />
          <ParticleBackground />
          <ScrollProgress />
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
