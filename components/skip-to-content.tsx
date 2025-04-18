"use client"

import type React from "react"

import { useCallback, useState } from "react"

export function SkipToContent() {
  const [focused, setFocused] = useState(false)

  const handleFocus = useCallback(() => setFocused(true), [])
  const handleBlur = useCallback(() => setFocused(false), [])
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }, [])

  return (
    <a
      href="#main-content"
      className={`
        fixed top-2 left-2 z-50 bg-white dark:bg-gray-900 px-4 py-2 rounded-md
        text-sm font-medium text-gray-900 dark:text-gray-100 shadow-md
        transition-transform duration-200 ease-in-out
        ${focused ? "transform-none" : "-translate-y-16"}
      `}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      Skip to content
    </a>
  )
}
