import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://umapathi.dev";
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/experience", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/projects", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/publications", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/tech-stack", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/ai-lab", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/architecture", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/resume", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/projects/transit-analytics-recommendation-system", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/projects/hiring-platform", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
