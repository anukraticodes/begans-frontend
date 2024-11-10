import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] to-[#31195f] py-6">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="bg-purple-900/20 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 rounded-full bg-[#6b4899]/20 text-purple-200 backdrop-blur-sm text-sm border border-purple-500/20">
                Image Conversational chatbot
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Military Intelligence System
              </h1>
              
              <p className="text-lg text-gray-300/90 leading-relaxed max-w-xl">
                A comprehensive system for military drone imagery analysis using advanced computer 
                vision and deep learning techniques. The system provides real-time object detection, 
                terrain analysis, movement tracking, and tactical assessment capabilities.
              </p>

              <Button 
                asChild
                className="group inline-flex items-center px-8 py-6 rounded-full bg-white text-black hover:bg-gray-100 transition-all hover:pr-9 text-lg"
              >
                <Link href="/get-started">
                  Let's BeGANs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Military Intelligence Interface"
                className="rounded-2xl w-full object-cover shadow-2xl shadow-purple-950/50"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}