import type { NextConfig } from "next";

// 静态导出（GitHub Pages）由环境变量开启，本地 dev / 服务端构建保持原样。
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";
// GitHub Pages 项目站点部署在子路径下（如 /Web）。
// CI 里直接取仓库名自动推导，本地开发为空，也可用 NEXT_PUBLIC_BASE_PATH 覆盖。
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isStaticExport && repoName ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: basePath || undefined,
  trailingSlash: isStaticExport ? true : undefined,
  images: isStaticExport
    ? { loader: "custom", loaderFile: "./image-loader.ts" }
    : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "**.remote-agent.svc.cluster.local",
    "*.remote-agent.svc.cluster.local",
    "remote-agent.svc.cluster.local",
    "**.traecontent.cn",
    "*.traecontent.cn",
  ],
};

export default nextConfig;
