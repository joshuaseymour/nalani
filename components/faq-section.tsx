"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getDictionary } from "@/lib/dictionaries"

export function FaqSection({ lang }: { lang: string }) {
  const [dict, setDict] = useState<any>(null)

  useState(() => {
    const fetchDictionary = async () => {
      try {
        const dictionary = await getDictionary(lang)
        setDict(dictionary)
      } catch (error) {
        console.error("Error fetching dictionary:", error)
      }
    }

    fetchDictionary()
  })

  const faqs = [
    {
      question: "What ingredients are in Nalani's lip balms?",
      answer:
        "All of Nalani's lip balms are made with organic beeswax, shea butter, coconut oil, vitamin E, and natural flavors. Many ingredients come directly from her family's ranch in Mexico. There are no artificial colors or preservatives.",
    },
    {
      question: "Are these lip balms safe for kids?",
      answer:
        "Yes! Nalani's lip balms are made with all-natural ingredients that are safe for everyone, including kids. Nalani's little sister Kaleah (4.5 years old) helps test all the flavors to make sure they're kid-approved!",
    },
    {
      question: "How long does shipping take?",
      answer:
        "We typically ship orders within 1-2 business days. Delivery times vary depending on your location, but most orders arrive within 3-5 business days.",
    },
    {
      question: "Can I return my lip balm if I'm not satisfied?",
      answer:
        "We want you to be completely happy with your purchase! If you're not satisfied with your lip balm for any reason, please contact us within 14 days of receiving your order for a full refund or exchange.",
    },
    {
      question: "How did Nalani start making lip balms?",
      answer:
        "Nalani started making lip balms when she was just 6 years old! She learned traditional recipes from her mom Mayka, who is from Mexico. Nalani loves creating things that make people happy, and she noticed that everyone needs soft, moisturized lips!",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have questions about Nalani's lip balms? We've got answers!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
