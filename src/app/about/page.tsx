import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] to-[#31195f]">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center text-white mb-16">ABOUT</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/about/project" className="group">
            <div className="bg-purple-900/40 backdrop-blur-sm rounded-3xl p-8 h-full hover:bg-purple-900/50 transition-colors">
              <Quote className="h-12 w-12 text-purple-400 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Project About</h2>
              <p className="text-gray-300 mb-6">
                Learn more about our revolutionary military intelligence system and its capabilities.
              </p>
              <div className="flex items-center space-x-1 text-yellow-400 mb-8">
             
              </div>
              <div className="flex items-center">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Matt Zhang"
                  className="rounded-full w-10 h-10"
                />
                <div className="ml-3">
                  <p className="text-white font-medium">Matt Zhang</p>
                  <p className="text-sm text-gray-400">CEO at Borcelle</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/about/team" className="group">
            <div className="bg-purple-900/40 backdrop-blur-sm rounded-3xl p-8 h-full hover:bg-purple-900/50 transition-colors">
              <Quote className="h-12 w-12 text-purple-400 mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Team About</h2>
              <p className="text-gray-300 mb-6">
                Meet the talented team behind our innovative military intelligence platform.
              </p>
              <div className="flex items-center space-x-1 text-yellow-400 mb-8">
                
              </div>
              <div className="flex items-center">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Hannah Morales"
                  className="rounded-full w-10 h-10"
                />
                <div className="ml-3">
                  <p className="text-white font-medium">Hannah Morales</p>
                  <p className="text-sm text-gray-400">CFO at Borcelle</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}