'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { ArrowRight, ArrowLeft, Quote, Github, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'

const teamMembers = [
  { 
    name: "John Doe", 
    contribution: "Lead Developer", 
    image: "/placeholder.svg?height=96&width=96", 
    quote: "Pushing the boundaries of military intelligence systems.",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  { 
    name: "Jane Smith", 
    contribution: "AI Specialist", 
    image: "/placeholder.svg?height=96&width=96", 
    quote: "Revolutionizing data analysis with cutting-edge AI.",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith"
  },
  { 
    name: "Mike Johnson", 
    contribution: "Security Expert", 
    image: "/placeholder.svg?height=96&width=96", 
    quote: "Ensuring top-notch security for sensitive operations.",
    github: "https://github.com/mikejohnson",
    linkedin: "https://linkedin.com/in/mikejohnson"
  },
  { 
    name: "Emily Brown", 
    contribution: "UX Designer", 
    image: "/placeholder.svg?height=96&width=96", 
    quote: "Creating intuitive interfaces for complex systems.",
    github: "https://github.com/emilybrown",
    linkedin: "https://linkedin.com/in/emilybrown"
  },
  { 
    name: "Alex Lee", 
    contribution: "Project Manager", 
    image: "/placeholder.svg?height=96&width=96", 
    quote: "Coordinating efforts to deliver cutting-edge solutions.",
    github: "https://github.com/alexlee",
    linkedin: "https://linkedin.com/in/alexlee"
  },
]

export default function TeamCarouselPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigateTeam = (newDirection: 'prev' | 'next') => {
    setDirection(newDirection === 'next' ? 1 : -1)
    if (newDirection === 'prev') {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : teamMembers.length - 1))
    } else {
      setCurrentIndex((prevIndex) => (prevIndex < teamMembers.length - 1 ? prevIndex + 1 : 0))
    }
  }

  const currentMember = teamMembers[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] to-[#31195f]">
        <Navbar /> 
      <main className="container mx-auto px-4 py-12">
        <div className="bg-purple-900/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button 
              onClick={() => navigateTeam('prev')}
              className="p-2 hover:bg-purple-900/30 rounded-full transition-colors pointer-events-auto"
              aria-label="Previous team member"
            >
              <ArrowLeft className="h-6 w-6 text-white/70 hover:text-white" />
            </button>
            <button 
              onClick={() => navigateTeam('next')}
              className="p-2 hover:bg-purple-900/30 rounded-full transition-colors pointer-events-auto"
              aria-label="Next team member"
            >
              <ArrowRight className="h-6 w-6 text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 * direction }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-8"
            >
              <div className="text-purple-400/60">
                <Quote className="h-24 w-24 mx-auto rotate-180" />
              </div>

              <p className="text-white text-xl md:text-2xl max-w-2xl mx-auto">
                {currentMember.quote}
              </p>

              <div className="pt-8 space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <img
                    src={currentMember.image}
                    alt={currentMember.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-white font-medium text-lg">{currentMember.name}</p>
                  <p className="text-purple-200/80 text-sm">{currentMember.contribution}</p>
                </div>

                <div className="flex justify-center space-x-4 pt-2">
                  <a 
                    href={currentMember.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors"
                    aria-label={`${currentMember.name}'s GitHub`}
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a 
                    href={currentMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors"
                    aria-label={`${currentMember.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}