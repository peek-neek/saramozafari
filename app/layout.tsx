import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion/MotionProvider"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  title: "Saramoz Homes — Sara Mozafari, GTA Real Estate Agent",
  description:
    "Buy, sell or lease across the Greater Toronto Area with Sara Mozafari. Patient guidance, precise results and relationships built on trust.",
  openGraph: {
    title: "Saramoz Homes",
    description: "Real estate in the Greater Toronto Area with Sara Mozafari.",
    type: "website",
    locale: "en_CA",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-CA"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable, "font-sans")}
    >
      <body>
        <ThemeProvider forcedTheme="light">
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
