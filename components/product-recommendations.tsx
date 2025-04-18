"use client"

import { useState, useEffect } from "react"
import { getProducts } from "@/lib/products"
import type { Product } from "@/lib/products"
import { ProductCard } from "./product-card"

interface ProductRecommendationsProps {
  currentProductId: string
  lang: string
  limit?: number
}

export function ProductRecommendations({ currentProductId, lang, limit = 3 }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    // Get all products except the current one
    const allProducts = getProducts().filter((product) => product.id !== currentProductId)

    // Shuffle the array to get random recommendations
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())

    // Take only the number specified by limit
    setRecommendations(shuffled.slice(0, limit))
  }, [currentProductId, limit])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recommendations.map((product, index) => (
        <ProductCard key={product.id} product={product} lang={lang} index={index} />
      ))}
    </div>
  )
}
