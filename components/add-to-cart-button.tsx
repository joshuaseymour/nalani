"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"
import { ShoppingBag, Check, Minus, Plus } from "lucide-react"

interface AddToCartButtonProps {
  product: Product
  lang: string
  size?: "default" | "lg"
}

export function AddToCartButton({ product, lang, size = "default" }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Ensure component is mounted before any state updates
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleAddToCart = () => {
    if (isAdding || !isMounted) return

    setIsAdding(true)

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      flavor: product.flavor,
      quantity: quantity,
    })

    // Provide haptic feedback if available
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50)
    }

    if (isMounted) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    }

    setTimeout(() => {
      if (isMounted) {
        setIsAdding(false)
      }
    }, 1000)
  }

  const decreaseQuantity = () => {
    if (quantity > 1 && isMounted) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (isMounted) {
      if (quantity < product.stock) {
        setQuantity(quantity + 1)
      }
    }
  }

  // If not mounted yet, render a simplified version to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" disabled className="h-10 w-10 rounded-none">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center">1</span>
            <Button variant="ghost" size="icon" disabled className="h-10 w-10 rounded-none">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            disabled
            className={`${
              size === "lg" ? "py-6 text-lg" : ""
            } bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 flex-1`}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10 rounded-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
            className="h-10 w-10 rounded-none"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
          className={`${
            size === "lg" ? "py-6 text-lg" : ""
          } bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 flex-1`}
        >
          {isAdding ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      {product.stock < 10 && product.stock > 0 && (
        <p className="text-sm text-amber-600 dark:text-amber-400">Only {product.stock} left in stock!</p>
      )}
    </div>
  )
}
