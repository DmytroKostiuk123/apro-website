import { useEffect, useRef, useState } from 'react'

/**
 * Зображення зі скелетоном: доки фото вантажиться, на його місці
 * мерехтить плейсхолдер, потім фото плавно проявляється.
 * tone="dark" — для тёмних секцій (герой).
 */
export default function SkeletonImage({ src, className = '', imgClassName = '', tone = 'light', alt = '', ...imgProps }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  // Абсолютні шляхи (/images/…) працюють і в піддиректорії GitHub Pages
  const resolvedSrc = src?.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src

  // Якщо фото вже в кеші браузера, onLoad може не спрацювати
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  // Позицію (relative/absolute) задає caller через className — не хардкодимо
  // `relative`, бо воно перекриває передане `absolute inset-0` (порядок Tailwind).
  return (
    <div className={`overflow-hidden ${className}`}>
      {!loaded && (
        <div
          className={`absolute inset-0 ${tone === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer'}`}
          aria-hidden="true"
        />
      )}
      <img
        ref={ref}
        src={resolvedSrc}
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
