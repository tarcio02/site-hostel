import { accommodations } from '../data/accommodations'
import { useAvailability } from '../hooks/useAvailability'
import { useSearchState } from '../hooks/useSearchState'
import { countNights, formatDayMonth, plural } from '../lib/dates'
import { AccommodationCard } from '../components/accommodation/AccommodationCard'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

export function Accommodations() {
  const search = useSearchState()
  const { checkIn, checkOut, guests, hasValidRange, queryString } = search
  const { data, loading, error } = useAvailability(checkIn, checkOut, guests, hasValidRange)

  return (
    <Section id="quartos" tone="claro" labelledBy="quartos-title">
      <SectionTitle id="quartos-title" eyebrow="Acomodações" title="Onde você vai dormir">
        <p>Dormitórios para quem viaja leve e quartos privativos para quem quer um canto só seu.</p>
      </SectionTitle>

      <div aria-live="polite" className="mb-8 text-center">
        {hasValidRange ? (
          <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-creme px-5 py-2 font-semibold">
            <span>
              {formatDayMonth(checkIn!)} → {formatDayMonth(checkOut!)} · {plural(countNights(checkIn!, checkOut!), 'noite', 'noites')} ·{' '}
              {plural(guests, 'hóspede', 'hóspedes')}
            </span>
            <a href="#reservar" className="font-bold text-terracota-escuro underline underline-offset-4">
              alterar
            </a>
          </p>
        ) : (
          <p className="text-sm">
            <a href="#reservar" className="font-bold text-terracota-escuro underline underline-offset-4">
              Escolha as datas
            </a>{' '}
            para ver o que está disponível.
          </p>
        )}
        {error && (
          <p role="alert" className="mt-3 font-bold text-terracota-escuro">
            {error}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {accommodations.map((acc) => (
          <AccommodationCard
            key={acc.id}
            accommodation={acc}
            result={data?.get(acc.id)}
            loading={loading}
            query={queryString}
          />
        ))}
      </div>
    </Section>
  )
}
