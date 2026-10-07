import type { Accommodation } from '../../types'
import { useSearchState } from '../../hooks/useSearchState'
import { countNights, formatDayMonth, plural, validateRange } from '../../lib/dates'
import { bookingMessage, whatsappUrl } from '../../lib/whatsapp'
import { ButtonAnchor } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { DateRangeFields } from './DateRangeFields'
import { GuestSelector } from './GuestSelector'

/**
 * Datas, hóspedes e botão "Reservar pelo WhatsApp" da página de detalhes.
 * O site não consulta disponibilidade: as datas escolhidas (guardadas na URL)
 * vão na mensagem e o hostel responde pelo WhatsApp.
 */
export function BookingBox({ accommodation }: { accommodation: Accommodation }) {
  const search = useSearchState()
  const { checkIn, checkOut, hasValidRange } = search
  // a busca da home aceita até MAX_GUESTS; aqui o limite é a capacidade da acomodação
  const guests = Math.min(search.guests, accommodation.capacity)

  const update = (patch: Partial<{ checkIn: string | null; checkOut: string | null; guests: number }>) =>
    search.setSearch({ checkIn, checkOut, guests, ...patch })

  const rangeError = checkIn && checkOut ? validateRange(checkIn, checkOut) : null
  const message = bookingMessage({
    accommodationName: accommodation.name,
    checkIn: hasValidRange ? checkIn : null,
    checkOut: hasValidRange ? checkOut : null,
    guests,
  })

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

      <div aria-live="polite" className="min-h-[3rem]">
        {rangeError && <p className="text-sm font-bold text-terracota-escuro">{rangeError}</p>}
        {!hasValidRange && !rangeError && (
          <p className="text-sm">Escolha as datas para já irem na mensagem. Respondemos pelo WhatsApp se há vaga.</p>
        )}
        {hasValidRange && (
          <p className="rounded-xl bg-creme px-3 py-2 text-sm font-semibold">
            {formatDayMonth(checkIn!)} a {formatDayMonth(checkOut!)} · {plural(countNights(checkIn!, checkOut!), 'noite', 'noites')} ·{' '}
            {plural(guests, 'pessoa', 'pessoas')}
          </p>
        )}
      </div>

      <ButtonAnchor variant="whatsapp" size="lg" className="w-full" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" /> Reservar pelo WhatsApp
      </ButtonAnchor>
      <p className="text-center text-xs text-marrom-texto/90">
        Confirmamos a disponibilidade pelo WhatsApp. A reserva é garantida com sinal via Pix.
      </p>
    </div>
  )
}
