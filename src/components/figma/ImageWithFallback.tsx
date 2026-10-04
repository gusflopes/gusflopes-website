import React, { useEffect, useRef, useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /**
   * Capa que não carregou: em vez do ícone de imagem quebrada, um campo chapado com esta classe
   * (ex.: a cor do eixo, `placa-engenharia`). Decorativo, sem texto.
   */
  fallbackClassName?: string
}

export function ImageWithFallback({ fallbackClassName, ...props }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // A imagem pode falhar antes da hidratação (o onError do React ainda não existia): confere ao montar.
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0 && img.getAttribute('src')) setDidError(true)
  }, [])

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  if (didError && fallbackClassName) {
    return <div aria-hidden="true" className={`${fallbackClassName} ${className ?? ''}`} style={style} data-original-url={src} />
  }

  return didError ? (
    <div
      className={`inline-block bg-papel-2 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img ref={imgRef} src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
