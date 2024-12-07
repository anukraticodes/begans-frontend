'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const sidebarItems = [
  { name: 'Dashboard', href: '/training' },
  { name: 'Train Model', href: '/training/train' },
  { name: 'Manage Versions', href: '/training/versions' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r border-gray-200 bg-white lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b border-gray-200 px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="text-lg text-gray-800">BeGANS Dashboard</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-2 py-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

