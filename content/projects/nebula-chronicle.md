---
title: "星云编年史 Nebula Chronicle"
description: "沉浸式动漫宇宙探索平台：Three.js 3D 星云 + Liquid Glass UI，支持语音对话、手势控制与知识图谱，把 1963 年至今的经典动画化作可探索的星云次元。"
category: "创意前端"
tags: ["Three.js", "Vue 3", "Liquid Glass", "语音交互", "手势控制"]
order: 3
image: "/images/projects/nebula-chronicle.jpg"
stars: 0
link: "https://mw2wbyys6t-sudo.github.io/nebula-chronicle/"
github: "https://github.com/mw2wbyys6t-sudo/nebula-chronicle"
links:
  - label: "在线体验"
    url: "https://mw2wbyys6t-sudo.github.io/nebula-chronicle/"
  - label: "源码（GitHub）"
    url: "https://github.com/mw2wbyys6t-sudo/nebula-chronicle"
---

> 指尖划过六十载动漫银河 · 声音唤醒经典回忆 · AI 陪你重回热血年代

## 项目简介

《星云编年史》是一个**沉浸式动漫宇宙探索平台**，以 1963 年至今的经典日本动画为数据基础，把时间轴化作可探索的星云次元。

用户可以通过**语音或手势**与系统交互，让 LLM 助手查找、播放作品，也能切到闲聊模式进行日常对话。从宇宙级的星云旋转到像素级的玻璃卡片光效，每个细节都在致敬六十年的动漫文化。

**纯前端实现，无需后端即可运行** —— LLM 与 TTS 能力直接调用浏览器及第三方 API。

## 项目亮点

| 亮点 | 说明 |
| --- | --- |
| 🌌 **3D 星云宇宙** | Three.js 渲染的螺旋星云，40+ 经典作品化作星辰 |
| 🔮 **Liquid Glass UI** | 玻璃拟态设计，实时主题色联动与流光动效 |
| 🤖 **AI 语音助手** | LLM 驱动，命令 + 闲聊双模式，语音合成自动朗读 |
| ✋ **手势控制** | MediaPipe 摄像头识别，挥挥手就能操控播放 |

## 核心功能

### 1. 沉浸式入口页（双模式）
- **沉浸模式**：Three.js 3D 星云世界启动动画，GSAP 时间线编排 —— 星云苏醒 → 玻璃凝聚 → 角色觉醒 → 编年史展开 → 星图散开成粒子 → 星云漩涡 → 标题水印 + 登录界面升起 → 角色凝聚为守护星座环
- **轻量模式**：8 位 ISML 冠军女主角海报轮播 + 左侧角色信息卡片 + 右侧 Liquid Glass 登录卡片，轮播切换时角色信息、主题色、玻璃光效实时联动
- 双模式一键切换；移动端、不支持 WebGL 或偏好减少动画时**自动降级**
- 交互反馈：输入框主题色循环发光、按钮流光扫过 / 涟漪、登录成功星尘爆发、空格跳过动画

### 2. 动漫编年史可视化
- Three.js 星云背景与螺旋时间轴
- 按年份、类型、作品展示经典动画卡片（1963 – 至今，40+ 部作品）
- 点击作品可查看详情，并跳转播放页

### 3. 知识图谱引擎
- 从内嵌的 `relations` 字段**纯内存构建**关系图谱（< 10ms）
- 支持关系查询、路径发现、智能推荐
- LRU 缓存优化，无需额外下载 6MB 图谱文件，首屏加载量大幅减少

### 4. LLM 多轮语音助手
- **命令模式**：通过语音 / 文字指令查找作品、控制播放、询问信息
- **闲聊模式**：切换后进入日常对话，支持多轮上下文记忆（默认保留最近 10 轮）
- 语音合成（Web Speech API）自动朗读助手回复

### 5. 手势与语音控制
- 集成 MediaPipe Hands，支持摄像头手势识别
- 语音指令控制播放、暂停、上一部、下一部
- 播放页支持 Bilibili BV 号或本地视频源

### 6. 工程质量
- **全局错误边界**：任何子组件渲染错误都不会白屏，显示「星辰信号中断」降级 UI
- Web Audio API 合成 UI 音效（select / hover / swipe / back / phaseChange / error）
- 支持 `prefers-reduced-motion` 减少动画偏好
- 移动端触摸优化（防双击缩放、44px 最小触控区域）

## 技术栈

Vue 3.5 · Vite · Three.js 0.185 · MediaPipe · GSAP · Web Speech API · 原生 Canvas

## 架构概览

应用采用**四阶段流转**设计，由 `App.vue` 的 `<Transition>` 管理切换：

```
Loading → Showcase → Landing → Universe
```

引擎按职责分层，通过全局 EventBus 通信：

- **AI Engine** —— Intent Parser（意图解析）+ Narrator（旁白朗读）
- **Data Engine** —— Anime Data + Knowledge Graph
- **Universe Engine** —— Galaxy Spiral Timeline（螺旋时间轴）
- **Interaction Engine** —— Gesture（手势）+ Voice（语音）

## 许可证

MIT License
