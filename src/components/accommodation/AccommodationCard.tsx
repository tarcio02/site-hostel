import { Link } from 'react-router'
import type { Accommodation, AvailabilityResult } from '../../types'
import { formatPrice, kindLabel } from '../../lib/format'
import { AvailabilityNote } from '../booking/AvailabilityNote'
import { Icon } from '../ui/Icon'
import { LazyImage } from '../ui/LazyImage'
import { Tag } from '../ui/Tag'
import { AmenityList } from './AmenityList'

interface Props {
  accommodation: Accommodation
  /** Resultado da busca; ausente quando não há datas selecionadas. */
  result?: AvailabilityResult
  loading?: boolean
  /** querystring da busca, para levar as datas à página de detalhes */
  query: string
}

export function AccommodationCard({ accommodation: acc, result, loading, query }: Props) {
  const unavailable = result !== undefined && !result.available
  const href = `/acomodacoes/${acc.slug}${query ? `?${query}` : ''}`

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-artesanal has-[a:focus-visible]:ring-4 has-[a:focus-visible]:ring-terracota-escuro border border-marrom/20 bg-creme-claro shadow-[0_10px_30px_-18px_rgba(74,52,38,0.6)] transition ${
        unavailable ? 'opacity-55 saturate-50' : 'hover:-translate-y-1'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={acc.photos[0].src}
          alt={acc.photos[0].alt}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          width={800}
          height={600}
        />
        <div className="absolute top-3 left-3">
          <Tag accent={acc.accent}>{kindLabel(acc)}</Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-2xl">
            {/* o link cobre o card todo (::after), mantendo um único ponto de foco */}
            <Link to={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {acc.name}
            </Link>
          </h3>
          <p className="mt-1 leading-relaxed">{acc.summary}</p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
          <li className="flex items-center gap-1.5">
            <Icon name={acc.kind === 'dormitorio' ? 'cama' : 'pessoas'} size={18} className="text-terracota-escuro" />
            {acc.kind === 'dormitorio' ? `${acc.capacity} camas` : `Até ${acc.capacity} pessoas`}
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="banheiro" size={18} className="text-terracota-escuro" />
            Banheiro {acc.bathroom}
          </li>
        </ul>

        <AmenityList items={acc.amenities} compact />

        <div className="mt-auto space-y-3 border-t border-dashed border-marrom/35 pt-4">
          {loading && <p className="text-sm">Consultando disponibilidade…</p>}
          {!loading && result && <AvailabilityNote accommodation={acc} result={result} />}
          <div className="flex items-end justify-between gap-3">
            <p className="text-sm leading-tight">
              a partir de
              <span className="block font-display text-2xl font-bold text-terracota">{formatPrice(acc.priceFrom)}</span>
              por {acc.priceUnit} / noite
            </p>
            <span className="flex items-center gap-1 text-sm font-bold text-terracota-escuro" aria-hidden="true">
              Ver detalhes <Icon name="seta-direita" size={18} />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
