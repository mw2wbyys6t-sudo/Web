---
title: "Live2D Master Agent"
description: "一句话生成你的专属虚拟主播：从 AI 生成角色立绘、自动语义分层、Live2D 自动绑定，到实时面部捕捉、LLM 语音对话与桌宠运行，打通一整条工业化流水线。"
category: "AI 应用"
tags: ["Live2D", "AI 虚拟主播", "Python", "Go", "Next.js"]
order: 1
image: "/images/projects/live2d-master-agent.jpg"
stars: 8
link: "https://mw2wbyys6t-sudo.github.io/live2d-auto-pipeline/"
github: "https://github.com/mw2wbyys6t-sudo/live2d-auto-pipeline"
links:
  - label: "在线体验（Demo）"
    url: "https://mw2wbyys6t-sudo.github.io/live2d-auto-pipeline/"
  - label: "源码（GitHub）"
    url: "https://github.com/mw2wbyys6t-sudo/live2d-auto-pipeline"
---

## 一句话介绍

**输入一句话，AI 生成你的专属虚拟主播** —— 支持实时面部捕捉、语音对话、表情联动、桌宠运行。

## 项目简介

**Live2D Master Agent** 是一款面向人人的 AI 虚拟主播生产工具。

哪怕你没有任何绘画、建模、编程基础，只要一句话描述，就能在 **3 分钟内从 0 到 1** 产出一套合规可二创的 **Live2D Cubism4 虚拟角色**，并开箱即用地运行在桌面桌宠、VTuber 推流、AI 对话、VTube Studio 等个人与学习场景。

技术栈为 **Python 内核 + Go API + Next.js 工作台**，全栈开源、模块化、可扩展。

## 完整流水线

项目打通了从素材到可用模型的全链路：

**AI 图像生成 → 语义分层 → PSD 质检 → Live2D 自动绑定 → 实时面部捕捉 → LLM 对话 → 桌宠 / 工作台运行**

## 核心功能

### 1. AI 角色生成
- 多 Provider：Pollinations（免费）/ Seedream（火山引擎）/ SenseNova（商汤）
- 生产级 Prompt：4096×4096 透明背景、正面朝向、五官对称、赛璐璐风格
- 自动 QA：边缘清晰度、颜色分离度、背景检测

### 2. 语义分层引擎
- **ISNet Anime-Segmentation**：二次元主体精准抠图
- **SAM**：实例语义分层（头发 / 五官 / 衣物 / 配饰）
- **Amodal Completion**：遮挡区域像素补全（如被头发遮住的脸部）
- **18 层标准顺序**：头皮 → 后发 → 中发 → 前发 → 眉毛 → 眼睛 → 口鼻 → 脸 → 颈 → 上衣 → 手臂 → 手 → 裙摆 → 腿 → 配饰 → 兽耳/尾 → 特效

### 3. Live2D Cubism4 自动绑定
- **Delaunay 三角网格**自动生成（边界细分 + 内部网格）
- **36 骨骼**标准层级自动排布
- **28 BlendShape**：眨眼、微笑、生气、惊讶、哭泣、嘴型 A/I/U/E/O 等
- **物理引擎**：头发摆动、裙摆飘动、呼吸、兽耳/尾巴弹性
- 导出 model3.json + physics3.json + 28 个 exp3.json + 纹理图集 + Cubism 导入指南

### 4. 实时面部捕捉
- MediaPipe Face Mesh **468 个人脸关键点**
- ARKit BlendShape → Live2D 参数映射（52 系数）
- 指数平滑 + 死区滤波，低延迟 **≤ 75ms**
- 麦克风：RMS 音量 → 嘴型开合，基频 → 语调情绪
- 跨平台透明悬浮窗：Windows / macOS / Linux

### 5. 角色一致性锁定
- **角色卡**：JSON 存档脸型 / 五官 / 配色 / 体型 / 服装 / 人设
- **参考图锚定**：正面 / 侧面 / 背面三视图约束生成
- **Embedding 锁定**：CLIP / 颜色直方图特征注入 Prompt
- 换装系统：同角色多套穿搭，主体形象不偏移

### 6. LLM 对话 + 语音 + 情绪联动
- 多模型：OpenAI GPT-4o / Claude 3 / Ollama 本地 Qwen
- 流式输出，逐字显示，实时情绪分析
- 免费 TTS：微软 Edge TTS（中文晓晓 / 日语 Nanami / 英文 Aria）
- ASR：Whisper / FunASR 本地语音识别
- **7 类情绪 → 表情 + 肢体参数联动**
- 语音指令：「换衣服」「晃头发」「收起桌宠」

### 7. Web 一站式工作台

| 页面 | 功能 |
| --- | --- |
| Dashboard | 总览、快捷入口、系统状态 |
| Characters | 角色卡 CRUD、参考图上传、历史存档 |
| Generate | Prompt 编辑、Provider 选择、实时进度 WebSocket |
| Layers | 分层可视化、拖拽排序、蒙版预览、PSD 导出 |
| Live2D | 骨骼树、参数滑块、物理调试、模型导出 |
| Preview | PixiJS 实时预览、Webcam 捕捉开关 |
| Chat | 聊天界面、语音输入、表情联动 |
| Export | PSD / PNG / 模型包 / 桌宠包 / 角色卡导出 |

## 快速上手

```bash
# 一键安装
bash install.sh     # macOS / Linux
install.bat         # Windows 双击

# 或 Docker 一键部署
docker compose up -d
# Web: http://localhost:3000   API: http://localhost:8080
```

命令行也能直接用（默认使用免费的 Pollinations 生成，无需 API Key）：

```bash
# 一句话生成角色
python -m core.cli generate "蓝发猫耳少女，白色背景，日系赛璐璐风格" --deploy-desktop

# 运行桌宠
python -m core.cli pet
```

## 在线体验

👉 [mw2wbyys6t-sudo.github.io/live2d-auto-pipeline](https://mw2wbyys6t-sudo.github.io/live2d-auto-pipeline/) —— 可以直接在浏览器里体验「一句话生成桌宠角色」，全部计算在本地浏览器完成，图片不会上传到任何服务器。

> 说明：Demo 页演示的自动分层使用简化的 **K-means 颜色聚类**（8 层）；完整版本采用 **SAM + ISNet 语义分割**（18 层）。

## 版本演进

| 功能 | v9.0 | v10.0 |
| --- | --- | --- |
| 图像分层 | K-means 颜色聚类 | SAM + ISNet 语义分割 + Amodal 补全 |
| Live2D 导出 | 空脚手架 model3.json | 完整 Cubism4 模型包（28 表情 + 物理 + 骨骼） |
| 桌宠驱动 | 预设循环动画 | MediaPipe 面部捕捉 + 麦克风音频驱动 |
| 角色一致性 | 每次随机变脸 | 角色卡 + 参考图锚定 + Embedding 锁定 |
| AI 对话 | 无 | LLM 流式对话 + TTS + 情绪联动 |
| 部署 | 手动 | Docker + 一键安装 + CI/CD |

## 许可证

Apache-2.0（欢迎包括商业用途在内的所有形式贡献）
