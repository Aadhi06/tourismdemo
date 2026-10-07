/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
