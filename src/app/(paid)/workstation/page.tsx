'use client'

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion'

const DOWNLOAD_URLS = {
  appleSilicon: 'https://neyguovvcjxfzhqpkicj.supabase.co/storage/v1/object/public/workstationupdater/releases/Interpreter%20Workstation-arm64-0.1.0.dmg',
  intel: 'https://neyguovvcjxfzhqpkicj.supabase.co/storage/v1/object/public/workstationupdater/releases/Interpreter%20Workstation-x64-0.1.0.dmg'
}


function BackgroundGrid() {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [cellSize, setCellSize] = useState<{ w: number; h: number }>({ w: 160, h: 34 })
  const [gridDims, setGridDims] = useState<{ cols: number; rows: number }>({ cols: 0, rows: 0 })
  type Range = { c0: number; r0: number; c1: number; r1: number; alpha: number; fading: boolean }
  const [ranges, setRanges] = useState<Range[]>([])
  const dragStateRef = useRef<{
    dragging: boolean
    anchor: { c: number; r: number } | null
    activeIndex: number | null
    addMode: boolean
  }>({ dragging: false, anchor: null, activeIndex: null, addMode: false })
  const rangesRef = useRef(ranges)
  useEffect(() => { rangesRef.current = ranges }, [ranges])

  const unionRange = (A: { c0: number; r0: number; c1: number; r1: number }, B: { c0: number; r0: number; c1: number; r1: number }) => ({
    c0: Math.min(A.c0, B.c0),
    r0: Math.min(A.r0, B.r0),
    c1: Math.max(A.c1, B.c1),
    r1: Math.max(A.r1, B.r1),
  })

  const areAdjacentOrOverlap = (A: { c0: number; r0: number; c1: number; r1: number }, B: { c0: number; r0: number; c1: number; r1: number }) => {
    // Consider touching edges or overlapping as adjacent (no gap)
    const horizontallyClose = !(B.c0 > A.c1 + 1 || B.c1 < A.c0 - 1)
    const verticallyClose = !(B.r0 > A.r1 + 1 || B.r1 < A.r0 - 1)
    // Require at least one axis to be touching/overlapping (<= 1 cell gap) and not far on both
    return horizontallyClose && verticallyClose
  }

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const getVars = () => {
      const host = grid.closest('.workstation-left-grid') as HTMLElement | null
      const cs = host ? getComputedStyle(host) : getComputedStyle(document.documentElement)
      const w = parseFloat(cs.getPropertyValue('--cell-w')) || 160
      const h = parseFloat(cs.getPropertyValue('--cell-h')) || 34
      return { w, h }
    }

    const applyDatasets = (cols: number) => {
      const cells = grid.querySelectorAll('.ws-cell')
      for (let k = 0; k < cells.length; k++) {
        const el = cells[k] as HTMLElement
        const r = Math.floor(k / cols)
        const c = k % cols
        el.dataset.row = String(r)
        el.dataset.col = String(c)
      }
    }

    const rebuild = () => {
      const { w, h } = getVars()
      setCellSize({ w, h })
      const parent = grid.parentElement as HTMLElement | null
      if (!parent) return
      const box = parent.getBoundingClientRect()
      const cols = Math.ceil(box.width / w) + 2
      const rows = Math.ceil(box.height / h) + 2

      grid.style.gridTemplateColumns = `repeat(${cols}, ${w}px)`
      ;(grid.style as CSSStyleDeclaration).gridAutoRows = `${h}px`

      const need = cols * rows
      const have = grid.querySelectorAll('.ws-cell').length
      if (have < need) {
        const frag = document.createDocumentFragment()
        for (let i = have; i < need; i++) {
          const d = document.createElement('div')
          d.className = 'ws-cell'
          ;(d as HTMLElement).tabIndex = -1
          frag.appendChild(d)
        }
        grid.appendChild(frag)
      } else if (have > need) {
        for (let i = have - 1; i >= need; i--) grid.removeChild(grid.querySelectorAll('.ws-cell')[i] as ChildNode)
      }

      applyDatasets(cols)
      setGridDims({ cols, rows })
    }

    const parent = grid.parentElement as Element | null
    const ro = new ResizeObserver(rebuild)
    if (parent) ro.observe(parent)

    rebuild()

    const onOrient = () => rebuild()
    window.addEventListener('orientationchange', onOrient)

    // Selection interactions
    const getCellFromPoint = (x: number, y: number): { c: number; r: number } | null => {
      const el = document.elementFromPoint(x, y)
      // If we are over content, still allow selection by checking underlying grid position
      const cell = el && ((el as HTMLElement).closest('.ws-cell') as HTMLElement | null)
      if (!cell) return null
      const c = parseInt(cell.dataset.col || '-1', 10)
      const r = parseInt(cell.dataset.row || '-1', 10)
      if (c < 0 || r < 0) return null
      return { c, r }
    }

    const normalizeRange = (a: { c: number; r: number }, b: { c: number; r: number }) => {
      const c0 = Math.min(a.c, b.c)
      const r0 = Math.min(a.r, b.r)
      const c1 = Math.max(a.c, b.c)
      const r1 = Math.max(a.r, b.r)
      return { c0, r0, c1, r1 }
    }

    const mergeIfOverlap = (list: Array<{ c0: number; r0: number; c1: number; r1: number }>) => {
      // Simple O(n^2) merge for overlapping rectangles
      let merged = [...list]
      let changed = true
      while (changed) {
        changed = false
        outer: for (let i = 0; i < merged.length; i++) {
          for (let j = i + 1; j < merged.length; j++) {
            const A = merged[i]
            const B = merged[j]
            const overlap = !(B.c0 > A.c1 || B.c1 < A.c0 || B.r0 > A.r1 || B.r1 < A.r0)
            if (overlap) {
              const C = {
                c0: Math.min(A.c0, B.c0),
                r0: Math.min(A.r0, B.r0),
                c1: Math.max(A.c1, B.c1),
                r1: Math.max(A.r1, B.r1),
              }
              merged.splice(j, 1)
              merged[i] = C
              changed = true
              break outer
            }
          }
        }
      }
      return merged
    }

    const onMouseDown = (e: MouseEvent) => {
      const addMode = (e.shiftKey || e.metaKey || e.ctrlKey)
      const pt = getCellFromPoint(e.clientX, e.clientY)
      if (!pt) {
        if (!addMode) {
          // Start fading existing selections instead of instant clear
          setRanges(prev => prev.map(r => ({ ...r, fading: true, alpha: r.alpha ?? 1 } as Range)))
        }
        dragStateRef.current = { dragging: false, anchor: null, activeIndex: null, addMode }
        return
      }
      const anchor = pt
      let nextRanges = addMode ? [...rangesRef.current] : []
      const activeIndex = nextRanges.length
      nextRanges.push({ c0: anchor.c, r0: anchor.r, c1: anchor.c, r1: anchor.r, alpha: 1, fading: false })
      setRanges(nextRanges)
      dragStateRef.current = { dragging: true, anchor, activeIndex, addMode }
      e.preventDefault()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragStateRef.current.dragging || dragStateRef.current.anchor == null) return
      const hostEl = grid.closest('.workstation-left-grid') as HTMLElement | null
      if (hostEl && !hostEl.classList.contains('ws-dragging')) hostEl.classList.add('ws-dragging')
      const pt = getCellFromPoint(e.clientX, e.clientY)
      if (!pt) return
      const idx = dragStateRef.current.activeIndex
      if (idx == null) return
      let rect = normalizeRange(dragStateRef.current.anchor, pt)
      setRanges(prev => {
        let copy = [...prev]
        // Bring active box to full opacity
        if (copy[idx]) copy[idx] = { ...rect, alpha: 1, fading: false }

        // Resurrect and merge any adjacent/overlapping fading ranges into the active one
        for (let j = copy.length - 1; j >= 0; j--) {
          if (j === idx) continue
          const R = copy[j]
          const bareR = { c0: R.c0, r0: R.r0, c1: R.c1, r1: R.r1 }
          if (areAdjacentOrOverlap(bareR, rect)) {
            rect = unionRange(rect, bareR)
            // merge into active
            copy[idx] = { ...rect, alpha: 1, fading: false }
            copy.splice(j, 1)
            // Adjust active index if needed
            if (j < idx) {
              // Active index shifts left by 1
              dragStateRef.current.activeIndex = dragStateRef.current.activeIndex! - 1
            }
          }
        }
        return copy
      })
      e.preventDefault()
    }

    const onMouseUp = () => {
      if (!dragStateRef.current.dragging) return
      dragStateRef.current.dragging = false
      const hostEl = grid.closest('.workstation-left-grid') as HTMLElement | null
      if (hostEl) hostEl.classList.remove('ws-dragging')
      setRanges(prev => mergeIfOverlap(prev).map(r => ({ ...r, fading: true, alpha: (r as Range).alpha ?? 1 } as Range)))
    }

    const onDocMouseDown = (e: MouseEvent) => {
      const host = grid.closest('.workstation-left-grid')
      if (!host) return
      if (!host.contains(e.target as Node)) {
        // Begin fade-out when clicking outside
        setRanges(prev => prev.map(r => ({ ...r, fading: true, alpha: (r as Range).alpha ?? 1 } as Range)))
      }
    }

    const hostEl = grid.closest('.workstation-left-grid') as HTMLElement | null
    grid.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousedown', onDocMouseDown)
    if (hostEl) hostEl.classList.remove('ws-dragging')

    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', onOrient)
      grid.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousedown', onDocMouseDown)
    }
  }, [ranges])

  // Fade-out loop
  useEffect(() => {
    let rafId: number
    let last = performance.now()
    const fadePerSecond = 0.3 // seconds to fade ~3.3s from 1 to 0
    const tick = (t: number) => {
      const dt = Math.max(0, (t - last) / 1000)
      last = t
      const current = rangesRef.current
      if (current.length > 0) {
        let changed = false
        const next = current
          .map(r => {
            if (!r.fading) return r
            const alpha = Math.max(0, r.alpha - dt * fadePerSecond)
            if (alpha !== r.alpha) changed = true
            return { ...r, alpha }
          })
          .filter(r => r.alpha > 0)
        if (changed) setRanges(next)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const boxes = ranges.map((r, i) => {
    const left = r.c0 * cellSize.w
    const top = r.r0 * cellSize.h
    const width = (r.c1 - r.c0 + 1) * cellSize.w
    const height = (r.r1 - r.r0 + 1) * cellSize.h
    return (
      <div key={i} className="ws-selection-box" style={{ left, top, width, height, opacity: r.alpha }} />
    )
  })

  return (
    <div className="ws-bg-grid-wrap" aria-hidden="true">
      <div className="ws-grid-3d">
        <div ref={gridRef} className="ws-grid">
          <div className="ws-selection-layer">
            {boxes}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [cpuType, setCpuType] = useState<string | null>(null)
  const [showHeader, setShowHeader] = useState(false)

  // Separate function to check scroll position
  const checkScrollPosition = () => {
    const firstSection = document.querySelector('.min-h-screen')
    if (firstSection) {
      const showHeaderNow = window.scrollY >= (firstSection.clientHeight - 1)
      setShowHeader(showHeaderNow)
    }
  }


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
  }, [])

  return (
    <>
      {/* Fixed Header */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-end">
          <button 
            className="pl-3 pr-4 py-2 rounded-none gap-1 bg-transparent text-neutral-600 border border-neutral-300 hover:bg-neutral-100 duration-0 text-sm inline-flex items-center"
            onClick={() => window.location.href = cpuType === 'Apple Silicon' 
              ? DOWNLOAD_URLS.appleSilicon
              : DOWNLOAD_URLS.intel
            }
          >
            <FontAwesomeIcon icon={faApple} />
            <span className="font-medium tracking-tight ml-1">Free Download</span>
          </button>
        </div>
      </div>

      {/* Main section */}
      <div className="min-h-screen bg-white shadow-sm #dark:invert #dark:contrast-150">
        {/* Full width background with centered content */}
        <div className="relative flex w-full h-screen flex-col items-center justify-center p-8 lg:p-12 workstation-left-grid">
          <BackgroundGrid />
          <span className="ws-center-glow" aria-hidden="true" />

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center relative z-10 pointer-events-none">
            <div className={`ws-content-block tracking-tighter max-w-md flex flex-col items-center text-center transition-opacity duration-300 text-neutral-600 ${cpuType ? 'opacity-100' : 'opacity-0'} pointer-events-auto`}>
              <motion.button
                type="button"
                aria-label="Download Interpreter Workstation"
                title="Download Interpreter Workstation"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                whileTap={{ y: -1 }}
                onClick={() => {
                  window.location.href = cpuType === 'Apple Silicon'
                    ? DOWNLOAD_URLS.appleSilicon
                    : DOWNLOAD_URLS.intel
                }}
                className="mb-4 cursor-pointer p-0 bg-transparent border-0 focus:outline-none"
              >
                <img src="/icon.png" alt="Interpreter Workstation icon" className="w-32 h-32" />
              </motion.button>
              <h1 className="mb-5 text-4xl">
              <span className="font-light">Interpreter</span> <span className="font-medium">Workstation</span>
              </h1>
              {/* <p className="mb-8 text-xl text-neutral-600">
              The AI document editor.
              </p> */}

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
                <div className="space-y-2 mt-2 flex flex-col items-center">
                  <button 
                    className="pl-4 pr-5 py-3 rounded-none gap-1 bg-transparent border border-neutral-300 text-neutral-600 hover:bg-neutral-100 duration-0 text-sm inline-flex items-center"
                    onClick={() => window.location.href = cpuType === 'Apple Silicon' 
                      ? DOWNLOAD_URLS.appleSilicon
                      : DOWNLOAD_URLS.intel
                    }
                  >
                    <FontAwesomeIcon icon={faApple} />
                    <span className="font-medium tracking-tight ml-1">Free Download</span>
                  </button>
                  
                  <p className="text-center text-xs text-neutral-500 mt-2">
                    Windows version on 9/25.
                    {/* Works on <a 
                      href={DOWNLOAD_URLS.appleSilicon}
                      className="hover:underline"
                    >
                      Apple Silicon
                    </a> or <a
                      href={DOWNLOAD_URLS.intel}
                      className="hover:underline"
                    >
                      Intel Mac
                    </a> */}
                  </p>
                </div>
              </div>
            </div>
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