import { useState, type ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** true apenas para a imagem principal visível sem rolar (ex.: hero). */
  priority?: boolean
}

/** Imagem com lazy loading nativo e um fundo suave enquanto carrega. */
export function LazyImage({ priority, className = '', onLoad, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      className={`bg-pessego/40 object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...rest}
    />
  )
}
