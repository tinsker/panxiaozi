import { and, count, desc, eq, like, or } from "drizzle-orm";
import { db } from "../index";
import { Resource, resource } from "../schema";
import { PageResult } from "@/types";

// 获取首页资源信息
export async function getHomeResource(): Promise<Resource[]> {
  return await db
    .select()
    .from(resource)
    .where(eq(resource.isShowHome, 1))
    .orderBy(desc(resource.id));
}

export async function getAllResource(): Promise<Resource[]> {
  return await db.select().from(resource).orderBy(desc(resource.id));
}

export async function getResourceCount(): Promise<number> {
  const result = await db.select({ value: count() }).from(resource);
  if (result.length > 0) {
    return result[0].value;
  }
  return 3306;
}

export async function getResourcePageList(
  page = 1,
  pageSize = 10,
  query: string = "",
  category: string = ""
): Promise<PageResult<Resource>> {
  const list = await db
    .select()
    .from(resource)
    .where(
      and(
        query != "" ? like(resource.title, "%" + query + "%") : undefined,
        category != "" ? eq(resource.categoryKey, category) : undefined
      )
    )
    .orderBy(desc(resource.updatedAt), desc(resource.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalResult = await db
    .select({ value: count() })
    .from(resource)
    .where(
      and(
        query != "" ? like(resource.title, query) : undefined,
        category != "" ? eq(resource.categoryKey, category) : undefined
      )
    );
  let total = 0;
  if (totalResult.length > 0) {
    total = totalResult[0].value;
  }

  return {
    list,
    total,
  };
}

export async function getHotResource(): Promise<Resource[]> {
  return await db
    .select()
    .from(resource)
    .orderBy(desc(resource.hotNum), desc(resource.id))
    .limit(10);
}

export async function saveResource(
  id: number | undefined,
  title: string,
  categoryKey: string,
  url: string,
  pinyin: string,
  desc: string,
  diskType: string,
  hotNum: number,
  isShowHome: number | null
) {
  if (id) {
    await db
      .update(resource)
      .set({
        title,
        categoryKey,
        url,
        pinyin,
        desc,
        diskType,
        hotNum,
        isShowHome,
      })
      .where(eq(resource.id, id));
  } else {
    await db.insert(resource).values({
      title,
      categoryKey,
      url,
      pinyin,
      desc,
      diskType,
      hotNum,
      isShowHome,
    });
  }
}

export async function deleteResource(id: number) {
  await db.delete(resource).where(eq(resource.id, id));
}

export async function getResourceByPinyin(
  name: string
): Promise<Resource | null> {
  const list = await db
    .select()
    .from(resource)
    .where(eq(resource.pinyin, name))
    .limit(1);
  if (list.length == 0) {
    return null;
  }
  return list[0];
}

export async function getRelatedResources(title: string): Promise<Resource[]> {
  // 生成递进的子串数组
  let substrings = Array.from({ length: title.length }, (_, i) =>
    title.slice(0, i + 1)
  );
  substrings = substrings.reverse();
  console.log(substrings);

  const list = await db
    .select()
    .from(resource)
    .where(
      or(...substrings.map((substr) => like(resource.title, `${substr}%`)))
    )
    .limit(10);

  return list;
}
