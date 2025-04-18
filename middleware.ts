import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "./lib/i18n-config"
import Negotiator from "negotiator"

// Get the preferred locale from the request headers
function getLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator to get the preferred locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Find the first locale that matches our supported locales
  const locale = languages.find(
    (language) =>
      i18n.locales.includes(language as any) ||
      i18n.locales.some((supportedLocale) => language.toLowerCase().startsWith(supportedLocale.toLowerCase())),
  )

  // If we found a match, return the exact supported locale
  if (locale) {
    const exactMatch = i18n.locales.find((supportedLocale) => locale.toLowerCase() === supportedLocale.toLowerCase())

    if (exactMatch) return exactMatch

    // If no exact match, find the best partial match
    const partialMatch = i18n.locales.find((supportedLocale) =>
      locale.toLowerCase().startsWith(supportedLocale.toLowerCase()),
    )

    if (partialMatch) return partialMatch
  }

  return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // If it's missing a locale, redirect to the preferred locale
  if (pathnameIsMissingLocale) {
    // Get the preferred locale
    const locale = getLocale(request)

    // Create the new URL with the preferred locale
    const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)

    // Preserve the search params
    newUrl.search = request.nextUrl.search

    return NextResponse.redirect(newUrl)
  }
}

export const config = {
  // Match all request paths except for:
  // - API routes (/api/*)
  // - Static files (/_next/*)
  // - Public files (/public/*)
  // - Favicon.ico
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
}
