import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Download,
  Scan,
  AlertTriangle,
  ChevronRight,
  TriangleAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getRelatedResources,
  getResourceByPinyin,
} from "@/lib/db/queries/resource";
import { ClientLink } from "@/components/client-link";
import ClickboardButton from "@/components/clickboard-button";
import { Metadata } from "next";
import { formatDate } from "@/utils";
import { Resource } from "@/lib/db/schema";

// export const generateMetadata = async ({
//   params,
// }: {
//   params: { q: string };
// }) => {
//   const query = params.q;
//   if (!query) {
//     return {
//       title: "资源列表 - 盘小子",
//       description:
//         "盘小子是一个一站式网盘资源搜索引擎，支持夸克网盘、百度网盘、阿里云盘等多平台，快速精准搜索，一键直达",
//     };
//   }

//   return {
//     title: `${query}在线网盘资源搜索下载 - 盘小子`,
//     description: `盘小子是一个一站式网盘资源搜索引擎，支持夸克网盘、百度网盘、阿里云盘等多平台，快速精准搜索，一键直达`,
//   };
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const name = (await params).name;
  const resource = await getResourceByPinyin(name);
  return {
    title: `${resource?.title || ""}${
      resource?.diskType || ""
    }网盘资源下载 - 盘小子`,
    description:
      resource?.desc ||
      "盘小子是一个一站式网盘资源搜索引擎，支持夸克网盘、百度网盘、阿里云盘等多平台，快速精准搜索，一键直达",
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  const resource = await getResourceByPinyin(name);
  let relatedResources: Resource[] = [];
  if (resource && resource?.title) {
    relatedResources = await getRelatedResources(resource?.title as string);
  }

  if (!resource) {
    return (
      <div className="container flex justify-center items-center mt-60">
        资源不存在
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 text-base">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:underline">
          首页
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/resource" className="hover:underline">
          资源
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="#" className="hover:underline">
          {resource.diskType}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">{resource.title}</span>
      </div>

      <div className="bg-card rounded-lg p-6 mb-6 shadow-sm">
        <h1 className="flex justify-center text-2xl font-bold text-center mb-8">
          <Badge
            variant="outline"
            className="mr-2 bg-blue-50 text-blue-600 border-blue-200"
          >
            <span>{resource.diskType}</span>
          </Badge>
          <p className="text-xl">{resource.title}</p>
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="font-medium mb-2">资源描述:</span>
            <p className="text-muted-foreground">{resource.desc}</p>
          </div>

          <div className="flex items-center">
            <span className="font-medium mr-2">更新时间:</span>
            <span className="text-muted-foreground">
              {resource.updatedAt ? formatDate(resource.updatedAt) : "未知"}
            </span>
          </div>
        </div>
      </div>

      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-700">
          资源一定要转到夸克网盘方可观看全部，否则只能观看2分钟的试片，夸克还可以投屏！资源不对的话添加微信
          talefu 免费帮找!
        </AlertDescription>
      </Alert>

      <div className="bg-card rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center mb-4">
          <span className="font-medium">资源地址:</span>
          <div className="ml-2 flex flex-wrap gap-2">
            <ClientLink
              url={resource.url}
              variant="outline"
              className="flex items-center gap-1 text-blue-600"
            >
              <Download className="h-4 w-4" />
              点击获取
            </ClientLink>
            <ClickboardButton
              variant="outline"
              className="flex items-center gap-1"
              text={resource.url}
            >
              <Copy className="h-4 w-4" />
              复制
            </ClickboardButton>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-red-500"
            >
              <TriangleAlert className="h-4 w-4" />
              失效反馈
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">同类资源</h2>
          <Link
            href={`/resource?q=${resource.title}`}
            className="text-sm text-muted-foreground hover:underline flex items-center"
          >
            更多 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {relatedResources.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <span className="text-primary font-medium mr-2">{index + 1}</span>
              <Link
                href={`/resource/${item.pinyin}`}
                className="hover:text-primary hover:underline truncate"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
