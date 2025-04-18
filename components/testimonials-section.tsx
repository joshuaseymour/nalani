import { getDictionary } from "@/lib/dictionaries"
import Image from "next/image"
import { Star } from "lucide-react"

export async function TestimonialsSection({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  const testimonials = [
    {
      name: dict?.testimonials?.kaleah?.name || "Kaleah",
      role: dict?.testimonials?.kaleah?.role || "Nalani's little sister",
      quote: dict?.testimonials?.kaleah?.quote || "I love my sister's lip balms! The strawberry one is my favorite.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: dict?.testimonials?.mayka?.name || "Mayka",
      role: dict?.testimonials?.mayka?.role || "Nalani's mom",
      quote:
        dict?.testimonials?.mayka?.quote ||
        "I'm so proud of Nalani for creating these amazing lip balms. They're better than anything you can buy in stores!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: dict?.testimonials?.jessica?.name || "Jessica K.",
      role: dict?.testimonials?.jessica?.role || "Customer",
      quote:
        dict?.testimonials?.jessica?.quote ||
        "These lip balms are amazing! My lips have never felt so soft and moisturized. I love supporting young entrepreneurs too!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">{dict?.testimonials?.title || "What Our Customers Say"}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>

            <blockquote className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</blockquote>
          </div>
        ))}
      </div>
    </section>
  )
}
