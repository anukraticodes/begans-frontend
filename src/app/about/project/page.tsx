import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function ProjectAboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] to-[#31195f]">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <Link 
          href="/about"
          className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to About
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Project Overview</h1>
          
          <div className="bg-purple-900/40 backdrop-blur-sm rounded-3xl p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300">
                Our Military Intelligence System represents a breakthrough in automated surveillance and tactical analysis. 
                Built with cutting-edge AI and machine learning technologies, it provides military personnel with real-time 
                insights and actionable intelligence.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h2>
              
              <ul className="space-y-4 text-gray-300">
                <li>Advanced drone imagery analysis with real-time object detection</li>
                <li>Terrain mapping and analysis for tactical planning</li>
                <li>Movement tracking with predictive trajectory analysis</li>
                <li>Secure data transmission and storage protocols</li>
                <li>Integration with existing military infrastructure</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Technology Stack</h2>
              
              <ul className="space-y-4 text-gray-300">
                <li>Deep learning frameworks for image processing</li>
                <li>Custom computer vision algorithms</li>
                <li>Distributed computing architecture</li>
                <li>Military-grade encryption standards</li>
              </ul>

              <div className="mt-8 pt-8 border-t border-purple-500/20">
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Matt Zhang"
                    className="rounded-full w-12 h-12"
                  />
                  <div className="ml-4">
                    <p className="text-white font-medium">Matt Zhang</p>
                    <p className="text-sm text-gray-400">CEO at Borcelle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}