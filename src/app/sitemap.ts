import { getAllResource } from "@/lib/db/queries/resource";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 基础URL
  const baseUrl = "https://pan.xiaozi.cc";

  // 静态路由
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/resource`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
  ] as const;

  const resources = await getAllResource();
  const resourceRoutes = resources.map((resource) => ({
    url: `${baseUrl}/resource/${resource.pinyin}`,
    lastModified: resource.updatedAt || new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const queryRoutes = resources.map((resource) => ({
    url: `${baseUrl}/resource?q=${resource.title}`,
    lastModified: resource.updatedAt || new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...resourceRoutes, ...queryRoutes];
}
