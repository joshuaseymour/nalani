import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { FeaturedSection } from "@/components/featured-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutPreview } from "@/components/about-preview"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ValueProposition } from "@/components/value-proposition"
import { getDictionary } from "@/lib/dictionaries"
import { getProducts } from "@/lib/products"

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang)
  const products = await getProducts()

  const featuredProducts = products.filter((product) => product.featured)

  return (
    <div className="flex flex-col min-h-screen">
      <Hero lang={lang} dictionary={dictionary} />
      <ValueProposition lang={lang} dictionary={dictionary} />
      <FeaturedSection title={dictionary.featuredProducts} products={featuredProducts} lang={lang} />
      <ProductGrid products={products} title={dictionary.allProducts} lang={lang} />
      <TestimonialsSection lang={lang} dictionary={dictionary} />
      <AboutPreview lang={lang} dictionary={dictionary} />
      <NewsletterSignup lang={lang} dictionary={dictionary} />
    </div>
  )
}
