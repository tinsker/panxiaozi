"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface WechatQRModalProps {
  src: string;
  alt: string;
}

export function WechatQRModal({ src, alt }: WechatQRModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-2 p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="点击放大图片"
        >
          <img src={src} alt={alt} className="max-w-[200px] h-auto" />
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none">
        <div className="flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
