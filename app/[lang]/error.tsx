"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logErrorToServer, reportErrorToAnalytics } from "./error-actions"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Get the language from the URL manually since we can't use server hooks in error components
  const lang = typeof window !== "undefined" ? window.location.pathname.split("/")[1] || "en" : "en"

  useEffect(() => {
    // Log the error to console
    console.error("Client-side error:", error)

    // Log to server asynchronously
    logErrorToServer(error).catch(console.error)
    reportErrorToAnalytics(error).catch(console.error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="rounded-full bg-red-100 p-4 mb-6">
        <svg
          className="h-10 w-10 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">An unexpected error has occurred.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90">
          <Link href={`/${lang}`}>Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
