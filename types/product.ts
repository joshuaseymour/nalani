export type Product = {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  originalPrice?: number
  discount?: string
  features?: string[]
  ingredients?: string
  image?: string
  color?: string
  isBestseller?: boolean
}
