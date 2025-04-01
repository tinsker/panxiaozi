"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Logo } from "./logo"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "首页", href: "/" },
  { label: "资源", href: "/resource" },
]

export function Header() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-xl font-bold text-blue-500">盘小子</span>
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex gap-5">
              {navItems.map((item) => {
                const isActive = 
                  pathname === item.href || 
                  (item.href !== "/" && pathname?.startsWith(item.href))
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm font-medium ${
                        isActive 
                          ? "text-blue-500 font-semibold" 
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="hidden md:flex">
            登录/注册
          </Button>
          <div className="rounded-full bg-gray-100 p-1">
            <span className="text-xs">用户</span>
          </div> */}
        </div>
      </div>
    </header>
  )
}
