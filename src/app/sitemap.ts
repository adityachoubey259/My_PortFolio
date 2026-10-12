import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticRoutes = [
    "",
    "/projects",
    "/about",
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
