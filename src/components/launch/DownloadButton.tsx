"use client";

import { useState, useEffect, useRef } from "react";

const DOWNLOAD_URLS = {
  appleSilicon: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-arm64.dmg',
  intel: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-x64.dmg',
  windows: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-x64.exe',
};

interface DownloadButtonProps {
  label?: string;
  showLabel?: boolean;
  showDropdown?: boolean;
  className?: string;
  dropdownDirection?: "up" | "down";
  size?: "sm" | "md";
}

export default function DownloadButton({
  label,
  showLabel = false,
  showDropdown = true,
  className = "",
  dropdownDirection = "down",
  size = "sm",
}: DownloadButtonProps) {
  const [osType, setOsType] = useState<'windows' | 'mac' | null>(null);
  const [cpuType, setCpuType] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [menuOpen]);

  const getDownloadUrl = () => {
    if (osType === 'windows') return DOWNLOAD_URLS.windows;
    return cpuType === 'Apple Silicon' ? DOWNLOAD_URLS.appleSilicon : DOWNLOAD_URLS.intel;
  };

  const getDownloadLabel = () => {
    if (label) return label;
    if (!showLabel) return 'Download';
    if (osType === 'windows') return 'Download for Windows';
    if (cpuType === 'Apple Silicon') return 'Download for Mac';
    if (cpuType === 'Intel') return 'Download for Mac (Intel)';
    return 'Download';
  };

  const py = size === "md" ? "py-3" : "py-2";

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div className="inline-flex items-center bg-primary text-primary-foreground squircle text-sm font-medium">
        <a
          href={getDownloadUrl()}
          className={`px-6 ${py} hover:opacity-80 transition-opacity`}
        >
          {getDownloadLabel()}
        </a>
        {showDropdown && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`px-2 ${py} border-l border-primary-foreground/20 hover:opacity-80 transition-all`}
            aria-label="More download options"
          >
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      {showDropdown && menuOpen && (
        <div className={`absolute ${dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"} left-0 bg-primary text-primary-foreground squircle overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] min-w-full`}>
          <a href={DOWNLOAD_URLS.appleSilicon} className="block px-4 py-2.5 text-sm hover:opacity-70 transition-opacity whitespace-nowrap">Mac (Apple Silicon)</a>
          <a href={DOWNLOAD_URLS.intel} className="block px-4 py-2.5 text-sm hover:opacity-70 transition-opacity whitespace-nowrap">Mac (Intel)</a>
          <a href={DOWNLOAD_URLS.windows} className="block px-4 py-2.5 text-sm hover:opacity-70 transition-opacity whitespace-nowrap">Windows</a>
        </div>
      )}
    </div>
  );
}
