import { Resource } from "@/lib/db/schema";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface SearchResultsProps {
  list: Resource[];
}

export default async function SearchResults({ list }: SearchResultsProps) {
  return (
    <div className="space-y-6 text-base">
      {list.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到相关结果</p>
        </div>
      ) : (
        list.map((result) => (
          <div
            key={result.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <Link href={`/resource/${result.pinyin}`} className="block">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-blue-600 bg-blue-50">
                  {result.diskType}
                </Badge>
                <h2 className="hover:underline">{result.title}</h2>
              </div>
              <p className="mt-2 text-gray-600 text-sm">{result.desc}</p>
              <p className="mt-2 text-gray-600 text-sm">
                {result.updatedAt?.toLocaleString()}
              </p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
