type SmartImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
  decoding?: 'sync' | 'async' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
}

function buildOptimizedPath(src: string, width: 1280 | 1920, format: 'webp' | 'avif'): string | null {
  if (!src.startsWith('/screenshots/')) {
    return null
  }

  const fileName = src.replace('/screenshots/', '')
  const dotIndex = fileName.lastIndexOf('.')
  const base = dotIndex >= 0 ? fileName.slice(0, dotIndex) : fileName
  return `/screenshots/optimized/${base}-${width}.${format}`
}

export function SmartImage({
  src,
  alt,
  className,
  width = 1600,
  height = 900,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 960px',
}: SmartImageProps) {
  const avif1280 = buildOptimizedPath(src, 1280, 'avif')
  const avif1920 = buildOptimizedPath(src, 1920, 'avif')
  const webp1280 = buildOptimizedPath(src, 1280, 'webp')
  const webp1920 = buildOptimizedPath(src, 1920, 'webp')

  if (!avif1280 || !avif1920 || !webp1280 || !webp1920) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
      />
    )
  }

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${avif1280} 1280w, ${avif1920} 1920w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${webp1280} 1280w, ${webp1920} 1920w`}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  )
}
