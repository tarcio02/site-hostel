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
  beds: string[]
  bathroom: 'privativo' | 'compartilhado'
  priceFrom: number
  priceUnit: 'pessoa' | 'quarto'
  minNightsHolidays: number
  amenities: AmenityKey[]
  included: string[]
  photos: Photo[]
}
