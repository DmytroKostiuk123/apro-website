import { useEffect, useRef, useState } from 'react'

/**
 * Зображення зі скелетоном: доки фото вантажиться, на його місці
 * мерехтить плейсхолдер, потім фото плавно проявляється.
 * tone="dark" — для тёмних секцій (герой).
 */
export default function SkeletonImage({ className = '', imgClassName = '', tone = 'light', alt = '', ...imgProps }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Якщо фото вже в кеші браузера, onLoad може не спрацювати
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div
          className={`absolute inset-0 ${tone === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'}`}
          aria-hidden="true"
        />
      )}
      <img
        ref={ref}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        {...imgProps}
      />
    </div>
  )
}
