export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-pink-500 animate-spin"></div>
      </div>
    </div>
  )
}
