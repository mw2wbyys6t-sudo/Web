---
title: "个人网站"
description: "你正在浏览的这个网站：Next.js 16 + Tailwind CSS 4 打造的二次元 galgame 风格个人站，支持昼夜场景切换与液态玻璃质感，内容由 Markdown 驱动。"
category: "创意前端"
tags: ["Next.js", "React", "Tailwind CSS", "液态玻璃", "昼夜切换"]
order: 8
image: "/images/projects/personal-website.jpg"
stars: 0
github: "https://github.com/mw2wbyys6t-sudo/Web"
links:
  - label: "源码（GitHub）"
    url: "https://github.com/mw2wbyys6t-sudo/Web"
---

## 项目简介

这就是你此刻正在浏览的**个人网站** —— 一个「职业展示 + 作品集 + 博客」三合一的个人站。

## 视觉与交互

- **二次元 / galgame 风格**：樱花粉 + 星空的配色，衬线标题字与柔和光晕
- **昼夜场景切换**：右上角一键在「白天」与「夜晚」之间切换，选择会被记住
- **苹果风格液态玻璃**：卡片、按钮、导航全部采用磨砂玻璃质感
- **粒子星空背景**：Canvas 绘制的漂浮粒子与闪烁星点

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Next.js 16（App Router）+ React 19 |
| 样式 | Tailwind CSS 4 + 自定义 CSS 变量主题 |
| 动画 | Framer Motion |
| 内容 | Markdown（gray-matter + remark，支持 GFM 表格） |
| 主题 | 自定义 ThemeProvider（useSyncExternalStore，切换无闪烁） |

## 功能模块

- **首页**：头像 + 中英双语简介、技能标签、精选作品、最新文章
- **作品集**：按分类筛选，每个项目有独立详情页
- **博客**：按分类筛选，Markdown 渲染，正文底部自动生成「相关链接」
- **联系页**：联系方式 + 社区账号

## 内容架构

文章与作品都以 Markdown 存放在 `content/` 目录下，frontmatter 支持 `category`、`tags`、`links`、`order` 等字段 —— 新增内容只需要加一个 `.md` 文件。

## 工程细节

- 所有页面静态预渲染（SSG），上线无需后端
- 主题切换无闪烁：首屏内联脚本 + `useSyncExternalStore` 同步外部状态
- 图片自动优化，社交链接使用自绘品牌徽标
- 构建约束：Turbopack 构建在低内存环境会 OOM，改用 `next build --webpack`
