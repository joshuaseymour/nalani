import { getDictionary } from "@/lib/dictionaries"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"

export async function Footer({ lang }: { lang: string }) {
  const dict = await getDictionary(lang)
  const footerDict = dict?.footer || {}
  const navDict = dict?.navigation || {}

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-16 md:mt-24">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-bold mb-4 gradient-text">Nalani's Lip Balm</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {footerDict.tagline || "Handcrafted lip balms with natural ingredients"}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 focus-ring rounded-full p-1"
                aria-label="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.455 2.525c.636-.247 1.363-.416 2.427-.465C9.906 2.013 10.26 2 12.69 2h.63z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-500 focus-ring rounded-full p-1"
                aria-label="Twitter"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{footerDict.links?.title || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  {navDict.home || "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/products`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  {navDict.products || "Products"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  {navDict.about || "About"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  {footerDict.contact || "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{footerDict.newsletter?.title || "Stay Updated"}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {footerDict.newsletter?.description || "Subscribe to get updates on new products and special offers!"}
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={footerDict.newsletter?.placeholder || "Your email"}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:opacity-90"
              >
                {footerDict.newsletter?.button || "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nalani's Lip Balm. {footerDict.rights || "All rights reserved."}
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href={`/${lang}/privacy`}
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-gray-200"
            >
              {footerDict.privacy || "Privacy Policy"}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-gray-200"
            >
              {footerDict.terms || "Terms of Service"}
            </Link>
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm mr-2">
                {dict?.language?.switchLanguage || "Language"}:
              </span>
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
