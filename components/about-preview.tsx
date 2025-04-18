import { getDictionary } from "@/lib/dictionaries"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export async function AboutPreview({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"></div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Nalani making lip balm"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">{dict?.about?.title || "Meet Nalani"}</h2>
          <h3 className="text-xl text-muted-foreground mb-6">
            {dict?.about?.subtitle || "The 7-year-old entrepreneur behind the lip balms"}
          </h3>

          <p className="mb-6 text-muted-foreground">
            {dict?.about?.description ||
              "Nalani started making lip balms when she was just 6 years old, using recipes passed down from her grandmother in Mexico. She's passionate about creating natural products that everyone can enjoy."}
          </p>

          <Button asChild>
            <Link href={`/${lang}/about`}>{dict?.about?.button || "Discover Our Story"}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
