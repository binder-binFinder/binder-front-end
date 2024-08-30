import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 다른 Next.js 설정들
};

// PWA 설정 적용
export default withPWA({
  dest: "public", // PWA를 위한 service worker 파일이 생성될 경로
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // 개발 모드에서는 PWA 비활성화
})(nextConfig);
