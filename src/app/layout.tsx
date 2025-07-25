'use client' // 🔥 This makes the layout a Client Component (needed for usePathname)

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="en" className={inter.className}>
      <body>
        {!isAdmin && <Navbar />}
        <main className={!isAdmin ? 'pt-16' : ''}>
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  )
}
