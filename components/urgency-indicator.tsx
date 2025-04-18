"use client"

import { useState, useEffect } from "react"
import { Clock, Eye } from "lucide-react"
import { useDictionary } from "@/hooks/use-dictionary"

interface UrgencyIndicatorProps {
  type: "stock" | "viewers"
  value: number
  lang?: string
}

export function UrgencyIndicator({ type, value, lang = "en" }: UrgencyIndicatorProps) {
  const [mounted, setMounted] = useState(false)
  const { dictionary } = useDictionary(lang)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const urgencyDict = dictionary?.urgency || {
    peopleViewing: "people viewing this product",
    inStock: "left in stock",
    almostGone: "Almost gone",
    sellingFast: "Selling fast",
  }

  if (type === "viewers") {
    return (
      <div className="flex items-center text-xs text-gray-500">
        <Eye className="h-3 w-3 mr-1" />
        <span>
          {value} {urgencyDict.peopleViewing || "people viewing this product"}
        </span>
      </div>
    )
  }

  if (type === "stock" && value <= 10) {
    return (
      <div className="flex items-center text-xs text-amber-600">
        <Clock className="h-3 w-3 mr-1" />
        <span>
          {value <= 3 ? (
            <span className="font-medium">{urgencyDict.almostGone || "Almost gone"}</span>
          ) : (
            <span>{urgencyDict.sellingFast || "Selling fast"}</span>
          )}{" "}
          - {value} {urgencyDict.inStock || "left in stock"}
        </span>
      </div>
    )
  }

  return null
}
