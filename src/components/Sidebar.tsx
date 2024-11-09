'use client'

import * as React from 'react'
import { ImageIcon, PlusCircle, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import { loadMockData, Chat } from '@/lib/loadData'

interface ChatSidebarProps {
  activeChat: string
}

export function ChatSidebar({ activeChat }: ChatSidebarProps) {
  const router = useRouter()
  const [chats, setChats] = React.useState<Chat[]>([])

  // Load mock data initially
  React.useEffect(() => {
    const loadedChats = loadMockData()
    setChats(loadedChats)
  }, [])

  const handleNewChat = () => {
    const newChatId = `new-${Date.now()}`
    router.push(`/new-chat`)
  }

  const handleChatSelect = (chatId: string) => {
    router.push(`/c/${chatId}`)
  }

  return (
    <div className="w-80 border-r border-border bg-background">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-foreground">Image Chat AI</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNewChat}>
            <PlusCircle className="h-5 w-5" />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8 bg-background" placeholder="Search conversations..." />
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2 p-2">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant={chat.id === activeChat ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-2 text-left"
                onClick={() => handleChatSelect(chat.id)}
              >
                <ImageIcon className="h-4 w-4" />
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium text-foreground">{chat.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].content
                      : 'No messages yet'}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
