import type { Locale } from "./i18n-config"

// Import dictionaries
import en from "./dictionaries/en"
import es from "./dictionaries/es"

// Dictionary type
export type Dictionary = typeof en

// Dictionary map
const dictionaries = {
  en,
  es,
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  // Validate locale
  const validLocale = (Object.keys(dictionaries).includes(locale) ? locale : "en") as Locale

  return dictionaries[validLocale]
}
