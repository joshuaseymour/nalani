import Image from "next/image"
import { getDictionary } from "@/lib/dictionaries"

export async function NalaniStory({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
            Meet Nalani
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            The 7-year-old entrepreneur behind these amazing lip balms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Nalani making lip balm"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">My Story</h3>
              <p className="text-gray-700 dark:text-gray-300">
                ¡Hola! I'm Nalani and I'm 7 years old. I'm Mexican-American - my mom Mayka is from Mexico and my dad is
                American. I started making lip balms at our family ranch in Mexico because I love creating things that
                make people happy!
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-pink-600 dark:text-pink-400">My Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                My mission is to create natural lip balms that are good for your lips and the environment. I use only
                natural ingredients that are safe for everyone. My little sister Kaleah (4.5 years old) helps me test
                the flavors!
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-fuchsia-600 dark:text-fuchsia-400">My Ingredients</h3>
              <p className="text-gray-700 dark:text-gray-300">
                All my lip balms are made with organic beeswax, shea butter, coconut oil, and natural flavors. Many
                ingredients come right from our family ranch in Mexico. No artificial colors or preservatives!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
