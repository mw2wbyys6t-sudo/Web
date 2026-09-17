---
title: "高德地图综合服务 Skill"
description: "发布在魔搭社区的一个 AI Skill：把地点搜索、路径规划、智能旅游规划、餐饮选址分析和热力图可视化，封装成一句话就能调用的能力。"
category: "AI 应用"
tags: ["AI Skill", "高德 LBS", "ModelScope", "智能体"]
order: 2
link: "https://www.modelscope.cn/skills/ometlcic/gaode-skill"
links:
  - label: "发布页（魔搭社区）"
    url: "https://www.modelscope.cn/skills/ometlcic/gaode-skill"
  - label: "相关文章：我的第一个 Qoder Skill"
    url: "/blog/first-qoder-skill"
---

## 项目简介

「高德地图综合服务」是我发布在 **魔搭社区（ModelScope）** 上的一个 AI Skill —— 让你用自然语言就能完成一整套地图相关操作。

调用方式很简单：直接说「西直门周边美食」「帮我规划杭州一日游」「在春熙路开火锅店怎么样」，Skill 会自动识别意图并执行。

## 核心能力

- 🔍 **POI 地点搜索** —— 关键词搜索、城市限定、类型筛选
- 📍 **周边搜索** —— 基于坐标和半径找附近的美食、酒店、景点
- 🛣️ **路径规划** —— 步行、驾车、骑行、公交四种出行方式
- 🗺️ **智能旅游规划** —— 自动搜索兴趣点并规划游览路线，生成可交互地图
- 🍜 **美食发现** —— LLM 动态生成城市美食关键词，并按 typecode 自动分类
- 🔥 **热力图可视化** —— 把带坐标的数据一键渲染成热力图
- 🎙️ **语音导览** —— 基于 Edge TTS 的中文语音播报
- 🏪 **餐饮选址分析** —— 100 分制 5 维选址评分 + 多商圈竞争密度扫描

## 覆盖场景

Skill 内置了 **12 个场景分支**：从最简单的「搜美食」，到完整的旅游规划 Web 应用（登录界面 + 规划面板 + 交互式地图 + AI 旅伴聊天「小次」+ 语音播报），并且同时提供**中国大陆**与**海外**两套 Web API 口径。

## 技术亮点

- **双区域自适应**：自动区分中国大陆（GCJ-02 / `restapi.amap.com`）与海外（WGS-84 / `sg-restapi.opnavi.com`）的坐标体系与接口
- **4 阶段旅游规划流水线**：LLM 意图解析 → 多策略 POI 搜索 → TSP 路线优化 → 交互式地图生成
- **路线优化算法**：过滤评分 → 贪心选择 → 最近邻排序 → 2-opt 优化 → 智能插入用餐点
- **餐饮分类引擎**：按高德 typecode 前缀自动归类 scenic / food / drink / parking，并附加菜系与人均消费
- **选址评分模型**：战略 20 + 竞争 20 + 销售 20 + 配套 20 + 立地 20，输出交互式 HTML 报告
- **多引擎语音**：Edge TTS（默认）→ LongCat-AudioDiT（需 GPU）→ Web Speech（浏览器回退）

## 在线体验

👉 [www.modelscope.cn/skills/ometlcic/gaode-skill](https://www.modelscope.cn/skills/ometlcic/gaode-skill)
