---
title: "律歌回响：鸣歌者"
description: "一款融合音乐节奏与 roguelike 元素的僵尸射击游戏：跟着节拍攻击能获得伤害加成，7 种乐器武器、10 种技能与随机生成的关卡。"
category: "游戏开发"
tags: ["React", "TypeScript", "Canvas 2D", "roguelike", "音乐游戏"]
order: 4
image: "/images/projects/rhythmic-echoes.jpg"
stars: 0
github: "https://github.com/mw2wbyys6t-sudo/-Rhythmic-Echoes-The-Songweaver"
links:
  - label: "源码（GitHub）"
    url: "https://github.com/mw2wbyys6t-sudo/-Rhythmic-Echoes-The-Songweaver"
  - label: "开发手记（CSDN）"
    url: "https://blog.csdn.net/2501_94355779/article/details/160348455"
  - label: "TRAE 社区挑战赛"
    url: "https://forum.trae.cn/"
---

> 在音乐的节拍中战斗，用歌声的力量征服一切！

## 项目简介

「律歌回响：鸣歌者」（Rhythmic Echoes: The Songweaver）是一款融合**音乐节奏**与 **roguelike** 元素的僵尸射击游戏 —— 也是我作为一名大一新生，用 **TRAE SOLO** 独立完成的第一款小游戏。

灵感来自我自己的一个小愿望：**边听自己喜欢的音乐边打游戏，不用再额外开一台设备**。于是我把「音乐」和「射击」揉在一起，又借鉴了《元气骑士》《土豆兄弟》的爽快风格，以及《超时空要塞》里「音乐能给人带来力量」的设定。

## 游戏特色

- 🎵 **音乐节拍战斗系统** —— 根据音乐的节拍进行攻击，获得额外伤害加成
- 🧟 **roguelike 元素** —— 随机生成的关卡、敌人和 Boss
- 🎮 **7 种独特武器** —— 音乐手枪、节拍喷子、电吉他、节奏步枪、旋律狙击、摇滚火箭炮、激光琴
- ✨ **10 种技能** —— 音浪风暴、节奏治愈、时间停止、黑洞引力等
- 👤 **角色自定义** —— 性别、发型、服装、肤色、声线、语言
- 🌍 **多语言支持** —— 中文 / English / 日本語

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **游戏引擎**：原生 Canvas 2D
- **音效**：Howler.js

## 操作方式

| 按键 | 功能 |
| --- | --- |
| WASD / 方向键 | 移动角色 |
| 鼠标点击 / 触摸 | 射击 |
| Q E R F G H | 释放技能 |
| 1 – 7 | 切换武器 |
| P | 暂停游戏 |

## 开发过程

从最初拿到的一个游戏原型，到理解它的运行原理并全面升级，我在 **2 小时内**跑完了「代码编写 → 调试修 Bug → 部署上线」的全流程。

过程中踩了不少坑：

- 一开始没把 GitHub 远程仓库连上 TRAE，折腾了很久（最后重新设计了一版）
- 网页打开速度太慢，甚至打不开
- 敌人会凭空消失
- 打敌人没有伤害

这些 Bug 都是通过回到 SOLO 里把**现象描述清楚**，让它定位并逐个修复的。

本项目也参加了 **TRAE 社区挑战赛**（[forum.trae.cn](https://forum.trae.cn/)）。

## 本地运行

```bash
npm install
npm run dev     # 启动开发服务器
npm run build   # 构建生产版本
```

## 许可证

MIT License
