import { Geist, Geist_Mono } from "next/font/google";
import "./style.css";
import { ThemeProvider } from "@/components/launch/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interpreter - The Professional AI Agent",
  description: "Get more done, faster. Interpreter makes finishing your work as easy as talking to a co-worker.",
};

export default function LaunchLayout({
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
