---
title: "慧行山海"
description: "基于 AI 与电子地图的一站式旅游规划导览平台：350 个精品景区、3D 地球、720° 全景、AI 避雷指数，以及 LangGraph 多 Agent 行程规划工作流。"
category: "AI 应用"
tags: ["AI 旅游规划", "LangGraph", "FastAPI", "Next.js", "高德地图"]
order: 2
link: "https://mw2wbyys6t-sudo.github.io/huixing-shanhai/"
github: "https://github.com/mw2wbyys6t-sudo/huixing-shanhai"
links:
  - label: "在线体验"
    url: "https://mw2wbyys6t-sudo.github.io/huixing-shanhai/"
  - label: "API 文档"
    url: "https://huixing-shanhai.onrender.com/docs"
  - label: "源码（GitHub）"
    url: "https://github.com/mw2wbyys6t-sudo/huixing-shanhai"
---

> 出发前，先看见真实的河山；出发后，不踩任何一个雷。

## 项目简介

慧行山海是一个基于 **AI 与电子地图**的一站式旅游规划导览平台，围绕「**看见河山 → 智能规划 → 出行辅助 → 内容社区**」构建完整闭环：

- 🗺️ **看见河山**：350 个国内外精品景区（全国 5A 覆盖 + 世界五大洲）· 3D 地球探索 · 720° 全景漫游 · 实时天气 · 周边美食 · 游客实拍墙
- ⚡ **避雷避坑**：AI 避雷指数（NLP 情感分析）· 宣传图 vs 实拍对比 · 高风险景区提醒
- 🧭 **智能规划**：LangGraph 多 Agent 工作流 · 跨城交通方案 · 逐日行程 · 预算管控 · 质量评估自动修订
- 💬 **内容社区**：游记 / 攻略发布 · 评论点赞互动 · 实时聚合旅游资讯

## 数据立场

**不编造任何评价与数据** —— 评价来自站内真实统计，美食来自高德实时 POI，视频以 B 站官方播放器嵌入并强制标注来源与作者，图片来自 Wikimedia Commons，外部数据不可用时诚实标注。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | Next.js 14、TypeScript、Tailwind CSS、React Three Fiber、Lucide |
| 后端 | FastAPI、SQLAlchemy、LangGraph、httpx、DeepSeek API |
| 地图 | 高德 JS API 2.0（地图 / 路线）、高德 Web API（天气 / POI） |
| 数据 | SQLite（开发）/ PostgreSQL（生产可配）、JSON 景区库 |
| 部署 | GitHub Pages（前端）+ Render（后端），render.yaml 蓝图一键部署 |

## 已实现功能

### 前端
- **首页**：Hero 轮播、站内搜索、精选推荐
- **探索发现**：搜索（300ms 防抖 + 竞态防护）、省份 / 类型筛选、分页
- **景区详情**：图片轮播、实景环视（拖拽 + 时段光影）、实时天气、门票费用参考与交通建议、AI 避雷分析、游客评价、UGC 实拍墙、周边美食（高德 POI）、宣传视频（B 站官方播放器）
- **游记社区**：游记 / 攻略发布（关联景区联想）、列表筛选排序、详情阅读与点赞、评论互动
- **旅游资讯**：实时聚合热门目的地天气、最新社区内容、最新评价与避雷提醒
- **避雷指南**：风险分级统计、避雷排行榜、避雷知识科普
- **智能规划**：LangGraph 多 Agent 工作流可视化（SSE 实时进度）、跨城交通方案、AI 行程输出渲染、导出 / 分享
- **AI 助手**：DeepSeek 驱动对话、多会话管理（本地持久化）、后端在线状态检测
- **3D 地球**：React Three Fiber 地球 + 景区标记（按避雷指数着色）+ 飞行路线
- **账号体系**：注册 / 登录（密码 + 验证码）/ 忘记密码

### 后端
- 景区 API：列表 / 筛选 / 分页 / 搜索 / 推荐 / 避雷指数 / 门票与交通
- 高德天气：地理编码 → 实时天气；周边美食：高德 POI 检索
- 认证：PBKDF2 密码哈希、HMAC-SHA256 签名 token
- AI：DeepSeek 对话、避雷情感分析、**LangGraph 多 Agent 工作流**（意图解析 → 4 路并行分析 → 行程汇聚 → 质量评估 → 自动修订）
- 实时资讯：天气 + 社区 + 评价 + 避雷四路聚合（10 分钟缓存）

## 安全设计

- 所有密钥通过 `backend/.env` 注入，源码与 `.env.example` 中无真实密钥
- 密码使用 PBKDF2-SHA256 加盐哈希存储，旧明文数据在登录时自动透明升级
- 上传接口：扩展名白名单 + 10MB 上限 + 文件魔数校验 + 服务端生成文件名
- 所有列表接口分页参数有上下限，工作流反馈轮次限制 0-3（防 LLM 调用放大）
- CORS 白名单可配置（默认仅放行本地前端）

## 在线体验

- 前端：[mw2wbyys6t-sudo.github.io/huixing-shanhai](https://mw2wbyys6t-sudo.github.io/huixing-shanhai/)
- 演示账号：`13800138000` / `123456`
- API 文档：[huixing-shanhai.onrender.com/docs](https://huixing-shanhai.onrender.com/docs)

> 免费云部署：前端托管 GitHub Pages（全球 CDN 永不休眠），后端托管 Render 免费实例（15 分钟无访问休眠，首次打开约需 50 秒唤醒，之后流畅）。

## 设计原则

1. **体验前置** —— 3D 地球与 720° 全景，未出发先看见
2. **AI 避雷** —— 结构化评估，一眼判断值不值得去
3. **真实可信** —— 不编造评价与数据，无数据时诚实提示
4. **分层解耦** —— 前后端分离，前端可静态导出并在无后端时优雅降级

## 许可证

MIT License
