import { getDictionary } from "@/lib/dictionaries"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export async function FeaturedSection({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-90"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict?.featured?.title || "Experience the Magic of Natural Lip Care"}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {dict?.featured?.description ||
              "Our lip balms are made with love and care, using only the finest natural ingredients. Try all three flavors today!"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700">
              <Link href={`/${lang}/products`}>
                {dict?.featured?.shopNow || "Shop Now"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link href={`/${lang}/about`}>{dict?.featured?.learnMore || "Learn More"}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white opacity-10"></div>
    </section>
  )
}
