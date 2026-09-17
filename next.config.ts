import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
