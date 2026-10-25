export default function WatermarkedPhoto({
  src,
  alt,
  className = '',
  containerClassName = '',
  containerPosition = 'relative',
  loading = 'lazy',
  width,
  height,
  fetchPriority,
  style,
}) {
  return (
    <div className={`${containerPosition} ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
        style={style}
      />
      <img
        src="/images/swapna-logo.png"
        alt=""
        aria-hidden="true"
        data-photo-watermark
        className="pointer-events-none absolute bottom-2 right-2 z-30 h-auto w-16 rounded bg-white/90 p-1.5 shadow-md sm:bottom-3 sm:right-3 sm:w-20"
      />
    </div>
  )
}
