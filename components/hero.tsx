import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export async function Hero({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Background gradient - ensure it's behind everything with -z-10 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 -z-10"></div>

      {/* Decorative elements - all with negative z-index */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-pink-200 dark:bg-pink-800/30 blur-xl opacity-60 animate-pulse -z-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-purple-200 dark:bg-purple-800/30 blur-xl opacity-60 animate-pulse delay-700 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-pink-200/50 to-purple-200/50 dark:from-pink-900/20 dark:to-purple-900/20 blur-3xl -z-10"></div>

      {/* Main content container - ensure it has a positive z-index */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {dict?.hero?.reviews || "5-star reviews"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="gradient-text">{dict?.hero?.titleHighlight || "Handcrafted"}</span>
              <br />
              <span className="text-gray-900 dark:text-white">{dict?.hero?.titleMain || "Natural Lip Balms"}</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              {dict?.hero?.subtitle ||
                "Made with love by 7-year-old Nalani, using natural ingredients from her family's ranch in Mexico"}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="gradient-primary hover:opacity-90 transition-opacity rounded-full px-8"
              >
                <Link href={`/${lang}/products`}>
                  {dict?.hero?.shopNow || "Shop Now"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href={`/${lang}/about`}>{dict?.hero?.learnMore || "Learn More"}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">100% Natural</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Kid-Approved</span>
              </div>
            </div>
          </div>

          {/* Product image section - also with positive z-index */}
          <div className="md:w-1/2 relative z-10">
            <div className="relative h-[300px] md:h-[400px] w-full md:w-[400px] mx-auto">
              {/* Main product image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-48 md:h-64 md:w-64 animate-float">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-2xl opacity-30"></div>
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Nalani's Lip Balm"
                    width={300}
                    height={300}
                    className="relative z-10 object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Floating product elements */}
              <div className="absolute top-10 right-10 animate-float-slow">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-pink-100 dark:bg-pink-900/50 shadow-lg flex items-center justify-center">
                  <span className="font-bold text-sm md:text-base text-pink-600 dark:text-pink-400">Strawberry</span>
                </div>
              </div>

              <div className="absolute bottom-20 left-10 animate-float-delay">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-purple-100 dark:bg-purple-900/50 shadow-lg flex items-center justify-center">
                  <span className="font-bold text-sm md:text-base text-purple-600 dark:text-purple-400">Vanilla</span>
                </div>
              </div>

              <div className="absolute bottom-40 right-20 animate-float-slow-delay">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-amber-100 dark:bg-amber-900/50 shadow-lg flex items-center justify-center">
                  <span className="font-bold text-sm md:text-base text-amber-600 dark:text-amber-400">Chocolate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
