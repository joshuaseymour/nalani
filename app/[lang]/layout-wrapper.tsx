"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { SkipToContent } from "@/components/skip-to-content"

export function LayoutWrapper({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: string
}) {
  const [mounted, setMounted] = useState(false)

  // Ensure hydration is complete before rendering children
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <SkipToContent />
          <Navbar lang={lang} />
          <main id="main-content" className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>{mounted ? children : <LoadingSpinner />}</Suspense>
          </main>
          <Footer lang={lang} />
          {/* Removed Toaster component to avoid Radix UI issues */}
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}
