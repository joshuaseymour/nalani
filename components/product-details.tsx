"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Heart, ShoppingBag, Check, Star, Share2, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FlavorBadge } from "@/components/flavor-badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useMobile } from "@/hooks/use-mobile"

export function ProductDetails({
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
  const { addItem } = useCart()
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    setActiveImage(0)
  }, [product])

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

  const style = flavorStyles[product.color as keyof typeof flavorStyles]

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

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
    })
  }

  // Calculate stock percentage (for demo) - more realistic
  const stockPercentage = Math.floor(Math.random() * 40) + 40 // Between 40% and 80%
  const lowStock = stockPercentage < 30

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
        // Only show error if it's not an AbortError (user canceled)
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Error sharing:", error)
          toast({
            title: "Sharing failed",
            description: "Could not share this product. Please try again.",
            variant: "destructive",
          })
        }
      }
    } else {
      // Fallback
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied!",
          description: "Product link copied to clipboard",
        })
      } catch (error) {
        console.error("Error copying to clipboard:", error)
        toast({
          title: "Copy failed",
          description: "Could not copy link to clipboard. Please try manually.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/${lang}/products`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {safeDict.backToProducts || "Back to Products"}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div
            className={`relative rounded-2xl overflow-hidden border-2 ${style?.border || "border-gray-200"} bg-gradient-to-b ${
              style?.gradient || "from-gray-100 to-white"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-64 h-64 rounded-full ${style?.accent || "bg-gray-200"} opacity-20`}></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-[500px]"
              >
                <Image
                  src={productImages[activeImage].src || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-4 flex gap-2">
              <FlavorBadge flavor={product.color} />
              {product.isBestseller && (
                <Badge variant="outline" className="bg-white/80">
                  {dictionary?.products?.bestSeller || "Bestseller"}
                </Badge>
              )}
            </div>

            <button
              className="absolute bottom-4 right-4 p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Share product"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center gap-2">
            {productImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(index)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                  activeImage === index ? style?.border || "border-gray-300" : "border-transparent"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(24 reviews)</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className={style?.text || ""}>{product.name}</span>
          </h1>

          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
            )}
            {product.discount && (
              <Badge variant="outline" className="ml-2 text-green-600 border-green-200 bg-green-50">
                {dictionary?.products?.save || "Save"} {product.discount}
              </Badge>
            )}
          </div>

          {/* Stock indicator - only if stock is actually low */}
          {lowStock && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>{dictionary?.products?.stockLevel || "Stock level"}</span>
                <span className="text-amber-600 font-medium">
                  {dictionary?.products?.limitedStock || "Limited stock"}
                </span>
              </div>
              <Progress value={stockPercentage} className="h-2" indicatorClassName="bg-amber-500" />
              <p className="text-xs text-amber-600 mt-1">
                {dictionary?.products?.limitedAvailability || "Limited availability"}
              </p>
            </div>
          )}

          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="description">{dictionary?.products?.description || "Description"}</TabsTrigger>
              <TabsTrigger value="features">{safeDict.features}</TabsTrigger>
              <TabsTrigger value="ingredients">{safeDict.ingredients}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="animate-slide-up">
              <div className={`p-4 rounded-lg ${style?.light || "bg-gray-50"}`}>
                <p className="text-lg">{product.fullDescription || product.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="features" className="animate-slide-up">
              {product.features && (
                <div className={`p-4 rounded-lg ${style?.light || "bg-gray-50"}`}>
                  <ul className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ingredients" className="animate-slide-up">
              {product.ingredients && (
                <div className={`p-4 rounded-lg ${style?.light || "bg-gray-50"}`}>
                  <p className="bg-white/70 p-4 rounded-lg border text-sm">{product.ingredients}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium" id="quantity-label">
              {safeDict.quantity || "Quantity"}:
            </span>
            <div className="flex items-center" role="group" aria-labelledby="quantity-label">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-12 w-12 rounded-l-md rounded-r-none"
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <div
                className="h-12 w-16 flex items-center justify-center border-y"
                aria-live="polite"
                aria-atomic="true"
              >
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-12 w-12 rounded-r-md rounded-l-none"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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
                  {dictionary?.productDetails?.added || "Added!"}
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {safeDict.addToCart || "Add to Cart"}
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className={`border-2 transition-colors h-14 ${
                isWishlisted ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
              onClick={toggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <div className="p-2 rounded-full bg-purple-100">
                <svg
                  className="h-4 w-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>{dictionary?.products?.freeShipping || "Free shipping"}</span>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <div className="p-2 rounded-full bg-fuchsia-100">
                <svg
                  className="h-4 w-4 text-fuchsia-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <span>{dictionary?.products?.sameDay || "Same-day dispatch"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
