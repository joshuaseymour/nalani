"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  // Default to non-mobile for SSR
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if we're on the client side
    if (typeof window !== "undefined") {
      // Initial check
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Run initial check
      checkIfMobile()

      // Set up event listener for window resize
      window.addEventListener("resize", checkIfMobile)

      // Clean up event listener
      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [])

  // Return false during SSR to ensure consistent rendering
  return mounted ? isMobile : false
}
