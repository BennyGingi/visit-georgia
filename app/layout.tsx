import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Visit Georgia | Where Mountains Whisper',
  description: 'Discover Georgia - ancient mountains, 8000 years of wine, and hospitality that touches the soul.',
  keywords: ['Georgia', 'travel', 'tourism', 'Caucasus', 'Tbilisi', 'wine'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="noise">
        {children}
      </body>
    </html>
  )
}
