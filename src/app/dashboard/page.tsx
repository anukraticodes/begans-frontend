'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronRight, Bell, Send, ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "@/components/DashboardSidebar"
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function MilitaryVisionDashboard() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleNewChat = async () => {
    if (!message && !uploadedImage) {
      toast({
        title: "Input required",
        description: "Please enter a message or upload an image to start a new analysis.",
        variant: "destructive",
      })
      return
    }

    const token = getCookie('token')
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to start a new analysis.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    if (message) formData.append('message', message)
    if (uploadedImage) formData.append('image', uploadedImage)
    console.log(formData)
    try {
      const response = await fetch('http://localhost:8000/api/chat/context', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to start new chat')
      }

      const data = await response.json()

      toast({
        title: "Analysis Started",
        description: "Your request has been sent for processing.",
      })
      setMessage('')
      setUploadedImage(null)
      
      // Redirect to the new chat page
      router.push(`/dashboard/${data.id}`)
    } catch (error) {
      console.error('Error starting new chat:', error)
      toast({
        title: "Error",
        description: "Failed to start new analysis. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeUploadedImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleNewChat()
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  const handleMouseEnter = () => setShowSidebar(true)
  const handleMouseLeave = (event: React.MouseEvent) => {
    if (
      !event.relatedTarget ||
      !(event.relatedTarget as HTMLElement).closest(".sidebar")
    ) {
      setShowSidebar(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div onMouseLeave={handleMouseLeave}>
          <Sidebar isVisible={showSidebar} />
        </div>
      </motion.div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 shadow-md">
          <div className="flex items-center">
            <div 
              className="relative z-50"
              onMouseEnter={handleMouseEnter}
            >
              <h1 className={`text-2xl font-bold cursor-pointer transition-colors duration-200 ${
                showSidebar ? "text-white " : "dark:text-white"
              }`}>
                <Link href="/dashboard">
                  Vision Intelligence
                </Link>
              </h1>
            </div>
            <div className="ml-10 text-sm text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full inline-block">
              All Detection Models Active
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>VA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 dark:text-indigo-300">
              How can I assist you today?
            </h2>
            <Card className="bg-white dark:bg-zinc-800 shadow-xl rounded-xl overflow-hidden">
              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-video"
                >
                  <Image
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded image"
                    layout="fill"
                    objectFit="contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeUploadedImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
              <CardContent className="p-4">
                <div className="flex items-end space-x-2">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Describe the scenario or ask a question..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      adjustTextareaHeight()
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-h-[60px] max-h-[200px] resize-none overflow-auto bg-transparent border-none focus:ring-0 text-lg placeholder-indigo-300 dark:placeholder-indigo-600 text-indigo-700 dark:text-indigo-300 transition-all duration-300 ease-in-out"
                    rows={1}
                  />
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={triggerFileInput}
                      className="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 border-none text-indigo-600 dark:text-indigo-400 transition-all duration-300 ease-in-out"
                    >
                      <ImagePlus className="h-5 w-5" />
                    </Button>
                    <Button 
                      onClick={handleNewChat}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 ease-in-out"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  )
}

