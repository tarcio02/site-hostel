import type { Booking } from '../types'
import { addDays, todayISO } from '../lib/dates'

/*
 * Reservas FICTÍCIAS, geradas a partir de hoje para que a demonstração
 * sempre mostre casos disponíveis, lotados e com poucas camas.
 * Será substituído pela leitura do iCal do Booking e/ou Supabase —
 * veja src/services/availability.ts.
 */
export function buildMockBookings(base = todayISO()): Booking[] {
  const at = (offset: number) => addDays(base, offset)
  const b = (accommodationId: string, from: number, to: number, units: number): Booking => ({
    accommodationId,
    checkIn: at(from),
    checkOut: at(to),
    units,
  })

  return [
    // Dormitório misto (6 camas)
    b('dorm-misto', 2, 6, 3),
    b('dorm-misto', 3, 5, 2), // noites +3 e +4: restam 1 cama
    b('dorm-misto', 10, 13, 6), // lotado
    b('dorm-misto', 17, 19, 4),
    b('dorm-misto', 30, 34, 5),

    // Dormitório feminino (4 camas)
    b('dorm-feminino', 1, 4, 3),
    b('dorm-feminino', 7, 10, 4), // lotado
    b('dorm-feminino', 21, 24, 2),

    // Quarto casal
    b('quarto-casal', 0, 3, 1),
    b('quarto-casal', 5, 9, 1),
    b('quarto-casal', 14, 17, 1),
    b('quarto-casal', 25, 28, 1),

    // Quarto família
    b('quarto-familia', 3, 7, 1),
    b('quarto-familia', 12, 13, 1),
    b('quarto-familia', 20, 27, 1),
  ]
}
