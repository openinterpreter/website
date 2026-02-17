"use client";

import type { CSSProperties } from "react";

interface ScrollToFeaturesButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}

export default function ScrollToFeaturesButton({
  onClick,
  className = "",
  ariaLabel = "Go to features",
  style,
}: ScrollToFeaturesButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded-full hover:opacity-80 transition-opacity ${className}`}
      style={{ backgroundColor: "#ffffff", color: "#000000", ...style }}
      aria-label={ariaLabel}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  );
}
