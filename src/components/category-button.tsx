"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Category } from "@/lib/db/schema";

interface CategoryButtonProps {
  category: Category
}

export default function CategoryButton({ category }: CategoryButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  
  const isActive = 
    currentCategory === category.key || 
    (!currentCategory && category.key === "all");

  const handleCategoryClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category.key === "all") {
      params.delete("category");
    } else {
      params.set("category", category.key);
    }
    
    const pathname = window.location.pathname;
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        isActive && "bg-blue-50 text-blue-600 font-medium"
      )}
      onClick={handleCategoryClick}
    >
      {category.name}
    </Button>
  );
} 