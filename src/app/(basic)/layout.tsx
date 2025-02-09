import type { Metadata } from "next";
import "./style.css";
import ScalingContent from '../ScalingContent'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Open Interpreter",
  description: "A new way to use computers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload all pages except /desktop */}
        {/* <link rel="preload" href="/" as="document" />
        <link rel="preload" href="/about" as="document" />
        <link rel="preload" href="/blog" as="document" />
        <link rel="preload" href="/blog/first-post" as="document" />
        <link rel="preload" href="/blog/second-post" as="document" /> */}
        
        {/* Preload critical assets */}
        {/* <link rel="preload" href="/interpreter.png" as="image" />
        <link rel="preload" href="/fonts/PPEditorialNew-Regular.otf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPEditorialNew-Italic.otf" as="font" crossOrigin="anonymous" /> */}
      </head>
      <body>
        <div className="default-styles min-h-screen flex flex-col">
          <div className="flex-grow">
            <ScalingContent>
              <Navigation />
              {children}
            </ScalingContent>
          </div>
          <div className="md:ml-8 px-5 mb-8">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
