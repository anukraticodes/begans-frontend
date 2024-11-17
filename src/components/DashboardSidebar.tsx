import React from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { MessageSquare, Settings, Box } from 'lucide-react'


import { Button } from "@/components/ui/button"

type Chat = {
  id: string;
  title: string;
}

const recentChats: Chat[] = [
  { id: '12345-67890-abcde-fghij', title: 'Drone Surveillance #1' },
  { id: '54321-09876-zyxwv-utsrq', title: 'Night Patrol #3' },
  { id: 'abcde-fghij-12345-67890', title: 'Perimeter Scan' },
]

export function Sidebar() {
  const router = useRouter()
  const params = useParams()  // Using useParams to get route parameters
  const currentChatId = params.id as string  // Get the chat ID from the params
  const handleNewAnalysis = () => {
    const newChatId = generateUniqueId()
    router.push(`/dashboard/${newChatId}`)
  }

  return (
    <div className="w-64 bg-zinc-900 text-white p-4 h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Military Vision</h1>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <Button className="w-full mb-8" size="lg" onClick={handleNewAnalysis}>
        <MessageSquare className="mr-2 h-5 w-5" />
        New Analysis
      </Button>

      <div className="space-y-2">
        <h2 className="text-sm text-zinc-400 mb-4">Recent Analysis</h2>
        {recentChats.map((chat) => (
          <Link 
            key={chat.id} 
            href={`/dashboard/${chat.id}`}
            className={`flex items-center text-sm ${
              currentChatId === chat.id ? 'text-white bg-zinc-800' : 'text-zinc-300 hover:text-white'
            } rounded-md p-2`}
          >
            <Box className="mr-2 h-4 w-4" />
            {chat.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

function generateUniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}