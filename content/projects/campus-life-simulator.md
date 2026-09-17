---
title: "中学生生活模拟器"
description: "用 Flutter + 鸿蒙（HarmonyOS）跨平台技术，从环境搭建开始，一步步构建出的校园生活模拟应用。"
category: "跨平台应用"
tags: ["Flutter", "HarmonyOS", "鸿蒙", "跨平台"]
order: 7
image: "/images/projects/campus-life-simulator.jpg"
stars: 0
links:
  - label: "入门前奏篇"
    url: "/blog/flutter-harmony-prelude"
  - label: "实战篇"
    url: "/blog/flutter-harmony-simulator"
  - label: "原文（CSDN）"
    url: "https://blog.csdn.net/2501_94355779/article/details/159885766"
---

## 项目简介

「中学生生活模拟器」是我在学习 **Flutter + 鸿蒙跨平台开发** 时动手做的一个 App 项目 —— 目标是用**一套代码**在鸿蒙设备上跑起来。

## 环境搭建

鸿蒙跨平台开发的本质，是在标准 Flutter 环境基础上，把 Flutter SDK 替换为**鸿蒙适配版本**，并配置好 DevEco Studio 的工具链路径。

前置准备有四步：

1. 安装 **Git**
2. 安装 **JAVA**（推荐 JDK 11+）
3. 安装 **DevEco Studio**
4. 搭建 **Flutter-OH 环境**

## 踩坑记录

环境变量 `TOOL_HOME` 的值一定要指向 DevEco Studio 的**实际安装路径**，写错是最常见的问题来源。

遇到报错时，重新进入软件、反复验证几次，基本都能跑通。

## 进展

环境跑通之后，就进入了 App 的初步开发阶段 —— 从工程结构到页面雏形，先把跨平台开发的完整链路走通一遍。
