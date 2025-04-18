"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { FlavorBadge } from "./flavor-badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Check, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { useDictionary } from "@/hooks/use-dictionary"

interface ProductCardProps {
  product: Product
  lang: string
  index?: number
}

export function ProductCard({ product, lang, index = 0 }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()
  const { dictionary } = useDictionary(lang)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAddingToCart) return

    setIsAddingToCart(true)

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      flavor: product.flavor,
      quantity: 1,
    })

    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    toast({
      title: dictionary?.productDetails?.addedToCart || "Added to cart",
      description: `${product.name} ${dictionary?.productDetails?.addedToCartMessage || "has been added to your cart"}`,
    })

    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  // Define flavor-specific styles
  const flavorStyles: Record<string, { gradient: string; accent: string }> = {
    strawberry: {
      gradient: "from-pink-50 to-white dark:from-pink-900/20 dark:to-transparent",
      accent: "bg-pink-400",
    },
    vanilla: {
      gradient: "from-amber-50 to-white dark:from-amber-900/20 dark:to-transparent",
      accent: "bg-amber-400",
    },
    chocolate: {
      gradient: "from-amber-800/10 to-white dark:from-amber-950/20 dark:to-transparent",
      accent: "bg-amber-800",
    },
    mint: {
      gradient: "from-green-50 to-white dark:from-green-900/20 dark:to-transparent",
      accent: "bg-green-400",
    },
    coconut: {
      gradient: "from-blue-50 to-white dark:from-blue-900/20 dark:to-transparent",
      accent: "bg-blue-400",
    },
    honey: {
      gradient: "from-yellow-50 to-white dark:from-yellow-900/20 dark:to-transparent",
      accent: "bg-yellow-400",
    },
  }

  const style = flavorStyles[product.flavor] || flavorStyles.strawberry

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/${lang}/products/${product.id}`} className="block h-full focus-ring rounded-lg">
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className={`relative h-48 sm:h-56 md:h-64 bg-gradient-to-b ${style.gradient}`}>
            {/* Flavor accent circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-24 h-24 rounded-full ${style.accent} opacity-20`}></div>
            </div>

            <Image
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute top-3 left-3">
              <FlavorBadge flavor={product.flavor} />
            </div>

            {/* New or bestseller badge */}
            {product.new && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-500">
                {dictionary?.products?.new || "New"}
              </Badge>
            )}
            {product.bestSeller && !product.new && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500">
                {dictionary?.products?.bestSeller || "Best Seller"}
              </Badge>
            )}
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center gap-1 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(24)</span>
            </div>

            <h3 className="font-semibold text-base mb-1">{product.name}</h3>
            <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{product.description || ""}</p>

            <div className="flex items-center justify-between mt-auto">
              <p className="font-bold text-base">${product.price.toFixed(2)}</p>
              <Button
                size="sm"
                className={`rounded-full w-9 h-9 p-0 touch-target ${
                  isAddingToCart ? "bg-green-600" : "bg-gradient-to-r from-purple-600 to-pink-500"
                } hover:opacity-90`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                aria-label={`${dictionary?.products?.addToCart || "Add"} ${product.name} ${dictionary?.products?.toCart || "to cart"}`}
              >
                {isAddingToCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
