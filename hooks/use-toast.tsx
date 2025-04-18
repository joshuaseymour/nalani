"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast as useToastOriginal } from "@/components/ui/use-toast"

type ToastType = "default" | "success" | "error" | "warning" | "info" | "destructive"

type Toast = {
  id: string
  title: string
  description?: string
  variant?: ToastType
  duration?: number
}

type ToastContextType = {
  toasts: Toast[]
  toast: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default", duration = 5000 }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant, duration }

    setToasts((prevToasts) => [...prevToasts, newToast])

    if (duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const context = useContext(ToastContext)
  if (!context) return null

  const { toasts, dismiss } = context

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 transform transition-all duration-300 animate-slide-in ${getVariantStyles(
            toast.variant || "default",
          )}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm text-gray-500 dark:text-gray-400">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function getVariantStyles(variant: ToastType): string {
  switch (variant) {
    case "success":
      return "border-green-500 dark:border-green-600"
    case "error":
    case "destructive":
      return "border-red-500 dark:border-red-600"
    case "warning":
      return "border-yellow-500 dark:border-yellow-600"
    case "info":
      return "border-blue-500 dark:border-blue-600"
    default:
      return "border-gray-200 dark:border-gray-700"
  }
}

export function useToast() {
  const [isMounted, setIsMounted] = useState(false)
  const originalToast = useToastOriginal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Create a safe version of toast that only works when mounted
  const safeToast = {
    ...originalToast,
    toast: (...args: Parameters<typeof originalToast.toast>) => {
      if (isMounted) {
        return originalToast.toast(...args)
      }
      return { id: "", update: () => {} }
    },
  }

  return safeToast
}
