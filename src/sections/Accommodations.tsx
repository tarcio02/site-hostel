import { accommodations } from '../data/accommodations'
import { useSearchState } from '../hooks/useSearchState'
import { countNights, formatDayMonth, plural } from '../lib/dates'
import { AccommodationCard } from '../components/accommodation/AccommodationCard'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

export function Accommodations() {
  const { checkIn, checkOut, guests, hasValidRange, queryString } = useSearchState()

  return (
    <Section id="quartos" tone="claro" labelledBy="quartos-title">
      <SectionTitle id="quartos-title" eyebrow="Acomodações" title="Onde você vai dormir">
        <p>Quarto privativo para quem quer um canto só seu, tendas para dormir pertinho da natureza e dormitório para quem viaja leve.</p>
      </SectionTitle>

      <div aria-live="polite" className="mb-8 text-center">
        {hasValidRange ? (
          <>
            <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-creme px-5 py-2 font-semibold">
              <span>
                {formatDayMonth(checkIn!)} → {formatDayMonth(checkOut!)} · {plural(countNights(checkIn!, checkOut!), 'noite', 'noites')} ·{' '}
                {plural(guests, 'hóspede', 'hóspedes')}
              </span>
              <a href="#reservar" className="font-bold text-terracota-escuro underline underline-offset-4">
                alterar
              </a>
            </p>
            <p className="mt-3 text-sm">Escolha a acomodação e pergunte pelo WhatsApp se ela está livre nessas datas.</p>
          </>
        ) : (
          <p className="text-sm">
            <a href="#reservar" className="font-bold text-terracota-escuro underline underline-offset-4">
              Escolha as datas
            </a>{' '}
            e elas já vão na mensagem quando você reservar pelo WhatsApp.
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((acc) => (
          <AccommodationCard key={acc.id} accommodation={acc} query={queryString} />
        ))}
      </div>
    </Section>
  )
}
