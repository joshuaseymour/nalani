import { CheckCircle } from "lucide-react"

export function ProductFeatures() {
  const features = [
    "100% Natural Ingredients",
    "Handmade with Love",
    "Kid-Tested & Approved",
    "Mexican-Inspired Flavors",
    "Moisturizing Formula",
    "No Artificial Colors",
    "No Preservatives",
    "Eco-Friendly Packaging",
  ]

  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
            What Makes Our Lip Balms Special
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Every lip balm is handcrafted by Nalani using traditional recipes and natural ingredients
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex items-start gap-3 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800 dark:text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
