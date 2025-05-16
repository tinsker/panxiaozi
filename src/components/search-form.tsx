"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchForm({ initialQuery = "", path = "" }) {
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const router = useRouter();
	let pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSearch = () => {
		// 创建新的URLSearchParams对象
		const params = new URLSearchParams(searchParams.toString());

		// 设置搜索查询参数
		params.set("q", searchQuery);

		// 如果存在page参数，删除它（让系统重置到第一页）
		if (params.has("page")) {
			params.delete("page");
		}

		if (path != "") {
			pathname = path;
		}

		// 使用当前路径和更新后的参数进行导航
		router.push(`${pathname}?${params.toString()}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	// 当URL参数中的q值变化时更新搜索框
	useEffect(() => {
		const query = searchParams.get("q") || "";
		setSearchQuery(query);
	}, [searchParams]);

	return (
		<div className="flex gap-2 justify-center">
			<div className="relative w-3/4">
				<Input
					placeholder="请输入关键词搜索"
					className="rounded-lg pl-10 pr-4 py-2 w-full"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<div className="absolute left-3 top-1/2 -translate-y-1/2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</svg>
				</div>
			</div>
			<Button onClick={handleSearch}>搜索</Button>
		</div>
	);
}
