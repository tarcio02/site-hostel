/** Datas sempre no formato ISO local "AAAA-MM-DD" (sem horário, sem fuso). */
export type ISODate = string

export type AccommodationKind = 'dormitorio' | 'privativo'
export type AccentColor = 'rosa' | 'pessego' | 'verde' | 'azul' | 'lilas'

export type AmenityKey =
  | 'wifi'
  | 'cafe'
  | 'ventilador'
  | 'armario'
  | 'tomada'
  | 'roupa-de-cama'
  | 'toalha'
  | 'banheiro-privativo'
  | 'banheiro-compartilhado'
  | 'varanda'

export interface Photo {
  src: string
  alt: string
}

export interface Accommodation {
  id: string
  slug: string
  name: string
  kind: AccommodationKind
  /** Somente dormitórios */
  dormGender?: 'misto' | 'feminino'
  accent: AccentColor
  summary: string
  description: string
  /** Dormitório: nº de camas. Privativo: nº máximo de hóspedes. */
  capacity: number
  /** Quantas unidades vendáveis existem: camas (dormitório) ou 1 (quarto inteiro). */
  units: number
  beds: string[]
  bathroom: 'privativo' | 'compartilhado'
  priceFrom: number
  priceUnit: 'pessoa' | 'quarto'
  minNightsHolidays: number
  amenities: AmenityKey[]
  included: string[]
  photos: Photo[]
}

/** Uma reserva/bloqueio vindo da fonte de dados (mock, iCal, Supabase…). */
export interface Booking {
  accommodationId: string
  checkIn: ISODate
  /** A noite do check-out NÃO fica ocupada. */
  checkOut: ISODate
  /** Camas ocupadas (dormitório) ou 1 (quarto inteiro). */
  units: number
}

export type AvailabilityStatus = 'disponivel' | 'indisponivel' | 'excede-capacidade'

export interface AvailabilityResult {
  accommodationId: string
  status: AvailabilityStatus
  available: boolean
  /** Menor nº de unidades livres entre todas as noites do período. */
  freeUnits: number
  nights: number
}

export interface DayAvailability {
  date: ISODate
  freeUnits: number
  totalUnits: number
  /** A noite que começa nesta data comporta o nº de hóspedes pedido. */
  available: boolean
}
