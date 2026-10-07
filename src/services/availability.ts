/**
 * ÚNICO ponto de leitura de disponibilidade do site.
 *
 * Componentes e hooks chamam apenas `getAvailability` e `getCalendar`.
 * Para trocar a fonte (iCal do Booking via função serverless, Supabase…),
 * implemente um novo `AvailabilitySource` e troque `activeSource` abaixo.
 * Nenhum componente precisa mudar.
 *
 * Regras:
 * - O período vai do check-in (inclusive) ao check-out (exclusive):
 *   a noite do check-out não é ocupada.
 * - Disponível só se TODAS as noites do período estiverem livres.
 * - Dormitório: contagem por cama; precisa de camas livres >= hóspedes.
 * - Privativo: quarto inteiro; precisa estar livre e hóspedes <= capacidade.
 */
import type { Accommodation, AvailabilityResult, Booking, DayAvailability, ISODate } from '../types'
import { accommodations } from '../data/accommodations'
import { buildMockBookings } from '../data/bookings.mock'
import { nightsBetween, validateRange } from '../lib/dates'

/* ------------------------------------------------------------------ */
/* Fonte de dados                                                      */
/* ------------------------------------------------------------------ */

export interface AvailabilitySource {
  /** Reservas/bloqueios que tocam o intervalo [from, to). */
  listBookings(from: ISODate, to: ISODate): Promise<Booking[]>
}

const mockSource: AvailabilitySource = {
  async listBookings(from, to) {
    // pequena espera para simular rede e exercitar os estados de carregamento
    await new Promise((r) => setTimeout(r, 250))
    return buildMockBookings().filter((b) => b.checkIn < to && b.checkOut > from)
  },
}

/*
 * Exemplo futuro (não implementado):
 *
 * const icalSource: AvailabilitySource = {
 *   async listBookings(from, to) {
 *     const res = await fetch(`/api/availability?from=${from}&to=${to}`) // função serverless na Vercel
 *     return res.json()
 *   },
 * }
 */

const activeSource: AvailabilitySource = mockSource

/* ------------------------------------------------------------------ */
/* Cálculo                                                             */
/* ------------------------------------------------------------------ */

/** Unidades ocupadas por noite, para uma acomodação. */
function occupancyByNight(bookings: Booking[], accommodationId: string): Map<ISODate, number> {
  const map = new Map<ISODate, number>()
  for (const b of bookings) {
    if (b.accommodationId !== accommodationId) continue
    for (const night of nightsBetween(b.checkIn, b.checkOut)) {
      map.set(night, (map.get(night) ?? 0) + b.units)
    }
  }
  return map
}

function freeUnitsOn(acc: Accommodation, occupied: Map<ISODate, number>, night: ISODate): number {
  return Math.max(0, acc.units - (occupied.get(night) ?? 0))
}

/** Quantas unidades a reserva consome: camas = hóspedes (dormitório) ou 1 quarto. */
function unitsNeeded(acc: Accommodation, guests: number): number {
  return acc.kind === 'dormitorio' ? guests : 1
}

function evaluate(
  acc: Accommodation,
  bookings: Booking[],
  checkIn: ISODate,
  checkOut: ISODate,
  guests: number,
): AvailabilityResult {
  const occupied = occupancyByNight(bookings, acc.id)
  const nights = nightsBetween(checkIn, checkOut)
  const freeUnits = Math.min(...nights.map((n) => freeUnitsOn(acc, occupied, n)))
  const exceedsCapacity = guests > acc.capacity

  let status: AvailabilityResult['status']
  if (exceedsCapacity) status = 'excede-capacidade'
  else if (freeUnits >= unitsNeeded(acc, guests)) status = 'disponivel'
  else status = 'indisponivel'

  return {
    accommodationId: acc.id,
    status,
    available: status === 'disponivel',
    freeUnits,
    nights: nights.length,
  }
}

/* ------------------------------------------------------------------ */
/* API pública                                                         */
/* ------------------------------------------------------------------ */

/**
 * Disponibilidade de todas as acomodações para um período.
 * Lança erro se o período for inválido (passado, check-out <= check-in).
 */
export async function getAvailability(
  checkIn: ISODate,
  checkOut: ISODate,
  guests: number,
): Promise<AvailabilityResult[]> {
  const error = validateRange(checkIn, checkOut)
  if (error) throw new Error(error)
  if (!Number.isInteger(guests) || guests < 1) throw new Error('Número de hóspedes inválido.')

  const bookings = await activeSource.listBookings(checkIn, checkOut)
  return accommodations.map((acc) => evaluate(acc, bookings, checkIn, checkOut, guests))
}

/**
 * Situação de cada noite entre `from` (inclusive) e `to` (exclusive),
 * para o calendário da página de detalhes.
 */
export async function getCalendar(
  accommodationId: string,
  from: ISODate,
  to: ISODate,
  guests: number,
): Promise<DayAvailability[]> {
  const acc = accommodations.find((a) => a.id === accommodationId)
  if (!acc) throw new Error(`Acomodação desconhecida: ${accommodationId}`)

  const bookings = await activeSource.listBookings(from, to)
  const occupied = occupancyByNight(bookings, acc.id)
  const needed = unitsNeeded(acc, guests)

  return nightsBetween(from, to).map((date) => {
    const freeUnits = freeUnitsOn(acc, occupied, date)
    return {
      date,
      freeUnits,
      totalUnits: acc.units,
      available: guests <= acc.capacity && freeUnits >= needed,
    }
  })
}
