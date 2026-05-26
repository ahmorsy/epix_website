export function RouteLoadingState() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-32" aria-live="polite" aria-busy="true">
      <div className="space-y-5">
        <div className="route-loading-shimmer h-7 w-48 rounded-lg" />
        <div className="route-loading-shimmer h-16 w-full rounded-2xl" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="route-loading-shimmer h-36 rounded-2xl" />
          <div className="route-loading-shimmer h-36 rounded-2xl" />
          <div className="route-loading-shimmer h-36 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
