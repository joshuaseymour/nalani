"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { ProductCardSkeleton } from "./product-card-skeleton"
import { getProducts, getFeaturedProducts, getNewProducts, getBestSellers } from "@/lib/products"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  lang: string
  featured?: boolean
  newArrivals?: boolean
  bestSellers?: boolean
  limit?: number
}

export function ProductGrid({
  lang,
  featured = false,
  newArrivals = false,
  bestSellers = false,
  limit,
}: ProductGridProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      let productList: Product[] = []

      if (featured) {
        productList = getFeaturedProducts()
      } else if (newArrivals) {
        productList = getNewProducts()
      } else if (bestSellers) {
        productList = getBestSellers()
      } else {
        productList = getProducts()
      }

      if (limit && limit > 0) {
        productList = productList.slice(0, limit)
      }

      setProducts(productList)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [featured, newArrivals, bestSellers, limit])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {isLoading
        ? Array.from({ length: limit || 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
        : products.map((product, index) => (
            <ProductCard key={product.id} product={product} lang={lang} index={index} />
          ))}
    </div>
  )
}
