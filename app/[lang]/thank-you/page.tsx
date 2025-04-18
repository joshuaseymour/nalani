"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDictionary } from "@/hooks/use-dictionary"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ThankYouPage({
  params,
}: {
  params: { lang: string }
}) {
  const { dictionary, isLoading } = useDictionary(params.lang)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before checking sessionStorage
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    if (mounted) {
      const hasCompletedCheckout = sessionStorage.getItem("checkoutComplete")
      if (!hasCompletedCheckout) {
        router.push(`/${params.lang}`)
      }
    }
  }, [router, params.lang, mounted])

  if (isLoading || !mounted) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <Skeleton className="h-20 w-20 rounded-full mx-auto mb-6" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-40 w-full mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    )
  }

  const thankYouDict = dictionary?.thankYou || {}
  const navDict = dictionary?.navigation || {}

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gradient-primary p-3">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 gradient-text">{thankYouDict.title || "Thank you for your order!"}</h1>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <p className="text-muted-foreground mb-6">
            {thankYouDict.message || "Your order has been received and is being processed."}
          </p>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{thankYouDict.orderNumber || "Order number"}:</span>
              <span className="font-medium">#NAL-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {thankYouDict.estimatedDelivery || "Estimated delivery"}:
              </span>
              <span className="font-medium">3-5 business days</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${params.lang}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              {thankYouDict.home || navDict.home || "Home"}
            </Button>
          </Link>
          <Link href={`/${params.lang}/products`}>
            <Button className="w-full sm:w-auto bg-gradient-primary hover:opacity-90">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {thankYouDict.continueShopping || "Continue Shopping"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
