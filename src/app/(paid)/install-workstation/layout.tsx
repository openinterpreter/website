import "./style.css";
import { Analytics } from "@vercel/analytics/next";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Interpreter Workstation',
  description: 'The AI document editor.',
} 
