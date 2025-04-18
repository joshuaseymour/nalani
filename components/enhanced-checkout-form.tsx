"use client"

import { CheckoutForm } from "@/components/checkout-form"

export function EnhancedCheckoutForm({
  lang,
  dictionary,
}: {
  lang: string
  dictionary: any
}) {
  return <CheckoutForm lang={lang} dictionary={dictionary} />
}
