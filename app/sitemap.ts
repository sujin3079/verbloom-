import type { MetadataRoute } from "next";

const base = "https://www.verbloom.co.kr";

// 검색엔진에 알려 줄 페이지 목록
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/fields", "/process", "/counselor", "/apply", "/refund", "/privacy"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
