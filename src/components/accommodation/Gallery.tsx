import { useState } from 'react'
import type { Photo } from '../../types'
import { LazyImage } from '../ui/LazyImage'

/** Galeria leve: foto principal + miniaturas clicáveis. */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState(0)
  const current = photos[active]

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-artesanal border border-marrom/20 bg-creme-claro">
        <LazyImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          priority={active === 0}
          width={1200}
          height={800}
          className="aspect-[3/2] w-full"
        />
      </div>
      <ul className="grid grid-cols-3 gap-3" aria-label="Fotos">
        {photos.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}: ${photo.alt}`}
              aria-current={i === active}
              className={`block w-full overflow-hidden rounded-2xl border-2 transition ${
                i === active ? 'border-terracota' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <LazyImage src={photo.src} alt="" width={400} height={300} className="aspect-[4/3] w-full" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
