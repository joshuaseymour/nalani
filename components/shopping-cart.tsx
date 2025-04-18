"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { ShoppingBag, X, Plus, Minus } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { FlavorBadge } from "./flavor-badge"
import { useDictionary } from "@/hooks/use-dictionary"

export function ShoppingCart({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart()
  const { dictionary, isLoading } = useDictionary(lang)

  // Ensure component is mounted before any state updates
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If not mounted yet, render a simplified version to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
      </Button>
    )
  }

  const cartDict = dictionary?.cart || {}

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle>{cartDict.yourCart || "Your Cart"}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-1">{cartDict.emptyCart || "Your cart is empty"}</h3>
            <p className="text-muted-foreground text-center mb-6">
              {cartDict.emptyCartMessage || "Add some products to your cart to continue shopping"}
            </p>
            <SheetClose asChild>
              <Button asChild>
                <Link href={`/${lang}/products`}>{cartDict.browseProducts || "Browse Products"}</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto py-4 pr-2">
              {items.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <FlavorBadge flavor={item.flavor} />
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground"
                          aria-label={cartDict.remove || "Remove item"}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-4 sm:flex-col">
              <div className="w-full">
                <div className="flex justify-between mb-2">
                  <span>{cartDict.subtotal || "Subtotal"}</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                  <span>{cartDict.shipping || "Shipping"}</span>
                  <span>{cartDict.calculatedAtCheckout || "Calculated at checkout"}</span>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between mb-6">
                  <span className="font-semibold">{cartDict.total || "Total"}</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid gap-2 w-full">
                <SheetClose asChild>
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90">
                    <Link href={`/${lang}/checkout`}>{cartDict.checkout || "Checkout"}</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="outline" asChild>
                    <Link href={`/${lang}/cart`}>{cartDict.viewCart || "View Cart"}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
