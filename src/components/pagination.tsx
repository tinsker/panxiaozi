"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  props?: any;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // 为每个页码创建正确的URL参数
  const createPageUrl = (pageNum: number) => {
    // 创建一个新的 URLSearchParams 对象
    const params = new URLSearchParams();

    // 复制现有的查询参数
    if (searchParams) {
      searchParams.forEach((value, key) => {
        params.append(key, value);
      });
    }

    // 设置页码参数
    params.set("page", pageNum.toString());

    return `${pathname}?${params.toString()}`;
  };

  // 处理页面切换
  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) {
      return;
    }
    
    // 调用父组件传入的回调函数
    if (onPageChange) {
      onPageChange(pageNum);
    }
    
    // 导航到新页面
    router.push(createPageUrl(pageNum));
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // 如果总页数小于等于要显示的最大页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 否则，显示当前页附近的页码
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const showEllipsisStart = pageNumbers[0] > 1;
  const showEllipsisEnd = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            onClick={(e) => {
              if (currentPage > 1) {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }
            }}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            上一页
          </PaginationPrevious>
        </PaginationItem>

        {showEllipsisStart && (
          <>
            <PaginationItem>
              <PaginationLink 
                href={createPageUrl(1)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageUrl(page)}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEllipsisEnd && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                href={createPageUrl(totalPages)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"
            }
            onClick={(e) => {
              if (currentPage < totalPages) {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }
            }}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            下一页
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
