import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";
  const staticRoutes = [
    "",
    "/projects",
    "/analytics",
    "/playground",
    "/playground/checklist",
    "/playground/rs485",
    "/playground/automation",
    "/skills",
    "/lab",
    "/experience",
    "/recruiter",
    "/contact",
  ] as const;

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date("2026-10-11"),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date("2026-10-11"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
