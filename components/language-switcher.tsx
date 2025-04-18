"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { i18n } from "@/lib/i18n-config"
import { useDictionary } from "@/hooks/use-dictionary"

interface LanguageSwitcherProps {
  lang: string
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { dictionary } = useDictionary(lang)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (locale: string) => {
    if (!pathname) return

    // Get the path without the language prefix
    const pathWithoutLang = pathname.replace(`/${lang}`, "")

    // Navigate to the same page but with the new language
    const newPath = `/${locale}${pathWithoutLang || ""}`
    router.push(newPath)
    setIsOpen(false)
  }

  const languageNames: Record<string, { name: string; nativeName: string }> = {
    en: { name: "English", nativeName: "English" },
    es: { name: "Spanish", nativeName: "Español" },
  }

  // If not mounted yet, render a simplified version to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Globe className="h-5 w-5" />
        <span className="sr-only">Switch language</span>
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative focus-ring rounded-full" aria-label="Switch language">
          <Globe className="h-5 w-5" />
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] flex items-center justify-center font-medium">
            {lang.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={`flex items-center justify-between ${locale === lang ? "bg-accent" : ""}`}
            onClick={() => handleLanguageChange(locale)}
          >
            <div>
              <span className="font-medium">{languageNames[locale]?.nativeName || locale}</span>
              {locale !== lang && (
                <span className="block text-xs text-muted-foreground">{languageNames[locale]?.name}</span>
              )}
            </div>
            {locale === lang && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
