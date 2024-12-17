'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const useCases = [
  {
    name: 'Media',
    type: 'video',
    videoUrl: 'https://neyguovvcjxfzhqpkicj.supabase.co/storage/v1/object/public/video/padding.mp4',
    duration: 18000 // 18 seconds
  },
  { 
    name: 'Documents', 
    type: 'image',
    image: '/use-cases/file-conversion.png',
    duration: 5000 // 5 seconds
  },
]

const features = [
  {
    title: "Ask for anything your computer can do",
    description: "Convert files, resize images, summarize documents, and more.",
    color: "#FF6B6B"
  },
  {
    title: "Watch Actions do the work",
    description: "By dynamically writing code to complete tasks, Actions is capable of almost anything.",
    color: "#4ECDC4"
  },
  {
    title: "Always safe and reversible",
    description: "Interpreter Actions runs in a sandbox, and only makes changes to copies of your files.",
    color: "#45B7D1"
  }
]

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "For getting started",
    features: [
      "Basic file operations",
      "5 Actions per day",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$30",
    period: "/month",
    description: "For power users",
    features: [
      "Advanced file operations",
      "20 Actions per day",
      "Priority support",
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations",
    features: [
      "Everything in Pro",
      "Host on your own servers",
      "Dedicated support",
    ]
  }
]

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cpuType, setCpuType] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [showHeader, setShowHeader] = useState(false)
  const [progress, setProgress] = useState(0)

  // Separate function to check scroll position
  const checkScrollPosition = () => {
    const firstSection = document.querySelector('.min-h-screen')
    if (firstSection) {
      const showHeaderNow = window.scrollY >= (firstSection.clientHeight - 1)
      setShowHeader(showHeaderNow)
    }
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const startNextSlide = () => {
      const nextSlide = (currentSlide + 1) % useCases.length;
      setProgress(0);
      setCurrentSlide(nextSlide);
      
      // Schedule the next slide
      timeoutId = setTimeout(() => {
        startNextSlide();
      }, useCases[nextSlide].duration);
    };

    // Start the timer for the current slide
    timeoutId = setTimeout(() => {
      startNextSlide();
    }, useCases[currentSlide].duration);

    // Progress animation
    let animationFrameId: number;
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / useCases[currentSlide].duration, 1);
      setProgress(progress);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };
    
    animationFrameId = requestAnimationFrame(animateProgress);

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [currentSlide]); // Only depend on currentSlide

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

  useEffect(() => {
    detectCPU()

    // Check scroll position immediately
    checkScrollPosition()

    // Add scroll listener
    window.addEventListener('scroll', checkScrollPosition)
    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [currentSlide])

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
      <div className="flex min-h-screen flex-col md:flex-row bg-white shadow-sm #dark:invert #dark:contrast-150">
        {/* Left Section */}
        <div className="relative flex w-full h-screen md:h-auto md:w-1/2 flex-col items-center justify-between p-8 lg:p-12">
          {/* Logo */}
          <div className="flex select-none text-neutral-600 tracking-tighter items-center gap-[0.3px] text-3xl font-editorial w-full justify-center font-medium">
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
            <button
              onClick={() => window.location.href = 'https://github.com/openinterpreter/open-interpreter'}
              className="px-3 py-1 rounded-lg text-sm shadow-sm transition-colors duration-300 bg-white/80 text-black/80 relative overflow-hidden"
            >
              <span className="relative z-10">Created by the Open Interpreter team</span>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="#shadow-2xl #shadow-neutral-900/20 relative flex w-full h-screen md:h-auto md:w-1/2 items-center justify-center">
          <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
            {useCases[currentSlide].type === 'video' ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={useCases[currentSlide].videoUrl}
              />
            ) : (
              <div
                style={{
                  backgroundImage: `url(${useCases[currentSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="w-full h-full"
              />
            )}
          </div>
          
          {/* Use Case Boxes */}
          <div className="absolute bottom-8 left-4 right-4 flex flex-wrap justify-center gap-2 z-10">
            {useCases.map((useCase, index) => (
              <button
                key={index}
                onClick={() => {
                  setProgress(0)
                  setCurrentSlide(index)
                }}
                className={`relative px-3 py-1 rounded-lg text-sm shadow-sm transition duration-300 overflow-hidden ${
                  currentSlide === index
                    ? 'bg-white/80 text-black shadow-md'
                    : 'bg-white/50 text-black/50 hover:bg-white/70 hover:text-black/70'
                }`}
              >
                {currentSlide === index && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-black/5"
                    style={{ 
                      width: `${progress * 100}%`,
                      zIndex: 20
                    }}
                  />
                )}
                <span className="relative z-10">{useCase.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      
      {/* New Features Section */}
      {/* <section className="flex flex-col items-center mb-32">
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
      </section> */}

      {/* Pricing section */}
      {/* <section className="bg-white mb-32">
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
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-neutral-900 text-white py-16">
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
      </footer> */}
    </>
  )
}