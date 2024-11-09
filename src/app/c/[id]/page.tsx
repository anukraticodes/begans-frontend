'use client'

import * as React from "react"
import { Send, Paperclip, Camera, MoreHorizontal, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useParams } from 'next/navigation' // Import useParams from next/navigation
import { loadMockData } from "@/lib/loadData" // Assuming the path for your data is correct

interface Message {
  id: number
  content: string
  role: 'user' | 'assistant'
  image?: string
  timestamp: string
}

function MessageBubble({ message, isLast }: { message: Message; isLast: boolean }) {
  const isUser = message.role === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={cn(
        "flex gap-3",
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg p-3 max-w-[80%] relative group",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}
      >
        {message.content}
        {message.image && (
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={message.image} 
            alt="Uploaded content"
            className="mt-2 rounded-md max-w-full h-auto cursor-pointer transition-transform hover:scale-[0.98]" 
          />
        )}
       
      </div>
      {isUser && (
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-lg p-3 flex items-center gap-1">
        <motion.div
          className="w-2 h-2 rounded-full bg-current"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-current"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.2, repeatDelay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-current"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.4, repeatDelay: 0.2 }}
        />
      </div>
    </div>
  )
}

export default function ChatInterface() {
  const params = useParams()  // Using useParams to get route parameters
  const chatId = params.id as string  // Get the chat ID from the params
  
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Load messages for the specific chatId
  React.useEffect(() => {
    if (chatId) {
      const chatData = loadMockData().find(chat => chat.id.toString() === chatId)
      if (chatData) {
        setMessages(chatData.messages)
      }
    }
  }, [chatId])

  const handleSend = () => {
    if (!inputValue.trim() && !selectedImage) return
    
    const newMessage: Message = {
      id: Date.now(),
      content: inputValue,
      role: 'user',
      image: selectedImage || undefined,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputValue("")
    setSelectedImage(null)
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now(),
        content: "I've received your message. How can I help you further?",
        role: 'assistant',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Chat {chatId}</h1>
          <span className="text-sm text-muted-foreground">with Image Analysis AI</span>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Clear chat</DropdownMenuItem>
              <DropdownMenuItem>Export chat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                isLast={index === messages.length - 1} 
              />
            ))}
          </AnimatePresence>
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t overflow-hidden"
          >
            <div className="p-4 max-w-2xl mx-auto">
              <div className="relative inline-block">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="h-32 rounded-lg object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -top-2 -right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    ×
                  </motion.div>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim() && !selectedImage}
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
