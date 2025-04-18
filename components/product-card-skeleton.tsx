import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="border-2 border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="relative h-64 bg-gray-50 dark:bg-gray-900">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div className="flex items-center gap-1 mb-1">
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between mt-auto pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  )
}
