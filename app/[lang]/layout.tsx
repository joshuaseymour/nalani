import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/[lang]/globals.css"
import { LayoutWrapper } from "./layout-wrapper"
import { getDictionary } from "@/lib/dictionaries"
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: {
      default: "Nalani's Lip Balm",
      template: "%s | Nalani's Lip Balm",
    },
    description: dictionary.siteDescription,
    keywords: ["lip balm", "natural", "handmade", "organic", "Nalani"],
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <LayoutWrapper lang={params.lang}>{children}</LayoutWrapper>
        <ToastProvider />
      </body>
    </html>
  )
}
