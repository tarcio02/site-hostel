import { Link, useLocation, useParams } from 'react-router'
import { siteConfig } from '../config/site'
import { getAccommodationBySlug } from '../data/accommodations'
import { formatPrice, kindLabel } from '../lib/format'
import { plural } from '../lib/dates'
import { AmenityList } from '../components/accommodation/AmenityList'
import { Gallery } from '../components/accommodation/Gallery'
import { BookingBox } from '../components/booking/BookingBox'
import { Icon, type IconName } from '../components/ui/Icon'
import { MandalaDivider } from '../components/ui/MandalaDivider'
import { Tag } from '../components/ui/Tag'
import { usePageTitle } from '../hooks/usePageTitle'
import { NotFound } from './NotFound'

export function AccommodationDetail() {
  const { slug = '' } = useParams()
  const { search } = useLocation()
  const acc = getAccommodationBySlug(slug)
  usePageTitle(acc ? `${acc.name} · ${siteConfig.name}` : `Página não encontrada · ${siteConfig.name}`)

  if (!acc) return <NotFound />

  const isDorm = acc.kind === 'dormitorio'
  const facts: { icon: IconName; label: string }[] = [
    { icon: isDorm ? 'cama' : 'pessoas', label: isDorm ? `${acc.capacity} camas` : `Até ${plural(acc.capacity, 'pessoa', 'pessoas')}` },
    { icon: 'banheiro', label: `Banheiro ${acc.bathroom}` },
  ]
  if (isDorm) facts.push({ icon: 'pessoas', label: acc.dormGender === 'feminino' ? 'Somente mulheres' : 'Dormitório misto' })

  return (
    <>
      <div className="px-4 pt-6 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            to={{ pathname: '/', search, hash: '#quartos' }}
            className="mb-6 inline-flex items-center gap-1 font-bold text-terracota-escuro underline-offset-4 hover:underline"
          >
            <Icon name="chevron-esquerda" size={18} /> Todas as acomodações
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div className="space-y-8">
              <Gallery photos={acc.photos} />

              <header>
                <Tag accent={acc.accent}>{kindLabel(acc)}</Tag>
                <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{acc.name}</h1>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-semibold">
                  {facts.map((f) => (
                    <li key={f.label} className="flex items-center gap-1.5">
                      <Icon name={f.icon} size={20} className="text-terracota-escuro" /> {f.label}
                    </li>
                  ))}
                </ul>
                <MandalaDivider className="my-5 !justify-start" />
                <p className="text-lg leading-relaxed">{acc.description}</p>
              </header>

              <section aria-labelledby="camas-title">
                <h2 id="camas-title" className="mb-3 text-2xl">
                  Camas
                </h2>
                <ul className="space-y-1">
                  {acc.beds.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Icon name="cama" size={20} className="text-laranja-queimado" /> {b}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="incluso-title">
                <h2 id="incluso-title" className="mb-3 text-2xl">
                  O que está incluso
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {acc.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="check" size={20} className="mt-0.5 shrink-0 text-terracota-escuro" /> {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="comodidades-title">
                <h2 id="comodidades-title" className="mb-4 text-2xl">
                  Comodidades
                </h2>
                <AmenityList items={acc.amenities} />
              </section>

              <section aria-labelledby="preco-title" className="rounded-artesanal border border-marrom/25 bg-creme-claro p-5">
                <h2 id="preco-title" className="mb-2 text-2xl">
                  Preço
                </h2>
                <p>
                  A partir de <strong className="font-display text-2xl text-terracota">{formatPrice(acc.priceFrom)}</strong>{' '}
                  {acc.priceUnit === 'pessoa' ? 'por pessoa' : 'pelo quarto'}, por noite.
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm">
                  <Icon name="calendario" size={18} className="mt-0.5 shrink-0 text-terracota-escuro" />
                  Em feriados e datas especiais, a estadia mínima é de {plural(acc.minNightsHolidays, 'noite', 'noites')}.
                </p>
              </section>
            </div>

            <aside aria-labelledby="reservar-title" className="lg:sticky lg:top-24 lg:self-start">
              <div id="reservar" className="rounded-artesanal border border-marrom/25 bg-creme-claro/70 p-4 shadow-[0_18px_40px_-24px_rgba(74,52,38,0.6)] sm:p-6">
                <h2 id="reservar-title" className="mb-4 text-2xl">
                  Disponibilidade e reserva
                </h2>
                <BookingBox accommodation={acc} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
