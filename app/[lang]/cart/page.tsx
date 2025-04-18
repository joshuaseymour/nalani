"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useDictionary } from "@/hooks/use-dictionary"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { CartItem } from "@/components/cart-item"

export default function CartPage({
  params,
}: {
  params: { lang: string }
}) {
  const { items, removeItem, updateItemQuantity, clearCart, isLoading, error } = useCart()
  const { dictionary, isLoading: isDictionaryLoading, error: dictionaryError } = useDictionary(params.lang)
  const [removingItemId, setRemovingItemId] = useState<string | null>(null)

  // Get cart dictionary with fallback
  const cartDict = dictionary?.cart || {}

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
  const freeShippingThreshold = 15
  const shipping = subtotal >= freeShippingThreshold ? 0 : 4.99
  const total = subtotal + shipping
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const amountToFreeShipping = freeShippingThreshold - subtotal > 0 ? (freeShippingThreshold - subtotal).toFixed(2) : 0

  // Define flavor-specific styles
  const flavorStyles = {
    strawberry: {
      gradient: "from-strawberry-light to-white",
      border: "border-strawberry/30",
    },
    vanilla: {
      gradient: "from-vanilla-light to-white",
      border: "border-vanilla/30",
    },
    chocolate: {
      gradient: "from-amber-100 to-white",
      border: "border-chocolate/30",
    },
    default: {
      gradient: "from-gray-100 to-white",
      border: "border-gray-200",
    },
  }

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    setRemovingItemId(id)
    setTimeout(() => {
      removeItem(id)
      setRemovingItemId(null)
    }, 300)
  }

  if (isLoading || isDictionaryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || dictionaryError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-fuchsia-700">
          {cartDict.title || "Your Shopping Cart"}
        </h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was a problem loading your cart. Please try again later.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8 text-fuchsia-700">{cartDict.title || "Your Shopping Cart"}</h1>
        <div className="max-w-md mx-auto p-8 border-2 border-dashed border-gray-200 rounded-lg">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{cartDict.emptyCart || "Your cart is empty"}</h2>
          <p className="text-gray-500 mb-6">
            {cartDict.emptyCartMessage || "Add some products to your cart to continue shopping"}
          </p>
          <Button asChild>
            <Link href={`/${params.lang}/products`}>{cartDict.continueShopping || "Continue Shopping"}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-fuchsia-700">{cartDict.title || "Your Shopping Cart"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => {
            // Get style based on item color or use default
            const style =
              item.color && flavorStyles[item.color as keyof typeof flavorStyles]
                ? flavorStyles[item.color as keyof typeof flavorStyles]
                : flavorStyles.default

            return (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(item.id)}
                onUpdateQuantity={(quantity) => updateItemQuantity(item.id, quantity)}
                isRemoving={removingItemId === item.id}
                lang={params.lang}
                style={style}
              />
            )
          })}

          <div className="flex justify-between mt-6">
            <Button variant="outline" asChild className="border-fuchsia-200 hover:bg-fuchsia-50">
              <Link href={`/${params.lang}/products`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {cartDict.continueShopping || "Continue Shopping"}
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => clearCart()}
              className="border-fuchsia-200 hover:bg-fuchsia-50 hover:text-red-600"
            >
              {cartDict.clearCart || "Clear Cart"}
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg border-2 border-fuchsia-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4">{cartDict.orderSummary || "Order Summary"}</h2>

            {subtotal < freeShippingThreshold && (
              <div className="mb-6 bg-fuchsia-50 p-4 rounded-lg">
                <p className="text-sm text-fuchsia-800 mb-2">
                  {cartDict.addMoreForFreeShipping || "Add"} <span className="font-bold">${amountToFreeShipping}</span>{" "}
                  {cartDict.moreForFreeShipping || "more to qualify for free shipping!"}
                </p>
                <Progress
                  value={progressToFreeShipping}
                  className="h-2 bg-fuchsia-100"
                  indicatorClassName="bg-fuchsia-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {cartDict.freeShippingThreshold || "Free shipping threshold"}: ${freeShippingThreshold.toFixed(2)}
                </p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">{cartDict.subtotal || "Subtotal"}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{cartDict.shipping || "Shipping"}</span>
                <span>{shipping === 0 ? cartDict.free || "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-3 mt-3 border-gray-200">
                <div className="flex justify-between font-bold">
                  <span>{cartDict.total || "Total"}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-fuchsia-600 hover:bg-fuchsia-700">
              <Link href={`/${params.lang}/checkout`}>{cartDict.proceedToCheckout || "Proceed to Checkout"}</Link>
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              <span className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                {cartDict.secureCheckout || "Secure checkout"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
