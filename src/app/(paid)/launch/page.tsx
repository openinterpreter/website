"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ProgressiveBlur } from "@/components/launch/motion-primitives/progressive-blur";
import Header from "@/components/launch/Header";
import Footer from "@/components/launch/Footer";
import DownloadButton from "@/components/launch/DownloadButton";
import { supabase } from "@/lib/supabase";

// PROFESSIONS feature commented out - to restore, uncomment this array,
// PROFESSION_DEMOS, profession-related state, and the profession list UI
// const PROFESSIONS = [
//   "Accounting",
//   "Taxes & Payroll",
//   "Construction",
//   "Real Estate",
//   "Media",
//   "Graphical",
//   "Software",
//   "Medical",
//   "Legal",
//   "Education",
//   "Finance",
//   "Marketing",
// ];

const BASE_DEMOS = [
  { id: "excel", title: "Excel Sheets" },
  { id: "pdf", title: "PDF Forms" },
  { id: "word", title: "Word Documents" },
];

// PROFESSION_DEMOS commented out - see PROFESSIONS comment for restoration instructions
// const PROFESSION_DEMOS: Record<string, Array<{ id: string; title: string }>> = {
//   "Accounting": [
//     { id: "acc-1", title: "Invoice Processing" },
//     { id: "acc-2", title: "Financial Reports" },
//     { id: "acc-3", title: "Tax Prep" },
//   ],
//   "Taxes & Payroll": [
//     { id: "tax-1", title: "W-2 Processing" },
//     { id: "tax-2", title: "Payroll Reports" },
//     { id: "tax-3", title: "Tax Filing" },
//   ],
//   "Construction": [
//     { id: "con-1", title: "Bid Proposals" },
//     { id: "con-2", title: "Project Tracking" },
//     { id: "con-3", title: "Safety Reports" },
//   ],
//   "Real Estate": [
//     { id: "re-1", title: "Property Listings" },
//     { id: "re-2", title: "Contract Review" },
//     { id: "re-3", title: "Market Analysis" },
//   ],
//   "Media": [
//     { id: "med-1", title: "Content Briefs" },
//     { id: "med-2", title: "Analytics Reports" },
//     { id: "med-3", title: "Script Writing" },
//   ],
//   "Graphical": [
//     { id: "gra-1", title: "Design Specs" },
//     { id: "gra-2", title: "Asset Management" },
//     { id: "gra-3", title: "Client Proposals" },
//   ],
//   "Software": [
//     { id: "sof-1", title: "Documentation" },
//     { id: "sof-2", title: "Bug Reports" },
//     { id: "sof-3", title: "Sprint Planning" },
//   ],
// };

const DOWNLOAD_URLS = {
  appleSilicon: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-arm64.dmg',
  intel: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-x64.dmg',
  windows: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-x64.exe',
};

// Section descriptions that fade between each other
// Each description is [line1, line2] — line2 goes on a new line if it fits in 2 lines
const SECTION_DESCRIPTIONS: Record<string, [string, string]> = {
  hero: ['Interpreter lets you work alongside agents that can', 'edit your documents, fill PDF forms, and more.'],
  pdf: ['Reads files on your computer to fill PDF forms instantly.', 'Tax forms, applications, contracts, and more.'],
  excel: ['Pivot tables, charts, formulas, and more.', 'A fully featured, AI-native Excel replacement.'],
  word: ['Tracked changes, formatting, embedded images, and more.', 'A fully featured Word editor with AI built in.'],
};

// Unique titles mapped to which sections show them (prevents flashing when title stays the same)
const TITLE_SECTIONS: Record<string, string[]> = {
  'Get more done, faster': ['hero'],
  'PDF Forms': ['pdf'],
  'Excel Sheets': ['excel'],
  'Word Documents': ['word'],
};

// Consistent spacing between major sections
const SECTION_GAP = "py-24";

const PRICING_TIERS = [
  {
    name: "Free",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    subtitle: "Includes:",
    features: ["Bring your own API keys", "Login with OpenAI or Claude", "All tools and integrations", "Unlimited conversations"],
    cta: "Download",
    highlighted: false,
    recommended: false,
  },
  {
    name: "Paid",
    monthlyPrice: "$20",
    yearlyPrice: "$16",
    subtitle: "Everything in Free, plus:",
    features: ["Interpreter-optimized models", "No API keys needed", "Priority support"],
    cta: "Get Started",
    highlighted: true,
    recommended: true,
  },
  {
    name: "Custom",
    monthlyPrice: "Contact us",
    yearlyPrice: "Contact us",
    subtitle: "Everything in Paid, plus:",
    features: ["Custom model configuration", "Dedicated support", "Volume pricing", "Team management"],
    cta: "Contact Us",
    highlighted: false,
    recommended: false,
  },
];

const Guide_ITEMS = [
  { question: "What is Interpreter?", answer: "Interpreter is a desktop app that lets you work alongside AI agents that can edit documents, fill PDF forms, work with spreadsheets, browse the web, and more." },
  { question: "What file types does it support?", answer: "PDF, Word (DOCX), Excel (XLSX), Markdown, and many more. Interpreter can read, edit, convert, and create documents across all major office formats." },
  { question: "Which AI models can I use?", answer: "On the free plan, you can bring your own API keys for OpenAI, Anthropic, Groq, OpenRouter, or use local models via Ollama. You can also sign in with your OpenAI or Claude account. The paid plan includes Interpreter-optimized models with no setup required." },
  { question: "Is my data private?", answer: "Interpreter runs locally on your computer. Your files stay on your machine and are processed locally. When using AI models, only the relevant context is sent to the model provider you choose." },
  { question: "What platforms does it support?", answer: "Interpreter is available for macOS (Apple Silicon and Intel) and Windows." },
];

export default function Home() {
  // Profession-related state commented out - see PROFESSIONS comment for restoration
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<'hero' | 'demos' | 'third'>('hero');
  const [approachingPricing, setApproachingPricing] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('#about');
  // Scroll indicators commented out - part of profession feature
  // const [canScrollUp, setCanScrollUp] = useState(false);
  // const [canScrollDown, setCanScrollDown] = useState(true);

  // Active section tracking for dynamic headers
  const [activeSectionId, setActiveSectionId] = useState<keyof typeof SECTION_DESCRIPTIONS>('hero');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  const demoSectionRef = useRef<HTMLDivElement>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [emailOverlayPhase, setEmailOverlayPhase] = useState<"closed" | "mounting" | "visible" | "emailExiting" | "thanks" | "exiting">("closed");
  const [emailValue, setEmailValue] = useState("");
  const [emailButtonHidden, setEmailButtonHidden] = useState(false);
  const [enterKeyDown, setEnterKeyDown] = useState(false);
  const emailSubmittedRef = useRef(false);
  const [getUpdates, setGetUpdates] = useState(true);
  const emailSourceRef = useRef<"mobile_link" | "desktop_signup">("desktop_signup");
  const [osType, setOsType] = useState<'windows' | 'mac' | null>(null);
  const [cpuType, setCpuType] = useState<string | null>(null);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);


  const downloadButtonRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [downloadButtonPos, setDownloadButtonPos] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  // Drive overlay animation phases
  useEffect(() => {
    if (emailOverlayPhase === "mounting") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEmailOverlayPhase("visible");
        });
      });
    } else if (emailOverlayPhase === "emailExiting") {
      // After email fades up/out, show thanks
      const timer = setTimeout(() => setEmailOverlayPhase("thanks"), 300);
      return () => clearTimeout(timer);
    } else if (emailOverlayPhase === "closed") {
      emailSubmittedRef.current = false;
    }
  }, [emailOverlayPhase]);

  // Close download menu on click outside
  useEffect(() => {
    if (!downloadMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (downloadButtonRef.current && !downloadButtonRef.current.contains(e.target as Node)) {
        setDownloadMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [downloadMenuOpen]);

  // OS and CPU detection
  useEffect(() => {
    const detect = async () => {
      const ua = navigator.userAgent;
      const isWindows = ua.includes('Windows');
      setOsType(isWindows ? 'windows' : 'mac');
      if (!isWindows) {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl2');
          const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
          const renderer = gl && debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
          setCpuType(renderer.includes('Apple') ? 'Apple Silicon' : 'Intel');
        } catch {
          setCpuType('Apple Silicon');
        }
      }
    };
    detect();
  }, []);

  const getDownloadUrl = () => {
    if (osType === 'windows') return DOWNLOAD_URLS.windows;
    return cpuType === 'Apple Silicon' ? DOWNLOAD_URLS.appleSilicon : DOWNLOAD_URLS.intel;
  };

  const getDownloadLabel = () => {
    return 'Download the Beta';
  };

  const demosContainerRef = useRef<HTMLDivElement>(null);
  const demoVideosRef = useRef<HTMLDivElement>(null);
  // inputRef and listRef commented out - part of profession feature
  // const inputRef = useRef<HTMLInputElement>(null);
  // const listRef = useRef<HTMLDivElement>(null);
  const hasScrolledToBottom = useRef(false);
  const pricingRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Refs for demo cards to track which is centered
  const demoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Detect if hero description can fit the forced line break without going to 3+ lines
  // Detect if each description can fit a forced line break without going to 3+ lines
  const descRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const mobileDescRef = useRef<HTMLParagraphElement>(null);
  const [breakFits, setBreakFits] = useState<Record<string, boolean>>({});
  const [mobileBreakFits, setMobileBreakFits] = useState(true);

  const measureBreaks = useCallback(() => {
    const measure = (el: HTMLParagraphElement | null, parts: [string, string]) => {
      if (!el) return true;
      const clone = el.cloneNode(false) as HTMLParagraphElement;
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.width = getComputedStyle(el).width;
      clone.innerHTML = `${parts[0]}<br/>${parts[1]}`;
      el.parentNode!.appendChild(clone);
      const lineHeight = parseFloat(getComputedStyle(clone).lineHeight);
      const fits = clone.scrollHeight <= lineHeight * 2.5;
      clone.remove();
      return fits;
    };
    const results: Record<string, boolean> = {};
    Object.entries(SECTION_DESCRIPTIONS).forEach(([id, parts]) => {
      results[id] = measure(descRefs.current[id], parts);
    });
    setBreakFits(results);
    setMobileBreakFits(measure(mobileDescRef.current, SECTION_DESCRIPTIONS.hero));
  }, []);

  useEffect(() => {
    measureBreaks();
    window.addEventListener('resize', measureBreaks);
    return () => window.removeEventListener('resize', measureBreaks);
  }, [measureBreaks]);

  // Update URL hash on scroll and track active section for nav highlighting
  // RULE: If the hero/about section (top of page) is visible at all, we're in "about"
  // Otherwise, use center of screen to determine section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const centerY = scrollY + viewportHeight / 2;

      // If the top of the page is still visible (scrollY < viewportHeight), we're in about
      // This means the hero section is still on screen
      if (scrollY < viewportHeight * 0.5) {
        if (window.location.hash !== '#about') {
          history.replaceState(null, "", '#about');
        }
        setActiveHash('#about');
        return;
      }

      // Get section positions
      const faqTop = faqRef.current?.offsetTop ?? Infinity;
      const pricingTop = pricingRef.current?.offsetTop ?? Infinity;

      let newHash = '#demos';

      // Check from bottom to top (most specific first)
      if (centerY >= faqTop) {
        newHash = '#faq';
      } else if (centerY >= pricingTop) {
        newHash = '#pricing';
      }

      // Update hash and state
      if (window.location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
      setActiveHash(newHash);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Profession filtering commented out - see PROFESSIONS comment for restoration
  // const filteredProfessions = PROFESSIONS.filter((p) =>
  //   p.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // useEffect(() => {
  //   if (selectedIndex >= filteredProfessions.length) {
  //     setSelectedIndex(Math.max(0, filteredProfessions.length - 1));
  //   }
  // }, [filteredProfessions.length, selectedIndex]);

  // const activeProfession = filteredProfessions[selectedIndex] || filteredProfessions[0] || "Accounting";

  // Only show BASE_DEMOS now (profession demos disabled)
  const currentDemos = BASE_DEMOS;

  // Profession list scroll state commented out - see PROFESSIONS comment for restoration
  // const updateListScrollState = useCallback(() => {
  //   if (listRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listRef.current;
  //     const maxScroll = scrollHeight - clientHeight;
  //     setCanScrollUp(Math.abs(scrollTop) < maxScroll - 5);
  //     setCanScrollDown(Math.abs(scrollTop) > 5);
  //   }
  // }, []);

  // Track scroll position for section switching and active section for dynamic headers
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const centerY = scrollY + viewportHeight / 2;

      // Track scroll direction
      if (scrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = scrollY;

      // Determine current section based on what's at center of screen
      if (scrollY === 0) {
        setCurrentSection('hero');
      } else if (pricingRef.current) {
        const pricingTop = pricingRef.current.offsetTop;

        // Approaching pricing (100px early) - triggers sidebar text fade
        setApproachingPricing(centerY >= pricingTop - 100);

        // At pricing section - triggers video fade and download button
        if (centerY >= pricingTop) {
          setCurrentSection('third');
        } else if (scrollY > 0) {
          // Otherwise if scrolled at all, we're in demos
          setCurrentSection('demos');
        }
      } else if (scrollY > 0) {
        setCurrentSection('demos');
      }

      // Determine active section ID for dynamic headers
      // If at very top (not scrolled at all), show hero
      if (scrollY === 0) {
        setActiveSectionId('hero');
        return;
      }

      // Past demos (pricing/faq) — keep showing last demo ("word")
      const pricingTop = pricingRef.current?.offsetTop ?? Infinity;
      if (centerY >= pricingTop) {
        setActiveSectionId('word');
        return;
      }

      // Check which demo card is closest to center (as soon as any scroll happens)
      let closestId: keyof typeof SECTION_DESCRIPTIONS = 'excel'; // Default to first demo
      let closestDistance = Infinity;

      Object.entries(demoRefs.current).forEach(([id, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestId = id as keyof typeof SECTION_DESCRIPTIONS;
          }
        }
      });

      setActiveSectionId(closestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Profession-related scroll effects commented out - see PROFESSIONS comment for restoration
  // useEffect(() => {
  //   if (currentSection === 'hero') {
  //     hasScrolledToBottom.current = false;
  //   }
  //   updateListScrollState();
  // }, [currentSection, updateListScrollState]);

  // useEffect(() => {
  //   updateListScrollState();
  // }, [filteredProfessions, updateListScrollState]);

  // useEffect(() => {
  //   if (currentSection === 'demos' && inputRef.current) {
  //     const timer = setTimeout(() => {
  //       inputRef.current?.focus();
  //     }, 50);
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentSection]);

  // useEffect(() => {
  //   const handleScrollFocus = () => {
  //     if (currentSection === 'demos' && inputRef.current && document.activeElement !== inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   };
  //   window.addEventListener('scroll', handleScrollFocus, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScrollFocus);
  // }, [currentSection]);

  // Profession keyboard navigation and handlers commented out - see PROFESSIONS comment for restoration
  // const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
  //   if (e.key === "ArrowUp") {
  //     e.preventDefault();
  //     setSelectedIndex((prev) => Math.min(filteredProfessions.length - 1, prev + 1));
  //     window.scrollTo({ top: 1, behavior: 'smooth' });
  //   } else if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     setSelectedIndex((prev) => Math.max(0, prev - 1));
  //     window.scrollTo({ top: 1, behavior: 'smooth' });
  //   }
  // }, [filteredProfessions.length]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  //   setSelectedIndex(0);
  //   window.scrollTo({ top: 1, behavior: 'smooth' });
  // };

  // const handleProfessionClick = (index: number) => {
  //   setSelectedIndex(index);
  //   window.scrollTo({ top: 1, behavior: 'smooth' });
  //   inputRef.current?.focus();
  // };

  // Video opacity: 1 at top, 0 when scrolled
  const videoOpacity = currentSection === 'hero' ? 1 : 0;
  const isInDemosMode = currentSection !== 'hero';

  return (
    <div className="bg-background text-foreground h-dvh overflow-hidden lg:h-auto lg:overflow-visible">
      {/* Anchor for About - at very top */}
      <div id="about" className="absolute top-0" />

      {/* Main Demos Container - This IS the page content */}
      <div ref={demosContainerRef} className="relative">
        {/* Blur behind header - fades in at pricing section (desktop only) */}
        <div
          className="hidden lg:block fixed inset-x-0 top-0 h-24 lg:h-28 z-30 pointer-events-none transition-opacity duration-500"
          style={{ opacity: currentSection === 'third' ? 1 : 0 }}
        >
          <ProgressiveBlur
            className="absolute inset-0"
            direction="top"
            blurIntensity={1}
            blurLayers={8}
          />
        </div>

        {/* Download button - top right, fades in at pricing section (desktop only) */}
        <div
          className="hidden lg:block fixed z-40 top-4 lg:top-6 xl:top-8 transition-opacity duration-500"
          style={{
            right: 'var(--edge-spacing)',
            opacity: currentSection === 'third' ? 1 : 0,
            pointerEvents: currentSection === 'third' ? 'auto' : 'none',
          }}
        >
          <DownloadButton />
        </div>

        {/* Left Sidebar - always fixed, pointer-events-none on container so it doesn't eat clicks */}
        <div
          className="hidden lg:block fixed w-[40%] h-screen z-30 left-0 top-0 pointer-events-none transition-colors duration-500"
          style={{ color: currentSection === 'hero' ? '#ffffff' : 'var(--foreground)' }}
        >
          <div
            className="h-full flex flex-col p-4 lg:p-6 xl:p-8"
            style={{ paddingLeft: 'var(--edge-spacing)' }}
          >
            <Header
              currentSection={currentSection}
              activeHash={activeHash}
              className="pointer-events-auto"
              forceWhite={currentSection === 'hero'}
            />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Content wrapper - fades when approaching pricing */}
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: approachingPricing ? 0 : 1,
                pointerEvents: approachingPricing ? 'none' : 'auto',
              }}
            >
            {/* Title - fades only when title text changes */}
            <div className="relative mb-6">
              {Object.entries(TITLE_SECTIONS).map(([title, sections]) => (
                <h1
                  key={title}
                  className={`text-4xl lg:text-5xl font-medium tracking-tight transition-opacity duration-300 ease-out whitespace-nowrap ${sections.includes(activeSectionId) ? '' : 'absolute top-0 left-0'}`}
                  style={{
                    opacity: sections.includes(activeSectionId) ? 1 : 0,
                    pointerEvents: sections.includes(activeSectionId) ? 'auto' : 'none',
                  }}
                >
                  {title}
                </h1>
              ))}
            </div>

            {/* Description - fades between sections */}
            <div className="relative mb-8">
              {Object.entries(SECTION_DESCRIPTIONS).map(([id, parts]) => (
                <p
                  key={id}
                  ref={(el) => { descRefs.current[id] = el; }}
                  className={`text-lg transition-opacity duration-300 ease-out ${activeSectionId === id ? '' : 'absolute top-0 left-0'}`}
                  style={{
                    opacity: activeSectionId === id ? 1 : 0,
                    pointerEvents: activeSectionId === id ? 'auto' : 'none',
                  }}
                >
                  {parts[0]}{breakFits[id] ? <br /> : ' '}{parts[1]}
                </p>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-8 pointer-events-auto w-fit">
                <div ref={downloadButtonRef}>
                  <DownloadButton showLabel dropdownDirection="up" size="md" />
                </div>
                <button
                  onClick={() => {
                    if (downloadButtonRef.current) {
                      const rect = downloadButtonRef.current.getBoundingClientRect();
                      setDownloadButtonPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
                    }
                    emailSourceRef.current = "desktop_signup";
                    setEmailValue("");
                    setEmailOverlayPhase("mounting");
                  }}
                  className={`text-sm font-medium transition-all ${emailButtonHidden ? "opacity-40" : "hover:opacity-60"}`}
                >
                  Get Email Updates
                </button>
            </div>

            {/* Bottom padding */}
            <div className="h-4" />
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator - must be outside transformed containers */}
        <button
          onClick={() => window.scrollTo({ top: 1, behavior: 'smooth' })}
          className={`hidden lg:flex fixed z-20 bottom-12 xl:bottom-14 w-10 h-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-80 transition-all duration-500 ${
            isInDemosMode ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
          style={{ right: 'var(--edge-spacing)' }}
          aria-label="Scroll down"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Full Screen Hero Image - fades out on scroll to reveal demos underneath */}
        <div
          className="fixed inset-0 z-10 pointer-events-none transition-all duration-500 ease-out"
          style={{ opacity: videoOpacity }}
        >
          <img
            src="/hero.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
          {/* Phone: darken from bottom */}
          <div
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background: `
                linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, transparent 75%),
                radial-gradient(ellipse 60% 50% at 0% 0%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 35%, transparent 70%)
              `,
            }}
          />
          {/* Tablet + Desktop: darken from bottom-left */}
          <div
            className="pointer-events-none absolute inset-0 hidden sm:block"
            style={{
              background: `
                radial-gradient(ellipse 90% 80% at 0% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 55%, transparent 80%),
                radial-gradient(ellipse 60% 50% at 0% 0%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 35%, transparent 70%)
              `,
            }}
          />
        </div>

        {/* Mobile - fixed single-screen view, no scrolling, no nav */}
        <div
          className="lg:hidden fixed inset-0 z-20 flex flex-col p-4 text-white"
          style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}
        >
          {/* Logo only - no nav links */}
          <a href="/launch" className="flex flex-col gap-3">
            <div className="w-[29px] h-[29px] bg-white rounded-full" />
            <div className="w-[29px] h-[82px] bg-white rounded-full" />
          </a>

          <div className="flex-1" />

          {/* Title + description + single CTA */}
          <div>
            <h1 className="text-4xl font-medium tracking-tight mb-4">Get more done, faster</h1>
            <p ref={mobileDescRef} className="text-lg mb-8">
              Interpreter lets you work alongside agents that can{mobileBreakFits ? <br /> : ' '}edit your documents, fill PDF forms, and more.
            </p>
            <div className="flex items-center gap-8">
              <button
                onClick={() => {
                  emailSourceRef.current = "mobile_link";
                  setGetUpdates(true);
                  setEmailValue("");
                  setEmailOverlayPhase("mounting");
                }}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-black squircle text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Email yourself a link
              </button>
              {/* <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:opacity-60 transition-colors"
              >
                Watch video on X &#8599;
              </a> */}
            </div>
            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={getUpdates}
                onChange={(e) => setGetUpdates(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-muted-foreground">Get updates</span>
            </label>
          </div>
          <div className="h-4" />
        </div>

        {/* Demo Videos */}
        <div id="demos" className="absolute" style={{ top: 1 }} />
        <section
          ref={demoSectionRef}
          className="transition-all duration-500 ease-out"
          style={{ opacity: isInDemosMode ? 1 : 0 }}
        >
          {/* Videos on the right side - fade out at pricing */}
          <div
            ref={demoVideosRef}
            className="lg:ml-[40%] pt-[100vh] lg:pt-[480px] transition-opacity duration-500"
            style={{ opacity: currentSection === 'third' ? 0 : 1 }}
          >
            {currentDemos.map((demo) => (
              <div
                key={demo.id}
                ref={(el) => { demoRefs.current[demo.id] = el; }}
                className="min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center py-12 lg:py-16"
                style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}
              >
                <div className="w-full aspect-[4/3] bg-secondary overflow-hidden" style={{ borderRadius: '16px', cornerShape: 'squircle' } as React.CSSProperties}>
                  <img
                    src={`/preview-${demo.id}.png`}
                    alt={demo.title}
                    className="w-full h-full object-cover contrast-[1.1]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pricing & FAQ */}
          <section
            ref={pricingRef}
            id="pricing"
            className="max-w-4xl mx-auto px-4 pb-10 lg:pb-12 xl:pb-14"
          >
            {/* Pricing Section */}
            <div className={SECTION_GAP}>
              {/* Centered Title */}
              <h2 className="text-4xl lg:text-5xl font-medium text-foreground text-center mb-8">Pricing</h2>

              {/* Monthly/Yearly Toggle */}
              <div className="flex justify-center mb-16">
                <div className="inline-flex items-center bg-secondary squircle p-1">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-5 py-2 text-sm font-medium squircle transition-all ${
                      billingPeriod === "monthly"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`px-5 py-2 text-sm font-medium squircle transition-all ${
                      billingPeriod === "yearly"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              {/* Pricing Cards - 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRICING_TIERS.map((tier) => {
                  const price = billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
                  return (
                    <div
                      key={tier.name}
                      className="bg-secondary squircle p-6 flex flex-col min-h-[360px]"
                    >
                      <h3 className="text-lg font-medium text-foreground mb-1">{tier.name}</h3>
                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-2xl font-medium text-foreground">{price}</span>
                        {price.startsWith("$") && (
                          <span className="text-sm text-muted-foreground">/mo.</span>
                        )}
                      </div>
                      {/* Subtitle */}
                      <p className="text-sm text-muted-foreground mb-4">{tier.subtitle}</p>
                      {/* Features with checkmarks */}
                      <ul className="space-y-2 mb-8 flex-1">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <svg className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {/* CTA Button */}
                      <button className={`w-fit px-6 py-3 squircle text-sm font-medium transition-opacity hover:opacity-80 ${
                        tier.highlighted
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}>
                        {tier.cta}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guide */}
            <div ref={faqRef} id="faq" className={SECTION_GAP}>
              <h2 className="text-4xl lg:text-5xl font-medium text-foreground text-center mb-12">FAQ</h2>
              <div className="bg-secondary squircle divide-y divide-border overflow-hidden">
                {Guide_ITEMS.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                    >
                      <span className="text-sm font-medium text-foreground">{item.question}</span>
                      <span className="shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground">
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${expandedFaq === index ? "rotate-45" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-200"
                      style={{
                        maxHeight: expandedFaq === index ? '200px' : '0',
                        opacity: expandedFaq === index ? 1 : 0,
                      }}
                    >
                      <div className="px-6 pb-5 text-sm text-muted-foreground whitespace-pre-line">{item.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <Footer className="mt-20" />
          </section>
      </section>
      </div>

      {/* Email Overlay */}
      {emailOverlayPhase !== "closed" && (
        <div
          className="fixed inset-0 z-50"
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
          }}
        >
          {/* Backdrop - blur layer fades in/out via opacity */}
          <div
            className="absolute inset-0 backdrop-blur-[40px] transition-opacity duration-500 ease-out"
            style={{
              opacity: emailOverlayPhase !== "mounting" && emailOverlayPhase !== "exiting" ? 1 : 0,
            }}
            onClick={() => {
              if (emailOverlayPhase === "visible") {
                setEmailOverlayPhase("exiting");
              }
            }}
            onTransitionEnd={(e) => {
              if (emailOverlayPhase === "exiting" && e.propertyName === "opacity") {
                setEmailOverlayPhase("closed");
              }
            }}
          />
          {/* Darken/lighten layer */}
          <div
            className="absolute inset-0 bg-background transition-opacity duration-500 ease-out pointer-events-none"
            style={{
              opacity: emailOverlayPhase !== "mounting" && emailOverlayPhase !== "exiting" ? 0.7 : 0,
            }}
          />

          {/* X Close Button - positioned exactly where logo circle is */}
          <button
            onClick={() => {
              if (emailOverlayPhase === "visible") {
                setEmailOverlayPhase("exiting");
              }
            }}
            className="fixed z-50 w-[29px] h-[29px] rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-all duration-500 ease-out top-4 lg:top-6 xl:top-8"
            style={{
              left: 'var(--edge-spacing)',
              opacity: emailOverlayPhase !== "mounting" && emailOverlayPhase !== "exiting" ? 1 : 0,
            }}
            aria-label="Close"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Email input */}
          <div
            className="absolute z-10"
            style={{
              ...(downloadButtonPos
                ? { top: downloadButtonPos.top, left: downloadButtonPos.left }
                : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }),
            }}
          >
            {/* Email form - visible during mounting/visible, fades up and out on submit */}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: emailOverlayPhase === "mounting" || emailOverlayPhase === "emailExiting" || emailOverlayPhase === "thanks" || emailOverlayPhase === "exiting" ? 0 : 1,
                transform: enterKeyDown
                  ? 'translateY(4px)'
                  : emailOverlayPhase === "mounting"
                    ? 'translateY(-20px)'
                    : emailOverlayPhase === "emailExiting" || emailOverlayPhase === "thanks" || emailOverlayPhase === "exiting"
                      ? 'translateY(-20px)'
                      : 'translateY(0px)',
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailValue.trim() && !emailSubmittedRef.current) {
                    emailSubmittedRef.current = true;
                    setEmailButtonHidden(true);
                    setEmailOverlayPhase("emailExiting");
                    supabase.from("desktop_waitlist").insert({ email: emailValue.trim(), source: emailSourceRef.current, get_updates: getUpdates }).then(() => {});
                  }
                }}
              >
                <input
                  ref={emailInputRef}
                  autoFocus
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEnterKeyDown(true);
                    if (e.key === "Escape") setEmailOverlayPhase("exiting");
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") setEnterKeyDown(false);
                  }}
                  placeholder="Type your email then press enter..."
                  className="bg-transparent border-none outline-none text-lg lg:text-4xl font-medium placeholder-muted text-foreground w-[80vw] lg:w-[40vw] text-center lg:text-left"
                />
              </form>
            </div>

            {/* Thanks text - fades in from below after email exits */}
            <div
              className="absolute inset-x-0 top-0 transition-all duration-500 ease-out text-center lg:text-left"
              style={{
                opacity: emailOverlayPhase === "thanks" ? 1 : 0,
                transform: emailOverlayPhase === "thanks"
                  ? 'translateY(0px)'
                  : emailOverlayPhase === "exiting"
                    ? 'translateY(-15px)'
                    : 'translateY(15px)',
              }}
              onTransitionEnd={(e) => {
                if (emailOverlayPhase === "thanks" && e.propertyName === "opacity") {
                  setTimeout(() => setEmailOverlayPhase("exiting"), 1200);
                }
              }}
            >
              <p className="text-lg lg:text-4xl font-medium text-muted whitespace-nowrap">
                <span className="lg:hidden">We sent you a link.</span>
                <span className="hidden lg:inline">Thanks, we&apos;ll keep you updated.</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
