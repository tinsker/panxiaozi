"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
} from "./ui/dialog";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

// 动态导入QRCode组件，避免SSR问题
const QRCode = dynamic(() => import("react-qr-code"), {
	ssr: false,
	loading: () => <Loader2 className="h-8 w-8 animate-spin text-primary" />
});

interface ClientLinkProps {
	id: number;
	title: string;
	categoryKey: string;
	url: string;
	externalUrl: string;
	children?: React.ReactNode; // 子元素
	[key: string]: any; // 允许任意其他 props
}

export function ClientLink({
	id,
	title,
	categoryKey,
	url,
	externalUrl,
	children,
	...restProps
}: ClientLinkProps): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [successUrl, setSuccessUrl] = useState("");

	const handleClick = async () => {
		// 如果已有URL，直接显示二维码
		if (url) {
			setSuccessUrl(url);
			setDialogOpen(true);
			return;
		}

		setLoading(true);
		try {
			// 更新数据库
			const response = await fetch('/api/resource-disk/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					title,
					categoryKey,
					externalUrl
				}),
			});

			const data = await response.json();
			const newUrl = data.url;

			// 设置成功URL并打开弹窗
			setSuccessUrl(newUrl);
			setDialogOpen(true);

		} catch (error) {
			console.error("转存失败:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				variant="ghost"
				onClick={handleClick}
				{...restProps}
				disabled={loading}
			>
				{loading ? "获取中..." : children}
			</Button>

			<Dialog open={dialogOpen} onOpenChange={(open) => {
				setDialogOpen(open);
			}}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>扫描二维码</DialogTitle>
						<DialogDescription>
							请使用手机扫描二维码访问资源链接
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col items-center justify-center py-4 space-y-4">
						<div className="bg-white p-4 rounded-md">
							{successUrl && <QRCode value={successUrl} size={200} />}
						</div>
					</div>
					<DialogFooter className="sm:justify-between">
						<Button
							variant="secondary"
							onClick={() => {
								setDialogOpen(false);
							}}
						>
							关闭
						</Button>
						<Button
							onClick={() => {
								window.open(successUrl, "_blank");
								setDialogOpen(false);
							}}
						>
							打开链接
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
