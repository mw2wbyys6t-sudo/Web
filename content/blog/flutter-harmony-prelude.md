---
title: "鸿蒙跨平台开发：Flutter-OH 环境搭建入门前奏"
date: "2026-04-04"
category: "鸿蒙跨平台"
excerpt: "想在鸿蒙设备上用 Flutter 跑起一个 App，第一步是把环境搭对。这篇记录 Flutter-OH 环境搭建的四个前置步骤和一个高频报错的解法。"
tags: ["Flutter", "HarmonyOS", "环境搭建"]
links:
  - label: "阅读原文（CSDN）"
    url: "https://blog.csdn.net/2501_94355779/article/details/159835564"
  - label: "下一篇：Flutter + 鸿蒙实战"
    url: "/blog/flutter-harmony-simulator"
---

想用 Flutter 开发鸿蒙应用，第一步就是把 **Flutter-OH（Flutter for OpenHarmony）** 环境搭好。

这篇是「入门前奏」，主要讲环境层面的准备。

## 四个前置步骤

1. 安装 **Git**
2. 安装 **JAVA**（推荐 JDK 11+）
3. 安装 **DevEco Studio**
4. 进行 **Flutter-OH 环境搭建**

全部完成后，会出现成功的提示界面，说明环境已经装好了。

## 高频报错：TOOL_HOME 配错

搭建过程中最常见的一个问题，是环境变量 `TOOL_HOME` 的值填错了。

**这个值必须指向 DevEco Studio 的实际安装路径**，不能凭感觉写。这也是很多人卡在这一步的原因。

## 本质是什么

Flutter-OH 的环境搭建，本质上是在**标准 Flutter 环境**的基础上：

- 把 Flutter SDK 替换为**鸿蒙适配版本**
- 配置好 **DevEco Studio 的工具链路径**

## 小结

遇到报错不要慌，重新进入软件、反复验证几次，基本都能跑通。
