import { getDictionary } from "@/lib/dictionaries"
import { Leaf, Heart, Shield } from "lucide-react"

export async function ValueProposition({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: dict?.valueProposition?.natural?.title || "100% Natural",
      description:
        dict?.valueProposition?.natural?.description || "Made with organic ingredients from our family ranch in Mexico",
    },
    {
      icon: <Heart className="h-10 w-10 text-pink-600" />,
      title: dict?.valueProposition?.handmade?.title || "Handmade with Love",
      description: dict?.valueProposition?.handmade?.description || "Each lip balm is crafted by Nalani with care",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-600" />,
      title: dict?.valueProposition?.kidSafe?.title || "Kid-Safe Formula",
      description:
        dict?.valueProposition?.kidSafe?.description ||
        "Gentle ingredients safe for everyone, tested by Nalani's sister",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">{dict?.valueProposition?.title || "Why Choose Nalani's Lip Balm?"}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {dict?.valueProposition?.subtitle ||
            "Our lip balms are made with love and care, using only the finest natural ingredients"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
