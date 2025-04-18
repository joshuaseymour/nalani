"use client"

import { ProductDetails } from "@/components/product-details"
import { MobileProductDetails } from "@/components/mobile-product-details"
import { useMobile } from "@/hooks/use-mobile"

type Props = {
  params: { lang: string; id: string }
  product: any
  dictionary: any
}

export default function ProductPageClient({ params, product, dictionary }: Props) {
  const isMobile = useMobile()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile view - hidden on desktop */}
      {isMobile && <MobileProductDetails product={product} dictionary={dictionary.productDetails} lang={params.lang} />}

      {/* Desktop view - hidden on mobile */}
      {!isMobile && <ProductDetails product={product} dictionary={dictionary.productDetails} lang={params.lang} />}
    </div>
  )
}
// This is a client component, so make sure there are no 'use server' directives here
// and all server actions are imported from separate files

// Ensure this component is properly receiving pre-fetched data as props
// rather than fetching data directly with server actions
