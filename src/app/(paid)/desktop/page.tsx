'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'

const useCases = [
  { name: 'Media', color: '#FF6B6B' },
  { name: 'Freelance', color: '#4ECDC4' },
  { name: 'Academic', color: '#45B7D1' },
  { name: 'Corporate', color: '#5D5D5D' },
  { name: 'Consulting', color: '#6C5CE7' },
]

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cpuType, setCpuType] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % useCases.length)
    }, 5000)

    // CPU detection with timeout
    const detectCPU = async () => {
      try {
        const timeoutPromise = new Promise<string>((_, reject) => {
          setTimeout(() => reject(new Error('CPU detection timeout')), 2000)
        })

        const detectionPromise = new Promise<string>((resolve) => {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl2')
          const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info')
          const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
          
          // Add a small delay to ensure WebGL context is properly initialized
          setTimeout(() => {
            resolve(renderer.includes('Apple') ? 'Apple Silicon' : 'Intel')
          }, 100)
        })

        const result = await Promise.race([detectionPromise, timeoutPromise])
        setCpuType(result)
      } catch (error) {
        console.log('CPU detection failed:', error)
        setCpuType('Apple Silicon')
      }
    }

    detectCPU()

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white dark:invert dark:contrast-150">
      {/* Left Section */}
      <div className="relative flex w-full h-screen md:h-auto md:w-1/2 flex-col items-center justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="flex tracking-tighter items-center gap-[3px] text-3xl font-editorial w-full justify-center font-medium">
          <span>❯</span>
          <span>Interpreter</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className={`tracking-tighter max-w-md flex flex-col items-center text-center transition-opacity duration-300 ${cpuType ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="mb-4 text-5xl font-editorial font-normal">
            Interpreter Actions
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Securely modify files on your Mac.
            </p>

            <div className="space-y-2 w-full flex flex-col items-center">
              {/* Original sign-in code (commented out)
              <Button variant="outline" className="w-full justify-center">
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              <Input
                type="email"
                placeholder="Enter your personal or work email"
                className="w-full"
              />
              <Button className="w-full bg-foreground hover:bg-foreground/80 text-white">
                Continue with email
              </Button>
              */}

              {/* New download buttons */}
              <div className="space-y-2">
                <Button variant="outline" className="px-6 justify-center py-6 bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-white">
                  <FontAwesomeIcon icon={faApple} className="scale-90 -translate-y-[0.5px]" />
                  Download for {cpuType || 'Mac'}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground mt-2">
                  <a href="#" className="underline">
                    Download for {cpuType === 'Apple Silicon' ? 'Intel Mac' : 'Apple Silicon'}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learn more button */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Button
            variant="outline"
            className="h-7 px-3 py-1 rounded-lg text-sm font-medium border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
          >
            Learn more
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="relative flex w-full h-screen md:h-auto md:w-1/2 items-center justify-center transition-colors duration-500 ease-in-out"
        style={{ backgroundColor: useCases[currentSlide].color }}
      >
        <h2 className="text-4xl font-bold text-white">{useCases[currentSlide].name}</h2>

        {/* Use Case Boxes */}
        <div className="absolute bottom-8 left-4 right-4 flex flex-wrap justify-center gap-2">
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                currentSlide === index
                  ? 'bg-white text-foreground'
                  : 'bg-white/20 text-white hover:bg-white hover:text-foreground'
              }`}
            >
              {useCase.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}