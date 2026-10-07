import { useId } from 'react'
import type { ISODate } from '../../types'
import { addDays, isValidISO, todayISO } from '../../lib/dates'

interface Props {
  checkIn: ISODate | null
  checkOut: ISODate | null
  onChange: (range: { checkIn: ISODate | null; checkOut: ISODate | null }) => void
  /** classe aplicada a cada campo (label + input) */
  fieldClassName?: string
}

export const fieldLabel = 'mb-1 block text-xs font-bold tracking-wide text-terracota-escuro uppercase'
export const fieldInput =
  'w-full rounded-xl border border-marrom/40 bg-creme-claro px-3 py-2.5 text-base text-marrom-texto focus:border-terracota focus:ring-2 focus:ring-terracota/30 focus:outline-none'

/**
 * Campos de data nativos: leves e com o seletor do próprio celular.
 * Bloqueiam datas passadas e check-out igual ou antes do check-in.
 */
export function DateRangeFields({ checkIn, checkOut, onChange, fieldClassName = 'min-w-0' }: Props) {
  const id = useId()
  const today = todayISO()
  const minCheckOut = addDays(checkIn ?? today, 1)

  const handleCheckIn = (value: string) => {
    const nextIn = isValidISO(value) && value >= today ? value : null
    // se o check-out ficou inválido, sugere a noite seguinte
    const nextOut = nextIn && checkOut && checkOut > nextIn ? checkOut : nextIn ? addDays(nextIn, 1) : checkOut
    onChange({ checkIn: nextIn, checkOut: nextOut })
  }

  const handleCheckOut = (value: string) => {
    const valid = isValidISO(value) && value >= minCheckOut
    onChange({ checkIn, checkOut: valid ? value : null })
  }

  return (
    <>
      <div className={fieldClassName}>
        <label htmlFor={`${id}-in`} className={fieldLabel}>
          Check-in
        </label>
        <input
          id={`${id}-in`}
          type="date"
          min={today}
          value={checkIn ?? ''}
          onChange={(e) => handleCheckIn(e.target.value)}
          className={fieldInput}
          required
        />
      </div>
      <div className={fieldClassName}>
        <label htmlFor={`${id}-out`} className={fieldLabel}>
          Check-out
        </label>
        <input
          id={`${id}-out`}
          type="date"
          min={minCheckOut}
          value={checkOut ?? ''}
          onChange={(e) => handleCheckOut(e.target.value)}
          className={fieldInput}
          required
        />
      </div>
    </>
  )
}
