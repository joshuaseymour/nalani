"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/dictionaries"

interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  avatar: string
  rating: number
}

export function TestimonialsCarousel({ lang }: { lang: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const dictionary = await getDictionary(lang)
        setDict(dictionary)

        // Create testimonials based on dictionary data
        const testimonialsData = [
          {
            id: 1,
            name: dictionary?.testimonials?.kaleah?.name || "Kaleah",
            role: dictionary?.testimonials?.kaleah?.role || "Nalani's little sister",
            quote:
              dictionary?.testimonials?.kaleah?.quote ||
              "I love my sister's lip balms! The strawberry one is my favorite.",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 5,
          },
          {
            id: 2,
            name: dictionary?.testimonials?.mayka?.name || "Mayka",
            role: dictionary?.testimonials?.mayka?.role || "Nalani's mom",
            quote:
              dictionary?.testimonials?.mayka?.quote ||
              "I'm so proud of Nalani for creating these amazing lip balms. They're better than anything you can buy in stores!",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 5,
          },
          {
            id: 3,
            name: dictionary?.testimonials?.jessica?.name || "Jessica K.",
            role: dictionary?.testimonials?.jessica?.role || "Customer",
            quote:
              dictionary?.testimonials?.jessica?.quote ||
              "These lip balms are amazing! My lips have never felt so soft and moisturized. I love supporting young entrepreneurs too!",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 5,
          },
        ]

        setTestimonials(testimonialsData)
      } catch (error) {
        console.error("Error fetching dictionary:", error)
      }
    }

    fetchDictionary()
  }, [lang])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  if (!dict || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
            {dict?.testimonials?.title || "What Our Customers Say"}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-8 rounded-2xl shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden relative mb-4">
                    <Image
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-xl italic mb-6 text-gray-700 dark:text-gray-300">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
