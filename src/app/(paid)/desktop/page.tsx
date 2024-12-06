'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const useCases = [
  { name: 'Media', color: '#FF6B6B' },
  { name: 'Freelance', color: '#4ECDC4' },
  { name: 'Academic', color: '#45B7D1' },
  { name: 'Corporate', color: '#5D5D5D' },
  { name: 'Consulting', color: '#6C5CE7' },
]

const features = [
  {
    title: "Create with Interpreter Actions",
    description: "Draft and iterate on websites, graphics, documents, and code alongside your chat with Artifacts.",
    color: "#FF6B6B"
  },
  {
    title: "Bring your knowledge",
    description: "Connect your data and documents to give Claude the context it needs to help you work better.",
    color: "#4ECDC4"
  },
  {
    title: "Share and collaborate with your team",
    description: "Work together seamlessly with shared chat history and collaborative features.",
    color: "#45B7D1"
  }
]

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Basic file operations",
      "Command-line interface",
      "Community support",
      "Open-source"
    ]
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    description: "For power users",
    features: [
      "Everything in Free",
      "Priority support",
      "Advanced security features",
      "Custom automations",
      "Team collaboration"
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integrations",
      "Advanced analytics",
      "SLA guarantees"
    ]
  }
]

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cpuType, setCpuType] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [showHeader, setShowHeader] = useState(false)

  // Separate function to check scroll position
  const checkScrollPosition = () => {
    const firstSection = document.querySelector('.min-h-screen')
    if (firstSection) {
      const showHeaderNow = window.scrollY >= (firstSection.clientHeight - 1)
      setShowHeader(showHeaderNow)
    }
  }

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
          const renderer = gl && debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
          
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

    // Check scroll position immediately
    checkScrollPosition()

    // Add scroll listener
    window.addEventListener('scroll', checkScrollPosition)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  return (
    <>
      {/* Fixed Header */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex tracking-tighter items-center gap-[3px] text-xl font-editorial font-medium">
            <span>❯</span>
            <span>Interpreter</span>
          </div>
          <Button 
            variant="outline" 
            className="px-6 justify-center py-4 bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-white"
            onClick={() => window.location.href = cpuType === 'Apple Silicon' 
              ? 'https://cdn.crabnebula.app/download/open-interpreter/interpreter/latest/platform/dmg-aarch64'
              : 'https://cdn.crabnebula.app/download/open-interpreter/interpreter/latest/platform/dmg-x86_64'
            }
          >
            <FontAwesomeIcon icon={faApple} className="scale-90 -translate-y-[0.5px] -translate-x-[2px]" />
            Download
          </Button>
        </div>
      </div>

      {/* Main section */}
      <div className="flex min-h-screen flex-col md:flex-row bg-white shadow-sm #dark:invert #dark:contrast-150 mb-32">
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
                <div className="space-y-2 flex flex-col items-center">
                  <Button 
                    variant="outline" 
                    className="px-6 justify-center py-6 bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-white"
                    onClick={() => window.location.href = cpuType === 'Apple Silicon' 
                      ? 'https://cdn.crabnebula.app/download/open-interpreter/interpreter/latest/platform/dmg-aarch64'
                      : 'https://cdn.crabnebula.app/download/open-interpreter/interpreter/latest/platform/dmg-x86_64'
                    }
                  >
                    <FontAwesomeIcon icon={faApple} className="scale-90 -translate-y-[0.5px] -translate-x-[2px]" />
                    Download for {cpuType || 'Mac'}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-2 #border-b #border-neutral-300 #w-fit">
                    <a 
                      href={cpuType === 'Apple Silicon' 
                        ? 'https://cdn.crabnebula.app/download/open-interpreter/interpreter/latest/platform/dmg-x86_64'
                        : 'https://cdn.crabnebula.app/download/open-interpreter/interpreter/latest/platform/dmg-aarch64'
                      }
                    >
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
              onClick={() => {
                const firstSection = document.querySelector('.min-h-screen')
                if (firstSection) {
                  window.scrollTo({
                    top: firstSection.clientHeight,
                    behavior: 'smooth'
                  })
                  // Increase timeout to match scroll animation duration
                  setTimeout(checkScrollPosition, 500)
                }
              }}
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

      {/* New Features Section */}
      <section className="flex flex-col items-center mb-32">
        <h2 className="text-5xl font-editorial font-normal mb-8">
          A new way to work
        </h2>
        <div className="container mx-auto flex gap-12 p-12">
          <div className="w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full aspect-video rounded-lg"
                style={{ backgroundColor: features[selectedFeature].color }}
              />
            </AnimatePresence>
          </div>
          
          <div className="w-1/2 flex items-center">
            <motion.div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  layout
                  transition={{ duration: 0.2 }}
                  className={`cursor-pointer transition-colors ${
                    selectedFeature === index ? 'text-black' : 'text-neutral-400'
                  }`}
                  onClick={() => setSelectedFeature(index)}
                >
                  <motion.h3 layout="position" className="text-xl font-medium">
                    {feature.title}
                  </motion.h3>
                  {selectedFeature === index && (
                    <motion.p
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 mt-2"
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="bg-white mb-32">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-editorial font-normal text-center mb-16">
            Pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 ${
                  plan.highlighted
                    ? 'border-2 border-neutral-900 shadow-lg'
                    : 'border border-neutral-200'
                }`}
              >
                <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-neutral-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-neutral-600 mb-6">{plan.description}</p>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? 'bg-neutral-900 hover:bg-neutral-800'
                      : ''
                  }`}
                >
                  Get started
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="mb-4 flex tracking-tighter items-center gap-[3px] text-xl font-editorial font-medium text-neutral-400">
                <span>❯</span>
                <span>Interpreter</span>
              </div>
              <p className="text-neutral-400">
                A new computer company.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 text-neutral-400 text-sm">
            <p>© {new Date().getFullYear()} Open Interpreter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}