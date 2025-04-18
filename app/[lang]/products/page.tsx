import { getDictionary } from "@/lib/dictionaries"
import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/products"
import type { Metadata } from "next"

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: `${dictionary.products?.title || "Products"} | Nalani's Lip Balm`,
    description: dictionary.products?.subtitle || "Explore our collection of natural lip balms",
  }
}

export default async function ProductsPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang)
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-fuchsia-700">{dictionary.products?.title || "Our Products"}</h1>
        <p className="text-lg text-muted-foreground">
          {dictionary.products?.subtitle || "Explore our collection of natural lip balms"}
        </p>
      </div>

      <ProductGrid products={products} lang={params.lang} />
    </div>
  )
}
