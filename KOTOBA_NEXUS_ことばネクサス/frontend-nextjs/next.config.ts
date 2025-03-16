import type { NextConfig } from "next";

const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || "";
const cloudfrontHostname = new URL(cloudfrontUrl).hostname;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: cloudfrontHostname,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
