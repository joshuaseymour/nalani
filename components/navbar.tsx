import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ShoppingCart } from "@/components/shopping-cart"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartCount } from "@/components/cart-count"

export async function Navbar({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">Nalani's</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-md px-2 py-1"
            >
              {dict?.navigation?.home || "Home"}
            </Link>
            <Link
              href={`/${lang}/products`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-md px-2 py-1"
            >
              {dict?.navigation?.products || "Products"}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-md px-2 py-1"
            >
              {dict?.navigation?.about || "About"}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          <LanguageSwitcher lang={lang} />
          <div className="relative">
            <ShoppingCart lang={lang} />
            <CartCount />
          </div>
          <MobileMenu lang={lang} />
        </div>
      </div>
    </header>
  )
}
