import type React from "react"
import { Badge } from "@/components/ui/badge"
import { CherryIcon as Strawberry, IceCream, Cookie, Leaf, BananaIcon as Coconut, Candy } from "lucide-react"

// Define static flavor labels
const flavorLabels = {
  en: {
    strawberry: "Strawberry",
    vanilla: "Vanilla",
    chocolate: "Chocolate",
    mint: "Mint",
    coconut: "Coconut",
    honey: "Honey",
  },
  es: {
    strawberry: "Fresa",
    vanilla: "Vainilla",
    chocolate: "Chocolate",
    mint: "Menta",
    coconut: "Coco",
    honey: "Miel",
  },
}

interface FlavorBadgeProps {
  flavor: string
  className?: string
  lang?: string
}

export function FlavorBadge({ flavor, className = "", lang = "en" }: FlavorBadgeProps) {
  // Use static labels based on language
  const labels = flavorLabels[lang as keyof typeof flavorLabels] || flavorLabels.en

  const flavorConfig: Record<string, { icon: React.ReactNode; label: string; badgeClass: string }> = {
    strawberry: {
      icon: <Strawberry className="h-3 w-3" />,
      label: labels.strawberry,
      badgeClass: "badge-strawberry",
    },
    vanilla: {
      icon: <IceCream className="h-3 w-3" />,
      label: labels.vanilla,
      badgeClass: "badge-vanilla",
    },
    chocolate: {
      icon: <Cookie className="h-3 w-3" />,
      label: labels.chocolate,
      badgeClass: "badge-chocolate",
    },
    mint: {
      icon: <Leaf className="h-3 w-3" />,
      label: labels.mint,
      badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    coconut: {
      icon: <Coconut className="h-3 w-3" />,
      label: labels.coconut,
      badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
    honey: {
      icon: <Candy className="h-3 w-3" />,
      label: labels.honey,
      badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    },
  }

  const config = flavorConfig[flavor] || flavorConfig.strawberry

  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${config.badgeClass} ${className}`}>
      {config.icon}
      <span className="text-xs">{config.label}</span>
    </Badge>
  )
}
