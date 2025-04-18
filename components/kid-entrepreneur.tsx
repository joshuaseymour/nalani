import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function KidEntrepreneur({ lang }: { lang: string }) {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
              Young Entrepreneur with Big Dreams
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              At just 7 years old, Nalani is already running her own lip balm business! She started making lip balms
              because she wanted to create something that makes people happy and helps them take care of their lips.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              With help from her mom Mayka and her little sister Kaleah as her official taste-tester, Nalani creates
              each lip balm by hand with love and care.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              When you buy Nalani's lip balms, you're supporting a young girl's dream and getting an amazing product
              made with natural ingredients!
            </p>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90">
              <Link href={`/${lang}/about`}>Learn More About Nalani</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 relative h-[400px]">
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform -rotate-3"></div>
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Nalani making lip balm"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
