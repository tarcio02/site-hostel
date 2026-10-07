import { useMemo, useState } from 'react'
import type { Accommodation, DayAvailability, ISODate } from '../../types'
import { useCalendar } from '../../hooks/useAvailability'
import { WEEKDAYS_SHORT, fromISO, monthLabel, nightsBetween, toISO, todayISO } from '../../lib/dates'
import { Icon } from '../ui/Icon'

interface Props {
  accommodation: Accommodation
  guests: number
  checkIn: ISODate | null
  checkOut: ISODate | null
  onSelect: (range: { checkIn: ISODate | null; checkOut: ISODate | null }) => void
}

const MONTHS_AHEAD = 12

const firstOfMonth = (year: number, month: number) => toISO(new Date(year, month, 1))

/**
 * Calendário de disponibilidade. Cada dia representa a NOITE que começa nele.
 * Clique 1 = check-in, clique 2 = check-out. O dia do check-out pode estar
 * ocupado (a noite dele não é usada).
 */
export function AvailabilityCalendar({ accommodation, guests, checkIn, checkOut, onSelect }: Props) {
  const today = todayISO()
  const start = fromISO(checkIn ?? today)
  const [cursor, setCursor] = useState({ year: start.getFullYear(), month: start.getMonth() })

  const now = fromISO(today)
  const monthIndex = (cursor.year - now.getFullYear()) * 12 + (cursor.month - now.getMonth())
  const canPrev = monthIndex > 0
  const canNext = monthIndex < MONTHS_AHEAD - 1

  // busca as noites dos dois meses visíveis
  const from = firstOfMonth(cursor.year, cursor.month)
  const to = firstOfMonth(cursor.year, cursor.month + 2)
  const { data, loading, error } = useCalendar(accommodation.id, from, to, guests)

  const isDorm = accommodation.kind === 'dormitorio'

  const isNightFree = (date: ISODate) => date >= today && (data?.get(date)?.available ?? false)
  const rangeIsFree = (a: ISODate, b: ISODate) => nightsBetween(a, b).every(isNightFree)

  // modo atual: escolhendo check-in ou check-out
  const pickingCheckOut = Boolean(checkIn && !checkOut)

  const handleClick = (date: ISODate) => {
    if (pickingCheckOut && checkIn && date > checkIn && rangeIsFree(checkIn, date)) {
      onSelect({ checkIn, checkOut: date })
    } else if (isNightFree(date)) {
      onSelect({ checkIn: date, checkOut: null })
    }
  }

  const move = (delta: number) =>
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })

  return (
    <div className="rounded-artesanal border border-marrom/25 bg-creme-claro p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={!canPrev}
          aria-label="Mês anterior"
          className="grid h-10 w-10 place-items-center rounded-full text-terracota-escuro hover:bg-creme disabled:opacity-30"
        >
          <Icon name="chevron-esquerda" />
        </button>
        <p className="text-center text-sm font-bold" aria-live="polite">
          {pickingCheckOut ? 'Agora escolha o dia do check-out' : 'Escolha o dia do check-in'}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={!canNext}
          aria-label="Próximo mês"
          className="grid h-10 w-10 place-items-center rounded-full text-terracota-escuro hover:bg-creme disabled:opacity-30"
        >
          <Icon name="chevron-direita" />
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-3 text-sm font-bold text-terracota-escuro">
          {error}
        </p>
      )}

      <div className={`grid gap-6 md:grid-cols-2 ${loading ? 'opacity-60' : ''}`} aria-busy={loading}>
        {[0, 1].map((offset) => {
          const d = new Date(cursor.year, cursor.month + offset, 1)
          return (
            <Month
              key={offset}
              year={d.getFullYear()}
              month={d.getMonth()}
              className={offset === 1 ? 'hidden md:block' : ''}
              today={today}
              data={data}
              isDorm={isDorm}
              checkIn={checkIn}
              checkOut={checkOut}
              pickingCheckOut={pickingCheckOut}
              rangeIsFree={rangeIsFree}
              isNightFree={isNightFree}
              onClick={handleClick}
            />
          )
        })}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs" aria-label="Legenda">
        <li className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-verde" /> Disponível
        </li>
        {isDorm && (
          <li className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-full bg-laranja/60" /> Poucas camas
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full border border-dashed border-marrom/60" /> Ocupado
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-terracota" /> Sua estadia
        </li>
      </ul>
    </div>
  )
}

interface MonthProps {
  year: number
  month: number
  className: string
  today: ISODate
  data: Map<ISODate, DayAvailability> | null
  isDorm: boolean
  checkIn: ISODate | null
  checkOut: ISODate | null
  pickingCheckOut: boolean
  rangeIsFree: (a: ISODate, b: ISODate) => boolean
  isNightFree: (d: ISODate) => boolean
  onClick: (d: ISODate) => void
}

function Month(props: MonthProps) {
  const { year, month, className, today, data, isDorm, checkIn, checkOut, pickingCheckOut } = props

  const cells = useMemo(() => {
    const first = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const blanks = Array.from({ length: first.getDay() }, () => null)
    const days = Array.from({ length: daysInMonth }, (_, i) => toISO(new Date(year, month, i + 1)))
    return [...blanks, ...days]
  }, [year, month])

  return (
    <div className={className}>
      <h3 className="mb-2 text-center font-sans text-base font-bold text-marrom-texto">{monthLabel(year, month)}</h3>
      <div className="grid grid-cols-7 gap-1 text-center" role="group" aria-label={monthLabel(year, month)}>
        {WEEKDAYS_SHORT.map((w, i) => (
          <span key={i} className="pb-1 text-xs font-bold text-marrom" aria-hidden="true">
            {w}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={`b${i}`} />
          const day = data?.get(date)
          const past = date < today
          const free = props.isNightFree(date)
          const few = isDorm && free && day !== undefined && day.freeUnits <= 2
          const isStart = date === checkIn
          const isEnd = date === checkOut
          const inRange = checkIn && checkOut && date > checkIn && date < checkOut
          const validCheckOut = pickingCheckOut && checkIn !== null && date > checkIn && props.rangeIsFree(checkIn, date)
          const clickable = !past && (free || validCheckOut)

          let tone = 'text-marrom/60 line-through decoration-marrom/50'
          if (past) tone = 'text-marrom/35'
          else if (isStart || isEnd) tone = 'bg-terracota text-creme-claro font-bold'
          else if (inRange) tone = 'bg-pessego text-marrom-texto'
          else if (few) tone = 'bg-laranja/60 text-marrom-texto hover:ring-2 hover:ring-terracota'
          else if (free) tone = 'bg-verde/80 font-semibold text-marrom-texto hover:ring-2 hover:ring-terracota'
          else if (validCheckOut) tone = 'border border-dashed border-terracota/60 text-marrom-texto hover:ring-2 hover:ring-terracota'
          else tone = `border border-dashed border-marrom/40 ${tone}`

          const n = Number(date.slice(8))
          const status = past
            ? 'data passada'
            : free
              ? isDorm
                ? `disponível, ${day?.freeUnits} ${day?.freeUnits === 1 ? 'cama livre' : 'camas livres'}`
                : 'disponível'
              : validCheckOut
                ? 'disponível para check-out'
                : 'ocupado'

          return (
            <button
              key={date}
              type="button"
              disabled={!clickable}
              onClick={() => props.onClick(date)}
              aria-pressed={isStart || isEnd}
              title={status}
              aria-label={`${n} de ${monthLabel(year, month).split(' ')[0].toLowerCase()}: ${status}`}
              className={`flex aspect-square items-center justify-center rounded-full text-sm transition ${tone} disabled:cursor-default`}
            >
              {n}
            </button>
          )
        })}
      </div>
    </div>
  )
}

