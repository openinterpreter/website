"use client";

interface HeaderProps {
  className?: string;
  currentSection?: 'hero' | 'demos' | 'third';
  activeHash?: string;
  forceWhite?: boolean;
}

export default function Header({ className = "", currentSection, activeHash, forceWhite = false }: HeaderProps) {
  // Map section/hash to nav item
  const getActiveSection = () => {
    if (activeHash === '#faq') return 'faq';
    if (activeHash === '#pricing') return 'pricing';
    if (currentSection === 'demos' || activeHash === '#demos') return 'demos';
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
      <a href="/launch" className="flex flex-col gap-3">
        {/* Eye */}
        <div className="w-[29px] h-[29px] rounded-full transition-colors duration-500" style={{ backgroundColor: forceWhite ? '#ffffff' : 'var(--primary)' }} />
        {/* Stem */}
        <div className="w-[29px] h-[82px] rounded-full transition-colors duration-500" style={{ backgroundColor: forceWhite ? '#ffffff' : 'var(--primary)' }} />
      </a>

      {/* Nav container - horizontally aligned with center of eye */}
      <nav
        className="group flex items-center text-sm leading-none transition-colors duration-500"
        style={{ gap: 'var(--nav-gap)', marginTop: 'calc((29px - 1em) / 2)', color: forceWhite ? '#ffffff' : 'var(--foreground)' }}
      >
        <a href="#home" className={getLinkClass('home')}>Home</a>
        <a href="#features" className={getLinkClass('demos')}>Features</a>
        <a href="#pricing" className={getLinkClass('pricing')}>Pricing</a>
        {/* <a href="/guide" className="opacity-50 transition-all duration-200 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none">Guide</a> */}
      </nav>
    </header>
  );
}
