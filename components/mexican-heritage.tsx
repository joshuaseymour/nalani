import Image from "next/image"

export function MexicanHeritage() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
            Inspired by Mexican Heritage
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Nalani's lip balms are inspired by traditional Mexican recipes and ingredients from her family's ranch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-sm">
            <div className="h-48 relative mb-4 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Traditional Mexican ingredients"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">Traditional Ingredients</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Many ingredients in our lip balms come directly from Nalani's family ranch in Mexico, including organic
              beeswax and natural flavors.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-sm">
            <div className="h-48 relative mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=200&width=300" alt="Family recipes" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">Family Recipes</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Nalani's mom Mayka taught her traditional Mexican recipes that have been passed down through generations,
              which she now uses to create her lip balms.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-sm">
            <div className="h-48 relative mb-4 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Mexican chocolate"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-fuchsia-600 dark:text-fuchsia-400">Mexican Chocolate</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our Mexican Chocolate lip balm is inspired by traditional Mexican hot chocolate, with hints of cinnamon
              and rich cacao.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
