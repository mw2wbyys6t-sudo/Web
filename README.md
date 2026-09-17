# Web · 个人网站

**0mecihuatl** 的个人主页：作品集 + 技术博客，一套从内容到部署全部跑在 GitHub 上的静态站点。

> 在线访问：<https://mw2wbyys6t-sudo.github.io/Web/>

---

## 项目简介

这是一个用 Next.js App Router 构建的个人网站，包含四个页面：

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | `/` | 个人介绍、技能、赛事与社区、精选作品与最新文章，带视差与流光动效 |
| 作品 | `/projects` | 作品列表，展示封面、分类标签、GitHub 星标数与仓库入口 |
| 博客 | `/blog` | 文章列表，展示阅读量 / 点赞 / 收藏 |
| 联系 | `/contact` | 社交账号与邮箱 |

所有页面都同时支持**浅色（梦幻极光白）**与**深色（深空霓虹）**两套主题。

## 技术栈

- **框架**：Next.js 16（App Router）+ React 19
- **语言**：TypeScript
- **样式**：Tailwind CSS v4（全局 CSS 变量驱动主题、极光/流光/波浪动效）
- **动效**：framer-motion（滚动进度、Hero 视差）
- **内容**：Markdown + `gray-matter` 解析 frontmatter，`remark` 渲染正文
- **图标**：lucide-react + 自绘品牌 SVG
- **部署**：GitHub Pages（静态导出）+ GitHub Actions

## 快速开始

环境要求：**Node.js ≥ 20.9**（CI 使用 22）。

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，默认 http://localhost:3000
```

构建与预览：

```bash
npm run build    # 普通（服务端）构建
npm run start    # 启动普通构建产物的服务端

npm run build:pages   # GitHub Pages 用的静态导出（见下文「部署」）
```

其他脚本：

```bash
npm run lint        # ESLint 检查
npm run sync-stats  # 抓取 GitHub 星标 / CSDN 阅读数据，回写到 content/（见下文）
```

## 目录结构

```
app/                        页面与路由（App Router）
├─ api/stats/route.ts       构建期生成的统计数据接口
├─ blog/[slug]/             博客详情
├─ projects/[slug]/         作品详情
├─ contact/                 联系页
├─ globals.css              设计系统：主题变量 + 全部动效
└─ layout.tsx               全局布局、字体、背景特效
components/                 页面区块与交互组件
├─ HomeContent.tsx          首页主体
├─ ProjectList.tsx          作品卡片
├─ BlogList.tsx             文章卡片
├─ LiveStat.tsx             统计数据客户端水合组件
├─ FlowBackground.tsx       极光 + 流光背景
├─ WaveDivider.tsx          波浪分隔
├─ GithubCta.tsx            全站 GitHub 引导入口
└─ ...
content/                    所有内容（改内容只动这里）
├─ blog/*.md                博客文章
└─ projects/*.md            作品条目
lib/
├─ config.ts                站点信息、社交账号、导航、技能、赛事与社区
├─ content.ts               Markdown 读取与解析
└─ types.ts                 数据类型定义
public/images/              头像与作品封面
scripts/sync-stats.mjs      数据同步脚本
image-loader.ts             静态导出时的图片路径 loader
.github/workflows/          自动部署流水线
```

## 内容维护

内容全部是 Markdown + frontmatter，**新增作品或文章只需新增一个 `.md` 文件**，文件名即 URL 中的 `slug`。

### 新增作品 `content/projects/<slug>.md`

```yaml
---
title: "项目名称"
description: "一句话简介，会显示在卡片上"
category: "AI 应用"
tags: ["Live2D", "Python"]
order: 1                                   # 排序，越小越靠前
image: "/images/projects/<slug>.jpg"       # 封面图，放在 public/images/projects/
stars: 8                                   # 可选，GitHub 星标数（由 sync-stats 维护）
link: "https://..."                        # 可选，在线体验地址
github: "https://github.com/..."           # 可选，仓库地址（有值才会自动抓星标）
links:                                     # 可选，附加链接
  - label: "源码（GitHub）"
    url: "https://github.com/..."
---

正文内容，支持标准 Markdown 语法。
```

### 新增文章 `content/blog/<slug>.md`

```yaml
---
title: "文章标题"
date: "2026-06-26"                 # 用于排序与展示
category: "AI 智能体"
excerpt: "列表页显示的摘要"
tags: ["Qoder", "LBS"]
stats:                             # 可选，由 sync-stats 自动维护
  views: 427
  likes: 9
  favorites: 3
links:
  - label: "阅读原文（CSDN）"      # 指向 blog.csdn.net 的链接会被自动抓取阅读数据
    url: "https://blog.csdn.net/..."
  - label: "相关作品"
    url: "/projects/gaode-map-skill"   # 站内链接直接写路径，会自动补全
---

正文内容。
```

> 站点信息（名字、简介、邮箱、社交账号、导航、技能、赛事与社区、GitHub 关注者数）统一在 [`lib/config.ts`](lib/config.ts) 修改。其中 `highlights` 对应首页「赛事与社区」区块，`githubFollowers` 对应 GitHub 区块显示的关注者数量。

## 数据自动更新

页面上的 **GitHub 关注者数**、作品卡片的 **GitHub 星标数**、文章卡片的 **阅读 / 点赞 / 收藏**都由脚本抓取：

```bash
npm run sync-stats
```

它做的事情（实现见 [`scripts/sync-stats.mjs`](scripts/sync-stats.mjs)）：

1. 遍历 `content/projects/*.md`，对每个带 `github` 字段的作品抓取仓库星标数，写回 `stars:`
2. 遍历 `content/blog/*.md`，对每个带 CSDN 链接的文章抓取阅读数据，写回 `stats:`
3. 读取 `lib/config.ts` 里的 GitHub 账号，抓取关注者数量，写回 `githubFollowers:`
4. 抓不到的条目**跳过并保留原值**，不会写入 0 或空值

针对真实环境踩过的坑，脚本里有三处专门处理：

- **CSDN 有 Cloudflare 频率限制**，必须串行请求并留出间隔，否则返回 `521`
- **GitHub 仓库星标**改为解析仓库页面 HTML（未鉴权 API 在共享 IP 上很容易返回 `403`）
- **GitHub 关注者数**必须走 REST API——个人页上的数量是前端渲染的，抓 HTML 拿不到数字，因此 CI 会给这一步注入 `GITHUB_TOKEN`

页面上通过 [`components/LiveStat.tsx`](components/LiveStat.tsx) 读取 `/api/stats`，成功则用最新值水合，失败则回落到 frontmatter 里的快照——**任何情况下都不会出现空白或报错**。

## 部署到 GitHub Pages

站点通过 GitHub Actions 自动构建并部署，流水线见 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)：

- **触发时机**：推送到 `main`、手动触发、以及每天 21:00 UTC（北京时间次日 05:00）定时重新构建，顺带刷新星标与阅读数据
- **构建流程**：`npm ci` → `npm run sync-stats`（失败不阻断）→ `npm run build:pages` → 上传 `out/` → 部署到 Pages

### 本地复现静态导出

```bash
NEXT_STATIC_EXPORT=true npm run build:pages
# 产物在 out/ 目录
```

### 关于 basePath（重要）

GitHub Pages 的项目站点部署在 `https://<用户名>.github.io/<仓库名>/` 子路径下，因此需要设置 `basePath`。

本项目**会根据 CI 里的仓库名自动推导**，无需手动配置；如果仓库改名，也不必改代码。相关配置在 [`next.config.ts`](next.config.ts)：

| 环境变量 | 作用 |
| --- | --- |
| `NEXT_STATIC_EXPORT=true` | 开启静态导出（`output: 'export'`）、`trailingSlash`、自定义图片 loader |
| `NEXT_PUBLIC_BASE_PATH` | 手动覆盖子路径；不设置时由 `GITHUB_REPOSITORY` 自动推导为 `/<仓库名>` |

静态导出时刻意替换成了三个东西，以适配纯静态托管：

1. **图片 loader**（[`image-loader.ts`](image-loader.ts)）——静态导出必须关掉 Next.js 默认的图片优化（改用 `unoptimized` 或自定义 loader），而这两种模式都不会自动补 `basePath`，会导致图片 404，这里用自定义 loader 显式补上
2. **`public/.nojekyll`**——防止 Pages 的 Jekyll 处理忽略以下划线开头的 `_next` 资源目录
3. **`/api/stats` 改为构建期生成**——静态托管没有 Node 运行时，因此该接口在构建时直接由 `content/` 的 frontmatter 生成一个静态 JSON

> **首次部署前必须手动开启一次 Pages**（这一步无法由工作流自动完成，因为 `GITHUB_TOKEN` 没有创建 Pages 站点的权限）：
> 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
> 开启后工作流即可正常构建并发布，站点地址为 <https://mw2wbyys6t-sudo.github.io/Web/>。

## 许可

个人项目，内容（文字与图片）版权归作者所有；代码可参考，请勿直接搬运内容。
