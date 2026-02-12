"use client";

import { useState, useEffect, useRef } from "react";

const DOWNLOAD_URLS = {
  appleSilicon: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-arm64.dmg',
  intel: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-x64.dmg',
  windows: 'https://auth.openinterpreter.com/storage/v1/object/public/workstationupdater/releases/Interpreter-x64.exe',
};

export type DeviceType = 'windows' | 'mac' | 'linux' | 'mobile' | null;

interface DownloadButtonProps {
  label?: string;
  showLabel?: boolean;
  showDropdown?: boolean;
  className?: string;
  dropdownDirection?: "up" | "down";
  size?: "sm" | "md";
  forceWhite?: boolean;
  onLinuxClick?: () => void;
  onMobileClick?: () => void;
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>(null);
  const [cpuType, setCpuType] = useState<string | null>(null);

  useEffect(() => {
    const detect = async () => {
      const ua = navigator.userAgent;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
      if (isMobile) {
        setDeviceType('mobile');
        return;
      }
      const isWindows = ua.includes('Windows');
      if (isWindows) {
        setDeviceType('windows');
        return;
      }
      const isLinux = ua.includes('Linux');
      if (isLinux) {
        setDeviceType('linux');
        return;
      }
      // Default to mac
      setDeviceType('mac');
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
        const renderer = gl && debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        setCpuType(renderer.includes('Apple') ? 'Apple Silicon' : 'Intel');
      } catch {
        setCpuType('Apple Silicon');
      }
    };
    detect();
  }, []);

  return { deviceType, cpuType };
}

export default function DownloadButton({
  label,
  showDropdown = true,
  className = "",
  dropdownDirection = "down",
  size = "sm",
  forceWhite = false,
  onLinuxClick,
  onMobileClick,
}: DownloadButtonProps) {
  const { deviceType, cpuType } = useDeviceType();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    if (deviceType === 'windows') return DOWNLOAD_URLS.windows;
    return cpuType === 'Apple Silicon' ? DOWNLOAD_URLS.appleSilicon : DOWNLOAD_URLS.intel;
  };

  const getButtonLabel = () => {
    if (label) return label;
    if (deviceType === 'linux') return 'Get Linux Updates';
    if (deviceType === 'mobile') return 'Email Me a Link';
    return 'Download the Beta';
  };

  const isActionButton = deviceType === 'linux' || deviceType === 'mobile';

  const py = size === "md" ? "py-3" : "py-2";

  const bgClass = forceWhite ? '' : 'bg-primary';
  const fgClass = forceWhite ? '' : 'text-primary-foreground';
  const borderClass = forceWhite ? 'border-black/20' : 'border-primary-foreground/20';
  const bgStyle = forceWhite ? { backgroundColor: '#ffffff', color: '#000000' } : {};

  const handleMainClick = () => {
    if (deviceType === 'linux' && onLinuxClick) {
      onLinuxClick();
    } else if (deviceType === 'mobile' && onMobileClick) {
      onMobileClick();
    }
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div className={`inline-flex items-center ${bgClass} ${fgClass} squircle text-sm font-medium transition-colors duration-500`} style={bgStyle}>
        {isActionButton ? (
          <button
            onClick={handleMainClick}
            className={`px-6 ${py} hover:opacity-80 transition-opacity`}
          >
            {getButtonLabel()}
          </button>
        ) : (
          <a
            href={getDownloadUrl()}
            className={`px-6 ${py} hover:opacity-80 transition-opacity`}
          >
            {getButtonLabel()}
          </a>
        )}
        {showDropdown && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`px-2 ${py} border-l ${borderClass} hover:opacity-80 transition-all`}
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
        <div
          className={`absolute ${dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"} left-0 ${bgClass} ${fgClass} squircle overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] min-w-full`}
          style={bgStyle}
        >
          <a href={DOWNLOAD_URLS.appleSilicon} className="block px-4 py-2.5 text-sm hover:opacity-70 transition-opacity whitespace-nowrap">Mac (Apple Silicon)</a>
          <a href={DOWNLOAD_URLS.intel} className="block px-4 py-2.5 text-sm hover:opacity-70 transition-opacity whitespace-nowrap">Mac (Intel)</a>
          <a href={DOWNLOAD_URLS.windows} className="block px-4 py-2.5 text-sm hover:opacity-70 transition-opacity whitespace-nowrap">Windows</a>
        </div>
      )}
    </div>
  );
}
