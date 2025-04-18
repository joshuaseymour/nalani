"use client"

import { useCart } from "@/hooks/use-cart"
import { motion, AnimatePresence } from "framer-motion"

export function CartCount() {
  const { itemCount } = useCart()

  return (
    <AnimatePresence mode="wait">
      {itemCount > 0 && (
        <motion.span
          key="cart-count"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
        >
          {itemCount}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
