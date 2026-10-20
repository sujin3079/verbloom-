import type { MetadataRoute } from "next";

// 모든 검색엔진이 사이트를 읽을 수 있게 하고, 사이트 지도 위치를 알려 줍니다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://www.verbloom.co.kr/sitemap.xml",
  };
}
