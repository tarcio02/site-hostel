import type { Accommodation } from '../../types'
import { useAvailability } from '../../hooks/useAvailability'
import { useSearchState } from '../../hooks/useSearchState'
import { countNights, formatDayMonth, plural, validateRange } from '../../lib/dates'
import { bookingMessage, whatsappUrl } from '../../lib/whatsapp'
import { ButtonAnchor, buttonClasses } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { AvailabilityCalendar } from './AvailabilityCalendar'
import { AvailabilityNote } from './AvailabilityNote'
import { DateRangeFields } from './DateRangeFields'
import { GuestSelector } from './GuestSelector'

/** Seletor de datas/hóspedes, calendário e botão "Reservar pelo WhatsApp" da página de detalhes. */
export function BookingBox({ accommodation }: { accommodation: Accommodation }) {
  const search = useSearchState()
  const { checkIn, checkOut, guests, hasValidRange } = search
  const { data, loading, error } = useAvailability(checkIn, checkOut, guests, hasValidRange)
  const result = data?.get(accommodation.id)

  const update = (patch: Partial<{ checkIn: string | null; checkOut: string | null; guests: number }>) =>
    search.setSearch({ checkIn, checkOut, guests, ...patch })

  const rangeError = checkIn && checkOut ? validateRange(checkIn, checkOut) : null
  const canBook = hasValidRange && result?.available === true && !loading

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <DateRangeFields checkIn={checkIn} checkOut={checkOut} onChange={(range) => update(range)} />
        <GuestSelector
          className="col-span-2"
          value={guests}
          max={accommodation.capacity}
          onChange={(g) => update({ guests: g })}
        />
      </div>

      <AvailabilityCalendar
        accommodation={accommodation}
        guests={guests}
        checkIn={checkIn}
        checkOut={checkOut}
        onSelect={(range) => update(range)}
      />

      <div aria-live="polite" className="min-h-[3rem]">
        {rangeError && <p className="text-sm font-bold text-terracota-escuro">{rangeError}</p>}
        {!hasValidRange && !rangeError && (
          <p className="text-sm">Escolha as datas no calendário ou nos campos acima para ver a disponibilidade.</p>
        )}
        {hasValidRange && loading && <p className="text-sm">Consultando disponibilidade…</p>}
        {hasValidRange && error && <p className="text-sm font-bold text-terracota-escuro">{error}</p>}
        {hasValidRange && !loading && result && (
          <div className="space-y-2">
            <p className="text-sm">
              {formatDayMonth(checkIn!)} a {formatDayMonth(checkOut!)} · {plural(countNights(checkIn!, checkOut!), 'noite', 'noites')} ·{' '}
              {plural(guests, 'pessoa', 'pessoas')}
            </p>
            <AvailabilityNote accommodation={accommodation} result={result} />
          </div>
        )}
      </div>

      {canBook ? (
        <ButtonAnchor
          variant="whatsapp"
          size="lg"
          className="w-full"
          href={whatsappUrl(bookingMessage({ accommodationName: accommodation.name, checkIn: checkIn!, checkOut: checkOut!, guests }))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" /> Reservar pelo WhatsApp
        </ButtonAnchor>
      ) : (
        <button type="button" disabled className={buttonClasses('whatsapp', 'lg', 'w-full')}>
          <Icon name="whatsapp" /> Reservar pelo WhatsApp
        </button>
      )}
      <p className="text-center text-xs text-marrom-texto/90">
        A reserva é confirmada pelo WhatsApp, com sinal via Pix.
      </p>
    </div>
  )
}
