import { Link } from 'react-router'
import type { Accommodation } from '../../types'
import { kindLabel } from '../../lib/format'
import { plural } from '../../lib/dates'
import { buttonClasses } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { LazyImage } from '../ui/LazyImage'
import { Tag } from '../ui/Tag'
import { AmenityList } from './AmenityList'

interface Props {
  accommodation: Accommodation
  /** querystring da busca, para levar as datas à página de detalhes */
  query: string
}

export function AccommodationCard({ accommodation: acc, query }: Props) {
  const href = `/acomodacoes/${acc.slug}${query ? `?${query}` : ''}`

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-artesanal has-[a:focus-visible]:ring-4 has-[a:focus-visible]:ring-terracota-escuro border border-marrom/20 bg-creme-claro shadow-[0_10px_30px_-18px_rgba(74,52,38,0.6)] transition hover:-translate-y-1"
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
            {acc.kind === 'dormitorio' ? `${acc.capacity} camas` : `Até ${plural(acc.capacity, 'pessoa', 'pessoas')}`}
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="banheiro" size={18} className="text-terracota-escuro" />
            Banheiro {acc.bathroom}
          </li>
        </ul>

        <AmenityList items={acc.amenities} compact />

        <div className="mt-auto border-t border-dashed border-marrom/35 pt-4">
          {/* só visual: o clique é do link do título, que cobre o card */}
          <span className={buttonClasses('primary', 'md', 'w-full group-hover:bg-laranja-queimado')} aria-hidden="true">
            Ver detalhes <Icon name="seta-direita" size={18} />
          </span>
        </div>
      </div>
    </article>
  )
}
