import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: '@import "@/styles/main.scss";',
  },
  images: {
    domains: ["binder-bucket.s3.ap-northeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sangchu-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/binder/img/**",
      },
    ],
  },
  // 다른 Next.js 설정들
};

export default withPWA({
  dest: "public", // PWA를 위한 service worker 파일이 생성될 경로
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // 개발 모드에서는 PWA 비활성화
})(nextConfig);
