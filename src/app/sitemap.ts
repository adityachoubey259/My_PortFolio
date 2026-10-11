import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "http://localhost:3000",
      lastModified: new Date("2026-10-11"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
