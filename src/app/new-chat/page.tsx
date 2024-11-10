'use client'

import React, { useEffect, useState, useRef } from 'react';
import { Camera, ImagePlus, Send, X, Sun, Moon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatSidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_CHARS = 1000;
const MIN_TEXTAREA_HEIGHT = 30;
const MAX_TEXTAREA_HEIGHT = 200;

const Page = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Load theme from local storage on initial render
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || 'light');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Save theme changes to local storage and apply to the document
  useEffect(() => {
    window.localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() && !selectedImage) return;
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInputValue('');
    setSelectedImage(null);
    setIsSending(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value.slice(0, MAX_CHARS));
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        Math.max(textareaRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT),
        MAX_TEXTAREA_HEIGHT
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className={`flex h-screen bg-background ${theme === 'dark' ? 'dark' : 'light'}`}>
      <ChatSidebar activeChat="" />
      <main className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold mb-8 text-foreground"
          >
            What can I help with?
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl relative flex flex-col items-center bg-muted rounded-2xl shadow-inner p-4 pt-2 pl-1 pr-1 mb-4"
          >
            <div className="w-full relative">
              <Textarea
                ref={textareaRef}
                placeholder="Type a message..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-full pl-1 pr-12 py-3 bg-transparent border-none text-base focus-visible:ring-0 rounded-xl resize-none overflow-auto custom-scrollbar"
                style={{
                  minHeight: `${MIN_TEXTAREA_HEIGHT}px`,
                  maxHeight: `${MAX_TEXTAREA_HEIGHT}px`
                }}
                disabled={isSending}
              />
              <Button
                className={cn(
                  "absolute right-2 bottom-2 rounded-full transition-colors",
                  !inputValue.trim() && !selectedImage && "text-muted-foreground bg-transparent",
                  (inputValue.trim() || selectedImage) && "bg-primary text-primary-foreground"
                )}
                size="icon"
                onClick={handleSend}
                disabled={(!inputValue.trim() && !selectedImage) || isSending}
              >
                {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
            <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
              <span>{inputValue.length} / {MAX_CHARS}</span>
            </div>
          </motion.div>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative inline-block mt-4"
              >
                <img src={selectedImage} alt="Selected" className="max-w-md h-auto rounded-lg shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Page;
