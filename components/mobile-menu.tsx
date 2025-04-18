"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useDictionary } from "@/hooks/use-dictionary"

interface MobileMenuProps {
  lang: string
}

export function MobileMenu({ lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { dictionary, isLoading } = useDictionary(lang)

  useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, render a simplified version to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>
    )
  }

  const navDict = dictionary?.navigation || {}
  const accessDict = dictionary?.accessibility || {}

  const menuItems = [
    { href: `/${lang}`, label: navDict.home || "Home" },
    { href: `/${lang}/products`, label: navDict.products || "Products" },
    { href: `/${lang}/about`, label: navDict.about || "About" },
    { href: `/${lang}/cart`, label: navDict.cart || "Cart" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{accessDict.openMenu || "Open menu"}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle>
            <Link
              href={`/${lang}`}
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
              onClick={() => setIsOpen(false)}
            >
              Nalani's
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                <Separator className="mt-3" />
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-4">© {new Date().getFullYear()} Nalani's Lip Balm</p>
          <div className="flex space-x-4">
            <Link
              href={`/${lang}/privacy`}
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {dictionary?.footer?.privacy || "Privacy"}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {dictionary?.footer?.terms || "Terms"}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
