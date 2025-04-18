"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, CreditCard, ShieldCheck, Clock } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export function CheckoutForm({
  lang,
  dictionary,
}: {
  lang: string
  dictionary: any
}) {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: "card",
  })
  const isMobile = useMobile()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  // Free shipping threshold
  const freeShippingThreshold = 15
  const shipping = subtotal >= freeShippingThreshold ? 0 : 4.99
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: dictionary?.validation?.firstName?.required || "Missing information",
        description: dictionary?.validation?.required || "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: dictionary?.validation?.email?.invalid || "Invalid email",
        description: dictionary?.validation?.email?.invalid || "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      try {
        // Set checkout complete flag for thank you page
        if (typeof window !== "undefined") {
          sessionStorage.setItem("checkoutComplete", "true")
        }

        clearCart()
        toast({
          title: dictionary?.orderSuccess || "Order placed successfully!",
          description:
            dictionary?.orderSuccessMessage ||
            "Thank you for your purchase. We'll send you a confirmation email shortly.",
        })
        router.push(`/${lang}/thank-you`)
      } catch (error) {
        console.error("Error processing order:", error)
        toast({
          title: dictionary?.error || "Error",
          description: dictionary?.common?.error || "There was a problem processing your order. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }, 1500)
  }

  // Define flavor-specific styles
  const flavorStyles = {
    strawberry: {
      gradient: "from-pink-100 to-fuchsia-50",
      border: "border-strawberry/30",
    },
    vanilla: {
      gradient: "from-amber-50 to-yellow-50",
      border: "border-vanilla/30",
    },
    chocolate: {
      gradient: "from-amber-100 to-amber-50",
      border: "border-chocolate/30",
    },
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 md:py-24">
        <div className="flex justify-center mb-8">
          <div className="p-8 rounded-full bg-gray-100">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">{dictionary?.emptyCart || "Your cart is empty"}</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {dictionary?.addItemsMessage || "Add some items to your cart before checkout"}
        </p>
        <Link href={`/${lang}/products`}>
          <Button className="bg-gradient-primary hover:opacity-90 px-8 py-6 text-lg">
            {dictionary?.browseProducts || "Browse Products"}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{dictionary?.title || "Checkout"}</h2>
          <div className="text-sm text-muted-foreground">
            {dictionary?.step || "Step"} {checkoutStep} {dictionary?.of || "of"} 3
          </div>
        </div>
        <Progress
          value={(checkoutStep / 3) * 100}
          className="h-2 bg-purple-100"
          indicatorClassName="bg-gradient-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <AnimatePresence mode="wait">
            {checkoutStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">{dictionary?.contactInfo || "Contact Information"}</h2>
                <form className="space-y-6">
                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-6"}>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{dictionary?.firstName || "First Name"}</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        aria-label={dictionary?.firstName || "First Name"}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{dictionary?.lastName || "Last Name"}</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        aria-label={dictionary?.lastName || "Last Name"}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{dictionary?.email || "Email"}</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-label={dictionary?.email || "Email"}
                      inputMode="email"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{dictionary?.phone || "Phone"}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-label={dictionary?.phone || "Phone"}
                      inputMode="tel"
                      className="h-12"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setCheckoutStep(2)}
                      className="bg-gradient-primary hover:opacity-90 w-full md:w-auto py-6 px-8 text-lg"
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                    >
                      {dictionary?.continueToShipping || "Continue to Shipping"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {checkoutStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">{dictionary?.shippingAddress || "Shipping Address"}</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">{dictionary?.address || "Address"}</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      aria-label={dictionary?.address || "Address"}
                      className="h-12"
                    />
                  </div>

                  <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-6"}>
                    <div className="space-y-2">
                      <Label htmlFor="city">{dictionary?.city || "City"}</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        aria-label={dictionary?.city || "City"}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{dictionary?.postalCode || "Postal Code"}</Label>
                      <Input
                        id="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        aria-label={dictionary?.postalCode || "Postal Code"}
                        inputMode="numeric"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">{dictionary?.orderNotes || "Order Notes (Optional)"}</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      aria-label={dictionary?.orderNotes || "Order Notes (Optional)"}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                    <Button variant="outline" onClick={() => setCheckoutStep(1)} className="py-6">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {dictionary?.back || "Back"}
                    </Button>
                    <Button
                      onClick={() => setCheckoutStep(3)}
                      className="bg-gradient-primary hover:opacity-90 py-6 px-8 text-lg"
                      disabled={!formData.address || !formData.city || !formData.postalCode}
                    >
                      {dictionary?.continueToPayment || "Continue to Payment"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {checkoutStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">{dictionary?.paymentMethod || "Payment Method"}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <RadioGroup
                      defaultValue="card"
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                    >
                      <div className="flex items-center space-x-2 border-2 rounded-lg p-4 cursor-pointer hover:bg-gray-50 border-purple-100">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                          {dictionary?.creditCard || "Credit / Debit Card"}
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 border-2 rounded-lg p-4 cursor-pointer hover:bg-gray-50 border-purple-100">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          {dictionary?.cashOnDelivery || "Cash on Delivery"}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div className="text-sm text-purple-800">
                      <p className="font-medium">{dictionary?.securePayment || "Secure Payment"}</p>
                      <p>{dictionary?.securePaymentMessage || "Your payment information is processed securely."}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">{dictionary?.limitedTimeOffer || "Limited Time Offer"}</p>
                      <p>
                        {dictionary?.limitedTimeOfferMessage ||
                          "Free shipping on orders over $15. Order now to take advantage of this special offer!"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                    <Button variant="outline" onClick={() => setCheckoutStep(2)} className="py-6">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {dictionary?.back || "Back"}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-primary hover:opacity-90 py-6 px-8 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {dictionary?.processing || "Processing..."}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          {dictionary?.placeOrder || "Place Order"}
                          <Check className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-lg border-2 shadow-sm bg-white lg:sticky lg:top-20 border-purple-100/50 h-fit">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6">{dictionary?.orderSummary || "Order Summary"}</h2>

            <Tabs defaultValue="items" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="items" className="flex-1">
                  {dictionary?.items || "Items"} ({items.length})
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex-1">
                  {dictionary?.summary || "Summary"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="space-y-4">
                <div className="max-h-[300px] overflow-y-auto pr-2 divide-y">
                  {items.map((item) => {
                    const style = flavorStyles[item.color as keyof typeof flavorStyles] || flavorStyles.strawberry

                    return (
                      <div key={item.id} className="py-4 flex items-center gap-4">
                        <div
                          className={`relative h-16 w-16 rounded-md overflow-hidden border flex-shrink-0 ${style.border} bg-gradient-to-b ${style.gradient}`}
                        >
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
                          />
                          <div className="absolute top-0 right-0 bg-white/80 rounded-bl-md px-1 text-xs font-medium">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{dictionary?.subtotal || "Subtotal"}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{dictionary?.shipping || "Shipping"}</span>
                    <span>{shipping === 0 ? dictionary?.free || "Free" : `${shipping.toFixed(2)}`}</span>
                  </div>

                  {subtotal < freeShippingThreshold && (
                    <div className="bg-purple-50 rounded-lg p-4 text-xs text-purple-800">
                      {dictionary?.addMoreForFreeShipping || "Add"} ${(freeShippingThreshold - subtotal).toFixed(2)}{" "}
                      {dictionary?.moreForFreeShipping || "more for free shipping"}
                    </div>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>{dictionary?.total || "Total"}</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
