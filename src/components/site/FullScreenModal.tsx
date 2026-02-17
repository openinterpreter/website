"use client";

import { useEffect, useCallback, useState, ReactNode } from "react";

type ModalPhase = "closed" | "mounting" | "visible" | "exiting";

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: "blur" | "solid";
  showCloseButton?: boolean;
}

export default function FullScreenModal({
  isOpen,
  onClose,
  children,
  variant = "blur",
  showCloseButton = true,
}: FullScreenModalProps) {
  const [phase, setPhase] = useState<ModalPhase>("closed");

  // Handle open/close transitions
  useEffect(() => {
    if (isOpen && phase === "closed") {
      setPhase("mounting");
    } else if (!isOpen && (phase === "visible" || phase === "mounting")) {
      setPhase("exiting");
    }
  }, [isOpen, phase]);

  // Drive animation phases
  useEffect(() => {
    if (phase === "mounting") {
      // Allow DOM to render, then trigger visible state for CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("visible");
        });
      });
    }
  }, [phase]);

  // ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "visible") {
        setPhase("exiting");
      }
    },
    [phase]
  );

  useEffect(() => {
    if (phase !== "closed") {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (phase === "closed") {
        document.body.style.overflow = "";
      }
    };
  }, [phase, handleKeyDown]);

  // Clean up body overflow when fully closed
  useEffect(() => {
    if (phase === "closed") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  const handleBackdropClick = () => {
    if (phase === "visible") {
      setPhase("exiting");
    }
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Only handle transitions on the backdrop element itself
    if (e.target !== e.currentTarget) return;
    if (phase === "exiting" && e.propertyName === "opacity") {
      setPhase("closed");
      onClose();
    }
  };

  if (phase === "closed") return null;

  const isVisible = phase === "visible";

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      {variant === "blur" ? (
        <>
          {/* Blur layer */}
          <div
            className="absolute inset-0 backdrop-blur-[40px] transition-opacity duration-500 ease-out"
            style={{ opacity: isVisible ? 1 : 0 }}
            onClick={handleBackdropClick}
            onTransitionEnd={handleTransitionEnd}
          />
          {/* Darken/lighten layer */}
          <div
            className="absolute inset-0 bg-background transition-opacity duration-500 ease-out pointer-events-none"
            style={{ opacity: isVisible ? 0.7 : 0 }}
          />
        </>
      ) : (
        /* Solid background for direct URL navigation */
        <div
          className="absolute inset-0 bg-background transition-opacity duration-500 ease-out"
          style={{ opacity: isVisible ? 1 : 0 }}
          onClick={handleBackdropClick}
          onTransitionEnd={handleTransitionEnd}
        />
      )}

      {/* X Close Button - positioned exactly where logo circle is */}
      {/* Mobile: p-6 + mt-8 = 24px + 32px = 56px (top-14), pl-12 = 48px (left-12) */}
      {/* lg: p-10 + mt-8 = 40px + 32px = 72px (top-[72px]), pl-20 = 80px (left-20) */}
      {/* xl: p-12 + mt-8 = 48px + 32px = 80px (top-20), pl-24 = 96px (left-24) */}
      {showCloseButton && (
        <button
          onClick={() => {
            if (phase === "visible") {
              setPhase("exiting");
            }
          }}
          className="fixed z-50 w-[29px] h-[29px] rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-all duration-500 ease-out top-14 left-12 lg:top-[72px] lg:left-20 xl:top-20 xl:left-24"
          style={{ opacity: isVisible ? 1 : 0 }}
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
      )}

      {/* Content */}
      <div
        className="relative z-10 h-full overflow-y-auto transition-opacity duration-500 ease-out"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
