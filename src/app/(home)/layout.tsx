import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./style.css";
import { ThemeProvider } from "@/components/site/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SHARE_TITLE = "Interpreter: The AI Document Editor";
const SHARE_DESCRIPTION =
  "Interpreter lets you work alongside agents that can edit your documents, fill PDF forms, and more.";
const SHARE_IMAGE = "/hero.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://openinterpreter.com"),
  title: SHARE_TITLE,
  description: SHARE_DESCRIPTION,
  openGraph: {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [
      {
        url: SHARE_IMAGE,
        alt: SHARE_TITLE,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
