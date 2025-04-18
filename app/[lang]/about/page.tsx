import Image from "next/image"
import { getDictionary } from "@/lib/dictionaries"

export default async function AboutPage({
  params,
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-fuchsia-700">{dict.home.about.title}</h1>

        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Nalani making lip balm"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-fuchsia-600">{dict.home.about.title}</h2>
          <p className="mb-4">{dict.home.about.story}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="relative h-[250px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="Nalani with her sister Kaleah"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="Nalani's family ranch in Mexico"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8 text-fuchsia-600">Family Business</h2>
          <p className="mb-4">
            While I own 100% of my business, I get lots of help from my family! My little sister Kaleah (4.5 years old)
            is my official taste tester and helps me decide which flavors are the best. My mom Mayka teaches me
            traditional Mexican recipes and helps me make the lip balms at our family ranch in Mexico.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8 text-fuchsia-600">{dict.navigation.products}</h2>
          <p className="mb-4">{dict.home.about.mission}</p>

          <h2 className="text-2xl font-semibold mb-4 mt-8 text-fuchsia-600">{dict.productDetails.ingredients}</h2>
          <p className="mb-4">{dict.home.about.ingredients}</p>

          <ul className="list-disc pl-6 mb-8">
            <li>Organic beeswax from local Mexican beekeepers</li>
            <li>Shea butter</li>
            <li>Coconut oil</li>
            <li>Vitamin E</li>
            <li>Natural flavors and essential oils</li>
            <li>Mexican vanilla and chocolate for special flavors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
