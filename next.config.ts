import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Toys-Studio-Gallery";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
  },
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: repoBasePath,
        assetPrefix: `${repoBasePath}/`,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
