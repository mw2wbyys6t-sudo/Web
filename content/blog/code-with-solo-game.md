---
title: "【Code with SOLO】大一新生用 SOLO 2 小时做出音乐游戏"
date: "2026-04-21"
category: "AI 编程"
excerpt: "从一个游戏原型到部署上线，我只花了 2 小时。这篇记录我如何用 TRAE SOLO 把「边听歌边打僵尸」的想法，变成真的能玩的游戏。"
tags: ["TRAE SOLO", "AI 编程", "游戏开发", "部署"]
links:
  - label: "阅读原文（CSDN）"
    url: "https://blog.csdn.net/2501_94355779/article/details/160348455"
  - label: "对应作品：节奏战争 Rhythm Warfare"
    url: "/projects/rhythm-warfare"
  - label: "在线试玩游戏"
    url: "https://mw2wbyys6t-sudo.github.io/music-rpg-zombie-game/"
---

## 摘要

作为一个大一新生，我用 **TRAE SOLO** 完成了音乐打僵尸游戏的全面开发，从基础功能实现到视觉效果优化，**2 小时内跑完「代码编写 → 修 Bug → 部署上线」的全流程**，最终做出了一款像素风格的音乐射击游戏「节奏战争」。

> TRAE SOLO 是字节跳动旗下 AI 编程产品 TRAE 在 2026 年 3 月推出的独立 AI 智能体，核心是让 AI 主导执行任务，用户只需「提需求和验收结果」。

## 创作思路

我既喜欢射击游戏，又喜欢听音乐。我想：**边听自己喜欢的音乐边打，那多舒服，还不用再开另一台设备。**

于是我把这个想法交给 TRAE SOLO 去实现，同时借鉴了：

- 《元气骑士》《土豆兄弟》的爽快风格
- 音乐游戏的节奏玩法
- 《超时空要塞》里「音乐能给人带来力量」的设定

## 踩过的坑

- 一开始没把 GitHub 远程仓库连上 TRAE，折腾了很久（最后重新设计了一版，现在展示的其实是第 2 版）
- 网页打开速度太慢，甚至打不开
- 敌人会凭空消失
- 打敌人没有伤害

这些 Bug 都是可以修的 —— 关键是**把现象描述清楚，让 AI 去定位**。

## 成果

游戏叫「节奏战争 Rhythm Warfare」，目前是初代版本，可以直接在线试玩：

👉 [mw2wbyys6t-sudo.github.io/music-rpg-zombie-game](https://mw2wbyys6t-sudo.github.io/music-rpg-zombie-game/)

这个项目也参加了 **TRAE 社区挑战赛**（社区地址：[forum.trae.cn](https://forum.trae.cn/)）。
