import "./style.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {} 