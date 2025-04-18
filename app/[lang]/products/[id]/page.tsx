import { getProductById } from "@/lib/products"
import { getDictionary } from "@/lib/dictionaries"
import type { Metadata } from "next"
import ProductPageClient from "./ProductPageClient"
import { notFound } from "next/navigation"

type Props = {
  params: { lang: string; id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id)
  const dictionary = await getDictionary(params.lang)

  if (!product) {
    return {
      title: "Product Not Found | Nalani's Lip Balm",
    }
  }

  return {
    title: `${product.name} | Nalani's Lip Balm`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = getProductById(params.id)
  const dictionary = await getDictionary(params.lang)

  if (!product) {
    notFound()
  }

  return <ProductPageClient params={params} product={product} dictionary={dictionary} />
}
