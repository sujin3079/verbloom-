import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 상담신청서 화면에서 쓰는 공개용 Supabase 값 (Vercel에 넣은 이름 그대로 사용)
  // 비밀 키(SUPABASE_SECRET_KEY)는 절대 여기에 넣지 않습니다.
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY:
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
