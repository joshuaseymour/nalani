export interface Product {
  id: string
  name: string
  price: number
  description: string
  fullDescription?: string
  image: string
  flavor: string
  ingredients?: string
  features?: string[]
  new?: boolean
  bestSeller?: boolean
  featured?: boolean
}

const products: Product[] = [
  {
    id: "strawberry-dream",
    name: "Strawberry Dream",
    price: 4.99,
    description: "Sweet strawberry flavor for happy lips",
    fullDescription:
      "This sweet strawberry lip balm will make your lips feel soft and smell delicious! Made with organic beeswax, shea butter, coconut oil, and natural strawberry flavor. My little sister Kaleah says this is her favorite!",
    image: "/placeholder.svg?height=400&width=400",
    flavor: "strawberry",
    ingredients: "Organic beeswax, shea butter, coconut oil, vitamin E, natural strawberry flavor",
    features: ["Long-lasting moisture", "Sweet strawberry scent", "All natural ingredients", "Kid-friendly formula"],
    bestSeller: true,
    featured: true,
  },
  {
    id: "vanilla-delight",
    name: "Vanilla Delight",
    price: 4.99,
    description: "Smooth vanilla flavor for cozy comfort",
    fullDescription:
      "A warm and comforting vanilla lip balm that keeps your lips soft all day long. Made with organic beeswax, shea butter, coconut oil, and natural vanilla flavor from Mexican vanilla beans grown near our ranch.",
    image: "/placeholder.svg?height=400&width=400",
    flavor: "vanilla",
    ingredients: "Organic beeswax, shea butter, coconut oil, vitamin E, natural Mexican vanilla extract",
    features: ["Long-lasting moisture", "Warm vanilla scent", "All natural ingredients", "Kid-friendly formula"],
    featured: true,
  },
  {
    id: "mexican-chocolate",
    name: "Mexican Chocolate",
    price: 4.99,
    description: "Rich chocolate with a hint of cinnamon",
    fullDescription:
      "A delicious chocolate lip balm with a hint of cinnamon inspired by traditional Mexican hot chocolate. This special recipe was created with help from my mom Mayka using traditional Mexican chocolate.",
    image: "/placeholder.svg?height=400&width=400",
    flavor: "chocolate",
    ingredients:
      "Organic beeswax, shea butter, cocoa butter, coconut oil, vitamin E, natural chocolate and cinnamon flavors",
    features: [
      "Long-lasting moisture",
      "Rich chocolate scent with cinnamon",
      "All natural ingredients",
      "Kid-friendly formula",
    ],
    bestSeller: true,
    featured: true,
  },
  {
    id: "honey-mint",
    name: "Honey Mint",
    price: 5.49,
    description: "Refreshing mint with sweet honey",
    fullDescription:
      "A refreshing mint lip balm with sweet honey from our family ranch in Mexico. This lip balm will leave your lips feeling cool and moisturized all day long.",
    image: "/placeholder.svg?height=400&width=400",
    flavor: "mint",
    ingredients: "Organic beeswax, shea butter, coconut oil, honey, vitamin E, natural mint flavor",
    features: ["Long-lasting moisture", "Cooling mint sensation", "All natural ingredients", "Kid-friendly formula"],
    new: true,
  },
  {
    id: "coconut-dream",
    name: "Coconut Dream",
    price: 4.99,
    description: "Tropical coconut for vacation vibes",
    fullDescription:
      "Transport yourself to a tropical paradise with this coconut lip balm. Made with real coconut oil and natural coconut flavor for a vacation vibe wherever you are.",
    image: "/placeholder.svg?height=400&width=400",
    flavor: "coconut",
    ingredients: "Organic beeswax, shea butter, coconut oil, vitamin E, natural coconut flavor",
    features: ["Long-lasting moisture", "Tropical coconut scent", "All natural ingredients", "Kid-friendly formula"],
  },
  {
    id: "honey-sunshine",
    name: "Honey Sunshine",
    price: 5.49,
    description: "Pure honey goodness for your lips",
    fullDescription:
      "Made with pure honey from our family ranch in Mexico, this lip balm will keep your lips soft and nourished with natural goodness.",
    image: "/placeholder.svg?height=400&width=400",
    flavor: "honey",
    ingredients: "Organic beeswax, shea butter, coconut oil, honey, vitamin E",
    features: ["Long-lasting moisture", "Sweet honey scent", "All natural ingredients", "Kid-friendly formula"],
    new: true,
  },
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.new)
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.bestSeller)
}
