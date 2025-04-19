import { getCategoryList } from "@/lib/db/queries/category";
import { getAllResource } from "@/lib/db/queries/resource";
import { MetadataRoute } from "next";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pan.xiaozi.cc";

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

  const categories = await getCategoryList();
  const categoryRoutes = categories.map((category) => {
    if (category.key === "all") {
      return {
        url: `${baseUrl}/resource`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
      };
    }
    return {
      url: `${baseUrl}/resource?category=${category.key}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    };
  });

  const queryRoutes = resources.map((resource) => ({
    url: `${baseUrl}/resource?q=${resource.title}`,
    lastModified: resource.updatedAt || new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...resourceRoutes,
    ...queryRoutes,
  ];
}
