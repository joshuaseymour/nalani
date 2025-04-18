import type { Metadata } from "next"
import { i18n } from "@/lib/i18n-config"

type SeoProps = {
  title: string
  description: string
  path: string
  locale: string
  ogImage?: string
}

export function generateSeoMetadata({
  title,
  description,
  path,
  locale,
  ogImage = "/og-image.jpg",
}: SeoProps): Metadata {
  // Base URL for production (would be set from environment variable in real app)
  const baseUrl = "https://nalani-lip-balm.vercel.app"

  // Canonical URL
  const url = `${baseUrl}/${locale}${path}`

  // Alternate language URLs
  const alternates = {
    canonical: url,
    languages: {} as Record<string, string>,
  }

  // Generate alternate URLs for each locale
  i18n.locales.forEach((loc) => {
    alternates.languages[loc] = `${baseUrl}/${loc}${path}`
  })

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: "Nalani's Lip Balm",
      locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${ogImage}`],
    },
  }
}
