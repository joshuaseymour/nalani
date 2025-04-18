"use client"

import { useState, useEffect } from "react"

// Define a type for the dictionary structure
export type Dictionary = {
  navigation?: {
    home?: string
    products?: string
    about?: string
    cart?: string
    checkout?: string
    language?: string
    menu?: string
    search?: string
    contact?: string
  }
  hero?: {
    title?: string
    subtitle?: string
    shopNow?: string
    learnMore?: string
    reviews?: string
    cta?: string
    titleHighlight?: string
    titleMain?: string
  }
  products?: {
    title?: string
    subtitle?: string
    viewAll?: string
    addToCart?: string
    toCart?: string
    outOfStock?: string
    new?: string
    bestSeller?: string
    save?: string
    stockLevel?: string
    limitedStock?: string
    limitedAvailability?: string
    description?: string
    freeShipping?: string
    sameDay?: string
    backToProducts?: string
    filters?: {
      all?: string
      flavor?: string
      price?: string
    }
    strawberry?: {
      name?: string
      description?: string
      price?: string
    }
    vanilla?: {
      name?: string
      description?: string
      price?: string
    }
    chocolate?: {
      name?: string
      description?: string
      price?: string
    }
  }
  cart?: {
    title?: string
    empty?: string
    checkout?: string
    total?: string
    remove?: string
    emptyCart?: string
    emptyCartMessage?: string
    continueShopping?: string
    itemRemoved?: string
    itemRemovedMessage?: string
    addMoreForFreeShipping?: string
    moreForFreeShipping?: string
    freeShippingThreshold?: string
    secureCheckout?: string
    free?: string
    orderSummary?: string
    subtotal?: string
    shipping?: string
    calculatedAtCheckout?: string
    clearCart?: string
    viewCart?: string
    yourCart?: string
    browseProducts?: string
    each?: string
    decreaseQuantity?: string
    increaseQuantity?: string
    summary?: string
    items?: string
  }
  checkout?: {
    title?: string
    contactInfo?: string
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    shippingAddress?: string
    address?: string
    city?: string
    postalCode?: string
    orderNotes?: string
    paymentMethod?: string
    cashOnDelivery?: string
    placeOrder?: string
    processing?: string
    orderSummary?: string
    subtotal?: string
    shipping?: string
    free?: string
    total?: string
    emptyCart?: string
    addItemsMessage?: string
    browseProducts?: string
    orderSuccess?: string
    orderSuccessMessage?: string
    backToCart?: string
    continueToShipping?: string
    continueToPayment?: string
    securePayment?: string
    securePaymentMessage?: string
    limitedTimeOffer?: string
    limitedTimeOfferMessage?: string
    creditCard?: string
    back?: string
    step?: string
    of?: string
  }
  footer?: {
    rights?: string
    privacy?: string
    terms?: string
    contact?: string
    tagline?: string
    about?: {
      title?: string
      description?: string
    }
    links?: {
      title?: string
      terms?: string
      privacy?: string
      contact?: string
    }
    newsletter?: {
      title?: string
      description?: string
      placeholder?: string
      button?: string
    }
    copyright?: string
  }
  error?: {
    title?: string
    message?: string
    tryAgain?: string
    backHome?: string
  }
  valueProposition?: {
    title?: string
    subtitle?: string
    natural?: {
      title?: string
      description?: string
    }
    handmade?: {
      title?: string
      description?: string
    }
    kidSafe?: {
      title?: string
      description?: string
    }
  }
  about?: {
    title?: string
    subtitle?: string
    description?: string
    button?: string
  }
  featured?: {
    title?: string
    description?: string
    shopNow?: string
    learnMore?: string
  }
  productDetails?: {
    features?: string
    ingredients?: string
    quantity?: string
    addToCart?: string
    added?: string
    addedToCart?: string
    addedToCartMessage?: string
    backToProducts?: string
    youMayAlsoLike?: string
  }
  testimonials?: {
    title?: string
    kaleah?: {
      name?: string
      role?: string
      quote?: string
    }
    mayka?: {
      name?: string
      role?: string
      quote?: string
    }
    jessica?: {
      name?: string
      role?: string
      quote?: string
    }
  }
  home?: {
    hero?: {
      title?: string
      subtitle?: string
      shopButton?: string
      learnButton?: string
    }
    featured?: string
    valueProps?: {
      natural?: string
      naturalDesc?: string
      handmade?: string
      handmadeDesc?: string
      safe?: string
      safeDesc?: string
    }
    banner?: {
      title?: string
      description?: string
      shopButton?: string
      learnButton?: string
    }
    about?: {
      title?: string
      story?: string
      mission?: string
      ingredients?: string
    }
    featuredProducts?: string
    featured1Title?: string
    featured1Description?: string
    featured2Title?: string
    featured2Description?: string
    featured3Title?: string
    featured3Description?: string
    discoverOurStory?: string
  }
  thankYou?: {
    title?: string
    message?: string
    orderNumber?: string
    estimatedDelivery?: string
    home?: string
    continueShopping?: string
  }
  language?: {
    switchLanguage?: string
    english?: string
    spanish?: string
  }
  accessibility?: {
    skipToContent?: string
    navigationMenu?: string
    closeMenu?: string
    openMenu?: string
  }
  theme?: {
    title?: string
    light?: string
    dark?: string
    system?: string
  }
  validation?: {
    required?: string
    email?: string
    minLength?: string
    maxLength?: string
    passwordMatch?: string
    firstName?: {
      required?: string
    }
    lastName?: {
      required?: string
    }
    email?: {
      required?: string
      invalid?: string
    }
    phone?: {
      required?: string
    }
    address?: {
      required?: string
    }
    city?: {
      required?: string
    }
    postalCode?: {
      required?: string
    }
  }
  common?: {
    apply?: string
    clear?: string
    back?: string
    loading?: string
    error?: string
    retry?: string
  }
  search?: {
    searchProducts?: string
    searchPlaceholder?: string
    voiceSearch?: string
    voiceNotSupported?: string
    results?: string
    noResults?: string
    tryDifferent?: string
    recentSearches?: string
    popular?: string
  }
  metadata?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  flavors?: {
    strawberry?: string
    vanilla?: string
    chocolate?: string
    mint?: string
    coconut?: string
    honey?: string
  }
  urgency?: {
    peopleViewing?: string
    inStock?: string
    almostGone?: string
    sellingFast?: string
  }
  siteDescription?: string
}

// Default English dictionary as fallback
const defaultDictionary: Dictionary = {
  navigation: {
    home: "Home",
    products: "Products",
    about: "About",
    cart: "Cart",
    checkout: "Checkout",
    language: "Language",
  },
  hero: {
    title: "Nalani's Lip Balm Collection",
    subtitle: "Handcrafted with natural ingredients",
    shopNow: "Shop Now",
    learnMore: "Learn More",
  },
  products: {
    title: "Our Products",
    viewAll: "View All",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
  },
  cart: {
    title: "Your Cart",
    empty: "Your cart is empty",
    checkout: "Proceed to Checkout",
    total: "Total",
    remove: "Remove",
  },
  footer: {
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  error: {
    title: "Something went wrong!",
    message: "An unexpected error has occurred.",
    tryAgain: "Try again",
    backHome: "Back to home",
  },
}

// Import dictionaries directly for client-side use
import en from "@/lib/dictionaries/en"
import es from "@/lib/dictionaries/es"

const clientDictionaries: Record<string, Dictionary> = {
  en,
  es,
}

export function useDictionary(locale: string) {
  const [dictionary, setDictionary] = useState<Dictionary>(defaultDictionary)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      setIsLoading(true)

      // Default to English if language is undefined
      const safeLocale = locale && (locale === "en" || locale === "es") ? locale : "en"

      // Get dictionary directly from our client-side dictionary map
      const dict = clientDictionaries[safeLocale] || clientDictionaries.en

      if (dict) {
        setDictionary(dict)
        setError(null)
      } else {
        // Fallback to English
        setDictionary(clientDictionaries.en || defaultDictionary)
        console.warn(`Dictionary for locale ${safeLocale} not found, using English fallback`)
      }
    } catch (err) {
      console.error("Failed to load dictionary:", err)
      setError(err instanceof Error ? err : new Error("Failed to load dictionary"))
      // Fallback to default dictionary
      setDictionary(defaultDictionary)
    } finally {
      setIsLoading(false)
    }
  }, [locale])

  return { dictionary, isLoading, error, lang: locale || "en" }
}
