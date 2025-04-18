import { getDictionary } from "@/lib/dictionaries"
import { EnhancedCheckoutForm } from "@/components/enhanced-checkout-form"
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema"
import type { Metadata } from "next"

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: `${dictionary.checkout.title} | Nalani's Lip Balm`,
    description: dictionary.checkout.description,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function CheckoutPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nalani-lip-balm.vercel.app"

  // Breadcrumb items
  const breadcrumbItems = [
    {
      name: dictionary.navigation.home,
      url: `${baseUrl}/${params.lang}`,
    },
    {
      name: dictionary.navigation.cart,
      url: `${baseUrl}/${params.lang}/cart`,
    },
    {
      name: dictionary.checkout.title,
      url: `${baseUrl}/${params.lang}/checkout`,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{dictionary.checkout.title}</h1>
      <EnhancedCheckoutForm dictionary={dictionary.checkout} lang={params.lang} />

      {/* Structured data for breadcrumbs */}
      <BreadcrumbSchema items={breadcrumbItems} />
    </div>
  )
}
