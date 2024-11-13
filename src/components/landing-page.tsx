'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const useCases = [
  { name: 'Media', color: '#FF6B6B' },
  { name: 'Freelance', color: '#4ECDC4' },
  { name: 'Academic', color: '#45B7D1' },
  { name: 'Corporate', color: '#5D5D5D' },
  { name: 'Consulting', color: '#6C5CE7' },
]

export function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % useCases.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex w-1/2 flex-col items-center justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-[3px] text-3xl font-serif w-full justify-center text-black">
          <span>❯</span>
          <span>Interpreter</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-md flex flex-col items-center text-center">
            <h1 className="mb-4 text-5xl font-serif">
              A new way to use
              <br />
              your computer
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Get more done, faster.
            </p>

            <div className="space-y-4 w-full">
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
              <Button className="w-full bg-[#0000FF] hover:bg-[#0000DD] text-white">
                Continue with email
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to Open Interpreter's{' '}<a href="#" className="underline">Consumer Terms</a>{' '}and{' '}<a href="#" className="underline">Usage Policy</a>, and acknowledge their{' '}<a href="#" className="underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Learn more button (positioned absolutely) */}
        <div className="absolute bottom-8 left-1/4 -translate-x-1/2">
          <Button
            variant="outline"
            className="px-3 py-1 rounded-lg text-sm font-medium bg-white/20 text-white hover:bg-white hover:text-[#0000FF] transition-colors duration-300"
          >
            Learn more
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="relative flex w-1/2 items-center justify-center transition-colors duration-500 ease-in-out"
        style={{ backgroundColor: useCases[currentSlide].color }}
      >
        <h2 className="text-4xl font-bold text-white">{useCases[currentSlide].name}</h2>

        {/* Use Case Boxes */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                currentSlide === index
                  ? 'bg-white text-[#0000FF]'
                  : 'bg-white/20 text-white hover:bg-white hover:text-[#0000FF]'
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