import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
export default function Navbar() {
    return (
<header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-white text-2xl font-bold tracking-tighter hover:opacity-90 transition-opacity"
          >
            BEGANS
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              href="/new-chat" 
              className="text-gray-200 hover:text-white transition-colors text-sm relative group"
            >
              chatbot
              <span className="absolute inset-x-0 -bottom-1 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-200 hover:text-white transition-colors text-sm relative group"
            >
              dashboard
              <span className="absolute inset-x-0 -bottom-1 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="text-gray-200 hover:text-white transition-colors text-sm relative group"
            >
              About
              <span className="absolute inset-x-0 -bottom-1 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          </div>

          <Link 
            href="https://github.com" 
            className="inline-flex items-center px-5 py-2 rounded-full bg-white text-black hover:bg-gray-100 transition-all hover:pr-6 text-sm font-medium"
          >
            <span className="mr-2">GITHUB</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>
    )
}