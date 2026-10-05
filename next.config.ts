import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 프로필 사진(data/profile.json의 avatar) 호스트 허용
    // Unsplash는 ?w=400 같은 쿼리로 크기를 지정하므로 search는 생략(모두 허용)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
