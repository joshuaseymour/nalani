import type { MetadataRoute } from "next"
import { i18n } from "@/lib/i18n-config"

// In a real app, you would fetch this from your database or CMS
const routes = ["/", "/products", "/about", "/cart", "/checkout", "/thank-you"]

// Sample product IDs - in a real app, these would come from your database
const productIds = ["strawberry-dream", "vanilla-delight", "mexican-chocolate"]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nalani-lip-balm.vercel.app"
  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap entries for each locale and route
  i18n.locales.forEach((locale) => {
    // Add main routes
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "/" ? 1.0 : 0.8,
      })
    })

    // Add product routes
    productIds.forEach((id) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/products/${id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      })
    })
  })

  return sitemap
}
