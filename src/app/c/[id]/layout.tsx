'use client'

import { ChatSidebar } from '@/components/Sidebar'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ChatSidebar activeChat="" onChatSelect={() => {}} />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
