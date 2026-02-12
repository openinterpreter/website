"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "@/components/launch/motion-primitives/progressive-blur";
import Footer from "@/components/launch/Footer";
import DownloadButton from "@/components/launch/DownloadButton";

interface TocItem {
  id: string;
  label: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  toc?: TocItem[];
}

export default function PageLayout({ children, toc }: PageLayoutProps) {
  const pathname = usePathname();
  const isGuidePage = pathname === "/launch/guide";
  const [activeSection, setActiveSection] = useState<string | null>(toc?.[0]?.id ?? null);

  // Track scroll position to highlight active TOC item
  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const centerY = window.scrollY + viewportHeight / 2;

      // Find which section is closest to center of viewport
      let closestId = toc[0].id;
      let closestDistance = Infinity;

      toc.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const distance = Math.abs(elementTop - centerY);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestId = item.id;
          }
        }
      });

      setActiveSection(closestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  // Nav link class - highlight Guide when on guide page
  const getNavLinkClass = (path: string) => {
    const isActive = path === "/launch/guide" && isGuidePage;
    return `transition-all duration-200 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none ${isActive ? 'opacity-100' : 'opacity-50'}`;
  };

  // TOC link class - same behavior as nav
  const getTocLinkClass = (id: string) => {
    const isActive = activeSection === id;
    return `transition-all duration-200 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none ${isActive ? 'opacity-100 text-foreground' : 'opacity-50 text-muted-foreground'}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Blur behind header */}
      <div className="fixed inset-x-0 top-0 h-24 lg:h-28 z-30 pointer-events-none">
        <ProgressiveBlur
          className="absolute inset-0"
          direction="top"
          blurIntensity={1}
          blurLayers={8}
        />
      </div>

      {/* Fixed Header - top left */}
      <div
        className="fixed z-40 p-4 lg:p-6 xl:p-8"
        style={{ paddingLeft: 'var(--edge-spacing)' }}
      >
        <header className="flex items-start" style={{ gap: 'var(--edge-spacing)' }}>
          {/* Logo - the "i" */}
          <a href="/launch" className="flex flex-col gap-3">
            {/* Eye */}
            <div className="w-[29px] h-[29px] bg-primary rounded-full" />
            {/* Stem */}
            <div className="w-[29px] h-[82px] bg-primary rounded-full" />
          </a>

          {/* Nav */}
          <nav
            className="group flex items-center text-sm leading-none text-foreground"
            style={{ gap: 'var(--nav-gap)', marginTop: 'calc((29px - 1em) / 2)' }}
          >
            <a href="/launch#about" className={getNavLinkClass("/launch#about")}>Home</a>
            <a href="/launch#demos" className={getNavLinkClass("/launch#demos")}>Demos</a>
            <a href="/launch#pricing" className={getNavLinkClass("/launch#pricing")}>Pricing</a>
            <a href="/launch/guide" className={getNavLinkClass("/launch/guide")}>Guide</a>
          </nav>
        </header>
      </div>

      {/* Download button - top right */}
      <div
        className="hidden sm:block fixed z-40 top-4 lg:top-6 xl:top-8"
        style={{ right: 'var(--edge-spacing)' }}
      >
        <DownloadButton showDropdown={false} />
      </div>

      {/* Table of contents - fixed on left, vertically centered */}
      {toc && toc.length > 0 && (
        <nav
          className="hidden lg:block fixed z-30 top-1/2 -translate-y-1/2 group"
          style={{ left: 'var(--edge-spacing)' }}
        >
          <ul className="space-y-3 text-sm">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={getTocLinkClass(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 sm:px-6 pt-32 sm:pt-48 pb-16 sm:pb-24">
        {children}
      </main>

      {/* Footer */}
      <Footer className="max-w-4xl mx-auto px-5 sm:px-6 pb-16 sm:pb-24" />
    </div>
  );
}
