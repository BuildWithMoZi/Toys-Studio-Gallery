import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    // Static export has no image optimization server, so serve images as-is.
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "toyfort.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
