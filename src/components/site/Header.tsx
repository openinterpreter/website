"use client";

import Logo from "@/components/site/Logo";
import Link from "next/link";

interface HeaderProps {
  className?: string;
  currentSection?: 'hero' | 'demos' | 'third';
  activeHash?: string;
  forceWhite?: boolean;
  anchorPrefix?: string;
  hideNavOnMobile?: boolean;
  onFeaturesClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Header({
  className = "",
  currentSection,
  activeHash,
  forceWhite = false,
  anchorPrefix = "",
  hideNavOnMobile = false,
  onFeaturesClick,
}: HeaderProps) {
  // Map section/hash to nav item
  const getActiveSection = () => {
    if (activeHash === '#faq') return 'faq';
    if (activeHash === '#pricing') return 'pricing';
    if (currentSection === 'demos' || activeHash === '#demos' || activeHash === '#features') return 'demos';
    return 'home';
  };

  const activeSection = getActiveSection();

  // Active section is brighter (full opacity), others are dimmer
  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `transition-[opacity,filter] duration-150 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none ${isActive ? 'opacity-100' : 'opacity-50'}`;
  };

  return (
    <header className={`relative flex items-start ${className}`} style={{ pointerEvents: 'auto', gap: 'var(--edge-spacing)' }}>
      {/* Logo - the "i" */}
      <Link
        href="/"
        className="transition-colors duration-500"
        style={{ color: forceWhite ? "#ffffff" : "var(--primary)" }}
      >
        <Logo className="w-[29px] h-[123px]" />
      </Link>

      {/* Nav container - horizontally aligned with center of eye */}
      <nav
        className={`group items-center text-sm leading-none transition-colors duration-500 ${hideNavOnMobile ? "hidden sm:flex" : "flex"}`}
        style={{ gap: 'var(--nav-gap)', marginTop: 'calc((29px - 1em) / 2)', color: forceWhite ? '#ffffff' : 'var(--foreground)' }}
      >
        <a href={`${anchorPrefix}#home`} className={getLinkClass('home')}>Home</a>
        <a href={`${anchorPrefix}#features`} onClick={onFeaturesClick} className={getLinkClass('demos')}>Features</a>
        <a href={`${anchorPrefix}#pricing`} className={getLinkClass('pricing')}>Pricing</a>
        {/* <Link href="/blog" className={getLinkClass('blog')}>Blog</Link> */}
        {/* <a href="/guide" className="opacity-50 transition-all duration-200 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none">Guide</a> */}
      </nav>
    </header>
  );
}
