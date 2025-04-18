"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { FlavorBadge } from "@/components/flavor-badge"
import { useDictionary } from "@/hooks/use-dictionary"

interface CartItemProps {
  item: any
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
  isRemoving?: boolean
  lang: string
  style?: {
    gradient?: string
    border?: string
  }
}

export function CartItem({ item, onRemove, onUpdateQuantity, isRemoving = false, lang, style = {} }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity || 1)
  const { dictionary } = useDictionary(lang)

  // Ensure we have default values for style properties
  const safeStyle = {
    gradient: style?.gradient || "from-gray-100 to-white",
    border: style?.border || "border-gray-200",
  }

  // Update local quantity when item quantity changes
  useEffect(() => {
    setQuantity(item.quantity || 1)
  }, [item.quantity])

  // Handle quantity change with debounce
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)

    // Debounce the update to reduce unnecessary API calls
    const timeoutId = setTimeout(() => {
      onUpdateQuantity(newQuantity)
    }, 300)

    return () => clearTimeout(timeoutId)
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        height: isRemoving ? 0 : "auto",
      }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border p-4 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div
          className={`relative h-20 w-20 rounded-lg overflow-hidden border ${safeStyle.border} bg-gradient-to-b ${safeStyle.gradient}`}
        >
          <Image
            src={item.image || "/placeholder.svg?height=80&width=80"}
            alt={item.name || "Product"}
            fill
            className="object-contain p-2"
            sizes="80px"
          />
          {item.color && (
            <div className="absolute top-1 left-1">
              <FlavorBadge flavor={item.color} className="text-xs" lang={lang} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{item.name || "Product"}</h3>
          <p className="text-sm text-muted-foreground">
            ${(item.price || 0).toFixed(2)} {dictionary?.cart?.each || "each"}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="h-8 w-8"
            aria-label={dictionary?.cart?.decreaseQuantity || "Decrease quantity"}
          >
            -
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="h-8 w-8"
            aria-label={dictionary?.cart?.increaseQuantity || "Increase quantity"}
          >
            +
          </Button>
        </div>

        <div className="font-medium">${((item.price || 0) * (quantity || 1)).toFixed(2)}</div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          aria-label={dictionary?.cart?.remove || "Remove item"}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
