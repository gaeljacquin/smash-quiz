import './globals.css'

import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Smash Quiz',
  description: 'Test your Smash knowledge!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Navbar />
          <Header />
          {children}
          <SpeedInsights/>
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  )
}
