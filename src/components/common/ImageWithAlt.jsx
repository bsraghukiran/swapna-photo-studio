export default function ImageWithAlt({ src, alt, className = '', loading = 'lazy', width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  )
}
