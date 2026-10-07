import type { ISODate } from '../types'

/*
 * Datas são tratadas como strings "AAAA-MM-DD" no horário local.
 * Isso evita bugs de fuso (ex.: new Date('2026-01-10') vira dia 09 em UTC-3)
 * e permite comparar datas com < e > diretamente.
 */

const pad = (n: number) => String(n).padStart(2, '0')

export const ISO_RE = /^\d{4}-\d{2}-\d{2}$/

export function toISO(d: Date): ISODate {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function fromISO(iso: ISODate): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function isValidISO(value: string | null | undefined): value is ISODate {
  if (!value || !ISO_RE.test(value)) return false
  return toISO(fromISO(value)) === value
}

export function todayISO(): ISODate {
  return toISO(new Date())
}

export function addDays(iso: ISODate, days: number): ISODate {
  const d = fromISO(iso)
  d.setDate(d.getDate() + days)
  return toISO(d)
}

/** Noites ocupadas por uma estadia: do check-in até a véspera do check-out. */
export function nightsBetween(checkIn: ISODate, checkOut: ISODate): ISODate[] {
  const nights: ISODate[] = []
  for (let d = checkIn; d < checkOut; d = addDays(d, 1)) nights.push(d)
  return nights
}

export function countNights(checkIn: ISODate, checkOut: ISODate): number {
  return nightsBetween(checkIn, checkOut).length
}

/** "dd/mm" */
export function formatDayMonth(iso: ISODate): string {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

export function formatLong(iso: ISODate): string {
  return fromISO(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
}

export function monthLabel(year: number, month: number): string {
  const label = new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export const WEEKDAYS_SHORT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

/** Valida um período de busca. Retorna a mensagem de erro, ou null se estiver ok. */
export function validateRange(checkIn: ISODate | null, checkOut: ISODate | null): string | null {
  if (!checkIn || !checkOut) return 'Escolha as datas de check-in e check-out.'
  if (!isValidISO(checkIn) || !isValidISO(checkOut)) return 'Data inválida.'
  if (checkIn < todayISO()) return 'O check-in não pode ser em uma data passada.'
  if (checkOut <= checkIn) return 'O check-out precisa ser depois do check-in.'
  return null
}

export function plural(n: number, singular: string, pluralForm: string): string {
  return `${n} ${n === 1 ? singular : pluralForm}`
}
