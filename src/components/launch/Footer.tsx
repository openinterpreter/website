"use client";

import { useTheme } from "./ThemeProvider";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const { theme, setTheme } = useTheme();

  return (
    <footer className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Product */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Product</h4>
          <div className="space-y-2">
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Open Source</a>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Community</h4>
          <div className="space-y-2">
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Legal</h4>
          <div className="space-y-2">
            <a href="/launch/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/launch/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Theme */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Theme</h4>
          <div className="flex flex-col gap-2 group">
            <button
              onClick={() => setTheme(theme === "light" ? "system" : "light")}
              className={`text-left text-sm transition-all duration-200 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none ${theme === "light" ? "text-foreground opacity-100" : "text-muted-foreground opacity-50"}`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "system" : "dark")}
              className={`text-left text-sm transition-all duration-200 group-hover:opacity-50 group-hover:blur-[1px] hover:!opacity-100 hover:!blur-none ${theme === "dark" ? "text-foreground opacity-100" : "text-muted-foreground opacity-50"}`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
