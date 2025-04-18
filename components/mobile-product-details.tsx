"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Heart, ShoppingBag, Check, Star, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FlavorBadge } from "@/components/flavor-badge"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UrgencyIndicator } from "@/components/urgency-indicator"
import { cn } from "@/lib/utils"

export function MobileProductDetails({
  product,
  dictionary,
  lang,
}: {
  product: any
  dictionary: any
  lang: string
}) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Safety check for product
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Product information is not available</p>
      </div>
    )
  }

  // Ensure dictionary has default values
  const safeDict = {
    addToCart: "Add to Cart",
    addedToCart: "Added to cart",
    addedToCartMessage: "has been added to your cart",
    quantity: "Quantity",
    features: "Features",
    ingredients: "Ingredients",
    backToProducts: "Back to Products",
    ...dictionary,
  }

  // Product images (for demo, we'll use the same image with different IDs)
  const productImages = [
    { id: 1, src: product.image || "/placeholder.svg?height=500&width=500" },
    { id: 2, src: "/placeholder.svg?height=500&width=500&text=Image+2" },
    { id: 3, src: "/placeholder.svg?height=500&width=500&text=Image+3" },
  ]

  // Define flavor-specific styles
  const flavorStyles = {
    strawberry: {
      gradient: "from-strawberry-light to-white",
      accent: "bg-strawberry",
      text: "text-strawberry",
      border: "border-strawberry",
      light: "bg-strawberry-light",
    },
    vanilla: {
      gradient: "from-vanilla-light to-white",
      accent: "bg-vanilla",
      text: "text-vanilla-dark",
      border: "border-vanilla",
      light: "bg-vanilla-light",
    },
    chocolate: {
      gradient: "from-chocolate-light to-white",
      accent: "bg-chocolate",
      text: "text-chocolate",
      border: "border-chocolate",
      light: "bg-chocolate-light",
    },
  }

  const style = flavorStyles[product.color as keyof typeof flavorStyles] || flavorStyles.strawberry

  // Touch handlers for image slider
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX.current = e.changedTouches[0].clientX
      const diff = touchStartX.current - touchEndX.current

      if (Math.abs(diff) > 50) {
        if (diff > 0 && activeImage < productImages.length - 1) {
          // Swiped left - next image
          setActiveImage((prev) => prev + 1)
        } else if (diff < 0 && activeImage > 0) {
          // Swiped right - previous image
          setActiveImage((prev) => prev - 1)
        }
      }
    }
  }

  const handleAddToCart = () => {
    if (isAddingToCart) return // Prevent multiple clicks

    setIsAddingToCart(true)

    try {
      // Validate product data before adding to cart
      if (!product || !product.id || !product.name || typeof product.price !== "number") {
        throw new Error("Invalid product data")
      }

      if (quantity <= 0) {
        throw new Error("Invalid quantity")
      }

      // Provide haptic feedback if available
      try {
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      } catch (e) {
        // Ignore vibration errors
        console.warn("Vibration API error:", e)
      }

      // Add item to cart with proper validation
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        color: product.color || "strawberry",
      })

      toast({
        title: safeDict.addedToCart || "Added to cart",
        description: `${product.name} (${quantity}) ${safeDict.addedToCartMessage || "has been added to your cart"}`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Reset adding state after a delay for better UX
      setTimeout(() => {
        setIsAddingToCart(false)
      }, 600)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)

    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
    })
  }

  // Share product
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      })
    }
  }

  return (
    <div className="pb-24">
      {/* Product Image Slider */}
      <div className="relative mb-4">
        <div
          ref={sliderRef}
          className={`relative h-80 rounded-b-2xl overflow-hidden border-b-2 ${style.border} bg-gradient-to-b ${style.gradient}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Product image gallery"
          aria-roledescription="carousel"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-48 h-48 rounded-full ${style.accent} opacity-20`}></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-full"
            >
              <Image
                src={productImages[activeImage].src || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-4 left-4 flex gap-2">
            <FlavorBadge flavor={product.color} />
            {product.isBestseller && (
              <Badge variant="outline" className="bg-white/80">
                Bestseller
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm"
              onClick={toggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm"
              onClick={handleShare}
              aria-label="Share product"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Image navigation arrows */}
          {activeImage > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
              onClick={() => setActiveImage((prev) => prev - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {activeImage < productImages.length - 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
              onClick={() => setActiveImage((prev) => prev + 1)}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          <div className="sr-only" aria-live="polite">
            Image {activeImage + 1} of {productImages.length}, showing {product.name}
          </div>
        </div>

        {/* Image pagination dots */}
        <div className="flex justify-center gap-2 mt-3">
          {productImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeImage ? `w-4 ${style.accent}` : "bg-gray-300"
              }`}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(24)</span>
          </div>
          <UrgencyIndicator type="viewers" value={7} />
        </div>

        <h1 className="text-2xl font-bold mb-1">
          <span className={style.text}>{product.name}</span>
        </h1>

        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
          )}
          {product.discount && (
            <Badge variant="outline" className="ml-2 text-green-600 border-green-200 bg-green-50">
              Save {product.discount}
            </Badge>
          )}
        </div>

        <div className="mb-6">
          <UrgencyIndicator type="stock" value={5} />
        </div>

        <div className="relative mb-6">
          <p className={`text-sm ${showInfo ? "" : "line-clamp-2"}`}>
            {product.fullDescription || product.description}
          </p>
          {!showInfo && (product.fullDescription?.length > 100 || product.description?.length > 100) && (
            <button
              onClick={() => setShowInfo(true)}
              className="text-xs text-fuchsia-600 font-medium mt-1 flex items-center"
            >
              Read more <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          )}
        </div>

        <Tabs defaultValue="features" className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="animate-slide-up pt-4">
            {product.features && (
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="ingredients" className="animate-slide-up pt-4">
            {product.ingredients && (
              <div className={`p-3 rounded-lg ${style.light} text-sm`}>{product.ingredients}</div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="animate-slide-up pt-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Customer {i}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3 w-3 ${j < 5 - (i % 2) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {i === 1
                      ? "Love this lip balm! So moisturizing and smells amazing."
                      : i === 2
                        ? "Great product, fast shipping. Will buy again!"
                        : "My daughter loves these. The flavors are wonderful."}
                  </p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                See all 24 reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">{safeDict.quantity || "Quantity"}:</span>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-10 w-10 rounded-l-md rounded-r-none"
              aria-label="Decrease quantity"
            >
              -
            </Button>
            <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-10 w-10 rounded-r-md rounded-l-none"
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>
        </div>

        {/* Sticky Add to Cart Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className={`border-2 transition-colors h-14 w-14 ${isWishlisted ? "border-red-300 bg-red-50" : "border-gray-200"}`}
              onClick={toggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            <Button
              className={`flex-1 transition-all duration-300 ${
                isAddingToCart ? "bg-green-600" : "bg-gradient-primary"
              } hover:opacity-90 h-14 text-lg`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              aria-label={isAddingToCart ? "Added to cart" : "Add to cart"}
            >
              {isAddingToCart ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  {dictionary.added || "Added!"}
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {safeDict.addToCart || "Add to Cart"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
