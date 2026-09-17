// 静态导出（GitHub Pages 子路径部署）时，next/image 在 unoptimized 模式下
// 不会自动补 basePath，会导致 /images/... 全部 404。
// 这里用自定义 loader 统一补上前缀，并在本地开发（basePath 为空）时保持原样。

interface ImageLoaderArgs {
  src: string
  width: number
  quality?: number
}

export default function imageLoader({ src }: ImageLoaderArgs): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  // 外链、data URI、绝对协议地址不处理
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src

  return `${basePath}${src}`
}
