"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ProgressiveBlur } from "@/components/launch/motion-primitives/progressive-blur";
import Header from "@/components/launch/Header";
import Footer from "@/components/launch/Footer";
import DownloadButton, { useDeviceType, DOWNLOAD_URLS } from "@/components/launch/DownloadButton";
import ScrollToFeaturesButton from "@/components/launch/ScrollToFeaturesButton";
import Logo from "@/components/launch/Logo";

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

const DEMO_VIDEO_SRC: Record<string, string> = {
  excel: "/videos/demos/excel.mp4",
  pdf: "/videos/demos/pdf.mp4",
  word: "/videos/demos/word.mp4",
};

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


// Section descriptions that fade between each other
// Each description is [line1, line2] — line2 goes on a new line if it fits in 2 lines
const SECTION_DESCRIPTIONS: Record<string, [string, string]> = {
  hero: ['Interpreter lets you work alongside agents that can', 'edit your documents, fill PDF forms, and more.'],
  pdf: ['Fill PDF forms instantly with Interpreter.', 'Works with interactive forms and non-interactive forms using annotations.'],
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
    features: ["Login with OpenAI", "Bring your own API keys", "Run offline with Ollama"],
    cta: "Download",
    highlighted: false,
    recommended: false,
  },
  {
    name: "Paid",
    monthlyPrice: "$20",
    yearlyPrice: "$16",
    subtitle: "Everything in Free, plus:",
    features: ["Interpreter-managed models", "No API keys needed", "Priority support"],
    cta: "Download",
    highlighted: true,
    recommended: true,
  },
  {
    name: "Custom",
    monthlyPrice: "Contact us",
    yearlyPrice: "Contact us",
    subtitle: "Everything in Paid, plus:",
    features: ["Compliance", "Dedicated support"],
    cta: "Contact Us",
    highlighted: false,
    recommended: false,
  },
];

const Guide_ITEMS = [
  {
    question: "What is Interpreter?",
    answer: "A desktop agent that can read, edit, and create documents on your computer. It includes full editors for Word, Excel, and PDF. Describe what you need and the agent handles it, or open any document and edit it yourself.",
  },
  {
    question: "What can the agent do?",
    answer: (
      <ul className="space-y-2">
        {[
          "Ask questions across folders of PDFs to surface patterns and evidence",
          "Pull data from documents into Excel with working formulas",
          "Fill PDF forms from other files or images",
          "Turn receipts into formatted expense reports",
          "Turn transcripts into notes, action items, or slide decks",
          "Build dashboards and financial models from business data",
          "Organize files, batch rename, connect to integrations",
        ].map((item, i) => (
          <li key={i} className="flex items-baseline gap-3">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0 translate-y-[-1px]" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    question: "Which AI models can I use?",
    answer: "If you have a ChatGPT account, you can sign in with it and use Interpreter for free. You can also bring your own API keys for OpenAI, Anthropic, Groq, OpenRouter, or run local models through Ollama. The paid plan includes managed models with no setup required.",
  },
  {
    question: "Is my data private?",
    answer: (
      <>
        Local model usage stays on your device.
        {" "}
        If you use your own API key, your data goes directly from your device to that provider, not through our servers.
        {" "}
        If you use hosted models, your requests are routed through our servers and logged for up to 30 days; see our{" "}
        <a href="/launch/privacy" className="underline hover:opacity-80">Privacy Policy</a>.
      </>
    ),
  },
];

export default function Home() {
  // Profession-related state commented out - see PROFESSIONS comment for restoration
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<'hero' | 'demos' | 'third'>('hero');
  const [approachingPricing, setApproachingPricing] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  // Scroll indicators commented out - part of profession feature
  // const [canScrollUp, setCanScrollUp] = useState(false);
  // const [canScrollDown, setCanScrollDown] = useState(true);

  // Active section tracking for dynamic headers
  const [activeSectionId, setActiveSectionId] = useState<keyof typeof SECTION_DESCRIPTIONS>('hero');
  const [, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  const demoSectionRef = useRef<HTMLDivElement>(null);
  const mobileFeaturesRef = useRef<HTMLDivElement>(null);
  const [billingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [emailOverlayPhase, setEmailOverlayPhase] = useState<"closed" | "mounting" | "visible" | "emailExiting" | "thanks" | "exiting">("closed");
  const [emailValue, setEmailValue] = useState("");
  const [emailButtonHidden, setEmailButtonHidden] = useState(false);
  const [enterKeyDown, setEnterKeyDown] = useState(false);
  const emailSubmittedRef = useRef(false);
  const [getUpdates, setGetUpdates] = useState(true);
  const emailSourceRef = useRef<"mobile_link" | "desktop_signup" | "linux_waitlist">("desktop_signup");
  const { deviceType, cpuType } = useDeviceType();
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

  const demosContainerRef = useRef<HTMLDivElement>(null);
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
        // Don't add #home to the URL on initial load — only clear existing hashes
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
        setActiveHash('');
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
  const toggleVideoPlayback = (video: HTMLVideoElement) => {
    if (video.paused) {
      void video.play();
      return;
    }
    video.pause();
  };
  const scrollToFeatures = useCallback((event?: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();

    if (window.innerWidth < 1024) {
      mobileFeaturesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    history.replaceState(null, "", "#features");
    setActiveHash("#features");
  }, []);

  return (
    <div className="bg-background text-foreground lg:h-auto lg:overflow-visible">
      {/* Anchor for About - at very top */}
      <div id="home" className="absolute top-0" />

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
          <DownloadButton
            onLinuxClick={() => {
              emailSourceRef.current = "linux_waitlist";
              setEmailValue("");
              setEmailOverlayPhase("mounting");
            }}
            onMobileClick={() => {
              emailSourceRef.current = "mobile_link";
              setGetUpdates(true);
              setEmailValue("");
              setEmailOverlayPhase("mounting");
            }}
          />
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
              onFeaturesClick={scrollToFeatures}
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
                  {parts[0]}{breakFits[id] === false ? ' ' : <br />}{parts[1]}
                </p>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-8 pointer-events-auto w-fit">
                <div ref={downloadButtonRef}>
                  <DownloadButton showLabel dropdownDirection="up" size="md" forceWhite={currentSection === 'hero'}
                    onLinuxClick={() => {
                      if (downloadButtonRef.current) {
                        const rect = downloadButtonRef.current.getBoundingClientRect();
                        setDownloadButtonPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
                      }
                      emailSourceRef.current = "linux_waitlist";
                      setEmailValue("");
                      setEmailOverlayPhase("mounting");
                    }}
                    onMobileClick={() => {
                      emailSourceRef.current = "mobile_link";
                      setGetUpdates(true);
                      setEmailValue("");
                      setEmailOverlayPhase("mounting");
                    }}
                  />
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
        <ScrollToFeaturesButton
          onClick={() => scrollToFeatures()}
          className={`hidden lg:flex fixed z-20 bottom-12 xl:bottom-14 duration-500 ${
            isInDemosMode ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
          style={{ right: "var(--edge-spacing)" }}
          ariaLabel="Scroll down"
        />

        {/* Full Screen Hero Image - desktop only, fades out on scroll to reveal demos underneath */}
        <div
          className="hidden lg:block fixed inset-0 z-10 pointer-events-none transition-all duration-500 ease-out"
          style={{ opacity: videoOpacity }}
        >
          {/* Mobile: image shifted up 20%. Desktop: normal position */}
          <div className="absolute inset-0 -top-[20%] -right-[150px] sm:top-0 sm:right-0">
            <img
              src="/hero.jpg"
              alt=""
              className="w-full h-full object-cover object-right"
            />
          </div>
          {/* Phone: image shifted up 20%, black at bottom, tighter gradient */}
          <div
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background: `
                linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 45%, transparent 60%),
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

        {/* ===== MOBILE LAYOUT - simple scrollable site ===== */}
        <div className="lg:hidden">
          {/* Mobile Hero */}
          <div className="relative min-h-dvh flex flex-col text-white overflow-hidden">
            {/* Hero image background */}
            <div className="absolute inset-0 -right-[150px] -top-[20%]">
              <img src="/hero.jpg" alt="" className="w-full h-full object-cover object-right" />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{
              background: `
                linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 45%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 0% 0%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 35%, transparent 70%)
              `,
            }} />
            {/* Content */}
            <div className="relative z-10 flex flex-col flex-1 p-4" style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}>
              {/* Logo */}
              <a href="/launch" style={{ color: "#ffffff" }}>
                <Logo className="w-[29px] h-[123px]" />
              </a>
              <div className="flex-1" />
              <div className="pb-8">
                <h1 className="text-4xl font-medium tracking-tight mb-4">Get more done, faster</h1>
                <p ref={mobileDescRef} className="text-lg mb-8">
                  Interpreter lets you work alongside agents that can{mobileBreakFits ? <br /> : ' '}edit your documents, fill PDF forms, and more.
                </p>
                <div className="flex items-center justify-between">
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
                  <ScrollToFeaturesButton onClick={() => scrollToFeatures()} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div ref={mobileFeaturesRef} className="px-4" style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}>
            {BASE_DEMOS.map((demo) => {
              const desc = SECTION_DESCRIPTIONS[demo.id];
              return (
                <div key={demo.id} className="py-16">
                  <h2 className="text-3xl font-medium tracking-tight text-foreground mb-3">{demo.title}</h2>
                  {desc && <p className="text-base text-muted-foreground mb-8">{desc[0]} {desc[1]}</p>}
                  <div className="w-full aspect-[4/3] bg-secondary overflow-hidden" style={{ borderRadius: '16px', cornerShape: 'squircle' } as React.CSSProperties}>
                    <video
                      src={DEMO_VIDEO_SRC[demo.id]}
                      className="w-full h-full object-cover contrast-[1.1] shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onClick={(e) => toggleVideoPlayback(e.currentTarget)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pricing */}
          <div className="px-4 py-16" style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}>
            <h2 className="text-3xl font-medium text-foreground text-center mb-8">Pricing</h2>
            {/* Toggle hidden for now - monthly only */}
            <div className="flex flex-col gap-4">
              {PRICING_TIERS.map((tier) => {
                const price = billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
                return (
                  <div key={tier.name} className="bg-secondary squircle p-6 flex flex-col">
                    <h3 className="text-lg font-medium text-foreground mb-1">{tier.name}</h3>
                    <div className="mb-6">
                      <span className="text-2xl font-medium text-foreground">{price}</span>
                      {price.startsWith("$") && <span className="text-sm text-muted-foreground">/mo.</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{tier.subtitle}</p>
                    <ul className="space-y-2 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {tier.cta === "Download" ? (
                      <a
                        href={deviceType === 'windows' ? DOWNLOAD_URLS.windows : cpuType === 'Intel' ? DOWNLOAD_URLS.intel : DOWNLOAD_URLS.appleSilicon}
                        className={`w-fit px-6 py-3 squircle text-sm font-medium transition-opacity hover:opacity-80 ${
                          tier.highlighted ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {tier.cta}
                      </a>
                    ) : (
                      <button className={`w-fit px-6 py-3 squircle text-sm font-medium transition-opacity hover:opacity-80 ${
                        tier.highlighted ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                      }`}>
                        {tier.cta}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile FAQ */}
          <div className="px-4 py-16" style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}>
            <h2 className="text-3xl font-medium text-foreground text-center mb-10">FAQ</h2>
            <div className="bg-secondary squircle divide-y divide-border overflow-hidden">
              {Guide_ITEMS.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className="text-sm font-medium text-foreground">{item.question}</span>
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground">
                      <svg className={`w-4 h-4 transition-transform duration-200 ${expandedFaq === index ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-200" style={{ maxHeight: expandedFaq === index ? '500px' : '0', opacity: expandedFaq === index ? 1 : 0 }}>
                    <div className="px-6 pb-5 text-sm text-muted-foreground whitespace-pre-line">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="px-4 pb-8" style={{ paddingLeft: 'var(--edge-spacing)', paddingRight: 'var(--edge-spacing)' }}>
            <Footer />
          </div>
        </div>

        {/* Demo Videos - desktop only */}
        <div id="demos" className="hidden lg:block absolute" style={{ top: 1 }} />
        <div id="features" className="absolute top-[100vh] lg:top-[360px]" />
        <section
          ref={demoSectionRef}
          className="hidden lg:block transition-all duration-500 ease-out"
          style={{ opacity: isInDemosMode ? 1 : 0 }}
        >
          {/* Videos on the right side - fade out at pricing */}
          <div
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
                  <video
                    src={DEMO_VIDEO_SRC[demo.id]}
                    className="w-full h-full object-cover contrast-[1.1] shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onClick={(e) => toggleVideoPlayback(e.currentTarget)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pricing & FAQ */}
          <div id="pricing" style={{ position: 'relative', top: '-100px' }} />
          <section
            ref={pricingRef}
            className="max-w-4xl mx-auto px-4 pb-10 lg:pb-12 xl:pb-14"
          >
            {/* Pricing Section */}
            <div className={SECTION_GAP}>
              {/* Centered Title */}
              <h2 className="text-4xl lg:text-5xl font-medium text-foreground text-center mb-8">Pricing</h2>

              {/* Toggle hidden for now - monthly only */}

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
                      {tier.cta === "Download" ? (
                        <a
                          href={deviceType === 'windows' ? DOWNLOAD_URLS.windows : cpuType === 'Intel' ? DOWNLOAD_URLS.intel : DOWNLOAD_URLS.appleSilicon}
                          className={`w-fit px-6 py-3 squircle text-sm font-medium transition-opacity hover:opacity-80 ${
                            tier.highlighted ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                          }`}
                        >
                          {tier.cta}
                        </a>
                      ) : (
                        <button className={`w-fit px-6 py-3 squircle text-sm font-medium transition-opacity hover:opacity-80 ${
                          tier.highlighted ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                        }`}>
                          {tier.cta}
                        </button>
                      )}
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
                        maxHeight: expandedFaq === index ? '500px' : '0',
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

          {/* Email input - mobile: upper area, left-aligned; desktop: positioned at button */}
          <div
            className="absolute z-10 lg:w-auto"
            style={{
              ...(downloadButtonPos
                ? { top: downloadButtonPos.top, left: downloadButtonPos.left }
                : {}),
            }}
          >
            {/* Desktop layout */}
            <div className="hidden lg:block">
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
                      fetch("/api/send-link", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: emailValue.trim(), source: emailSourceRef.current, get_updates: getUpdates, platform: emailSourceRef.current === "linux_waitlist" ? "linux" : undefined }),
                      }).catch(() => {});
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
                    placeholder={emailSourceRef.current === "linux_waitlist" ? "Enter your email for Linux updates..." : "Type your email then press enter..."}
                    className="bg-transparent border-none outline-none text-4xl font-medium placeholder-muted text-foreground w-[40vw] text-left"
                  />
                </form>
              </div>
              {/* Thanks text - desktop */}
              <div
                className="absolute inset-x-0 top-0 transition-all duration-500 ease-out text-left"
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
                <p className="text-4xl font-medium text-muted whitespace-nowrap">
                  {emailSourceRef.current === "linux_waitlist"
                    ? "We\u2019ll let you know when it\u2019s ready for Linux."
                    : "Thanks, we\u2019ll keep you updated."}
                </p>
              </div>
            </div>

            {/* Mobile layout - upper area, left-aligned, keyboard-aware */}
            <div
              className="lg:hidden fixed inset-x-0 top-0 px-6 pt-32 transition-all duration-300 ease-out"
              style={{
                opacity: emailOverlayPhase === "mounting" || emailOverlayPhase === "emailExiting" || emailOverlayPhase === "thanks" || emailOverlayPhase === "exiting" ? 0 : 1,
                transform: emailOverlayPhase === "mounting"
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
                    fetch("/api/send-link", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: emailValue.trim(), source: emailSourceRef.current, get_updates: getUpdates, platform: emailSourceRef.current === "linux_waitlist" ? "linux" : undefined }),
                    }).catch(() => {});
                  }
                }}
                className="flex flex-col gap-5"
              >
                <input
                  autoFocus
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setEmailOverlayPhase("exiting");
                  }}
                  placeholder={emailSourceRef.current === "linux_waitlist" ? "Email for Linux updates..." : "Your email address..."}
                  className="bg-transparent border-none outline-none text-2xl font-medium placeholder-muted text-foreground w-full text-left"
                />
                <div className="flex items-center justify-between gap-4">
                  {/* Custom checkbox */}
                  <button
                    type="button"
                    onClick={() => setGetUpdates(!getUpdates)}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors duration-150 ${getUpdates ? 'bg-primary border-primary' : 'border-muted-foreground/40 bg-transparent'}`}>
                      {getUpdates && (
                        <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">Get updates</span>
                  </button>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground squircle text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* Thanks text - mobile */}
            <div
              className="lg:hidden fixed inset-x-0 top-0 px-6 pt-32 transition-all duration-500 ease-out text-left"
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
              <p className="text-2xl font-medium text-muted">
                {emailSourceRef.current === "linux_waitlist"
                  ? "We\u2019ll let you know when it\u2019s ready."
                  : "We sent you a link."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
