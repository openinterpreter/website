'use client'

import { useState, useEffect } from 'react'

export default function ScalingContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1)
  const [isDesktop, setIsDesktop] = useState(false)
  const baseWidth = 375

  useEffect(() => {
    const updateSize = () => {
      const desktop = window.matchMedia('(min-width: 768px)').matches
      setIsDesktop(desktop)
      setScale(desktop ? 1 : Math.max(window.innerWidth / baseWidth, 1))
    }

    updateSize()
    setMounted(true)
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Prevent layout shift by hiding content until after hydration
  if (!mounted) {
    return (
      <div style={{ width: baseWidth, opacity: 0 }}>
        <div style={{ padding: '0 20px' }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: `${baseWidth * scale}px` }} className="mx-auto md:mx-0 md:ml-8">
      <div
        style={{
          width: isDesktop ? '750px' : `${baseWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          padding: '0 20px'
        }}
        className="md:scale-100 font-['Times_New_Roman'] text-[#333] leading-[1.6] mt-12"
      >
        {children}
      </div>
    </div>
  )
} 