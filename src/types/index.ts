/** Datas sempre no formato ISO local "AAAA-MM-DD" (sem horário, sem fuso). */
export type ISODate = string

export type AccommodationKind = 'dormitorio' | 'privativo' | 'tenda'
export type AccentColor = 'rosa' | 'pessego' | 'verde' | 'azul' | 'lilas'

export type AmenityKey =
  | 'wifi'
  | 'redario'
  | 'fogueira'
  | 'atividades'

export interface Photo {
  src: string
  alt: string
  /** versão pequena para as miniaturas da galeria (opcional) */
  thumb?: string
}

export interface Accommodation {
  id: string
  slug: string
  name: string
  /** Nome feminino ("a Tenda"): ajusta "no/na" e "Ele/Ela" na mensagem do WhatsApp */
  feminine?: boolean
  kind: AccommodationKind
  /** Somente dormitórios */
  dormGender?: 'misto' | 'feminino'
  accent: AccentColor
  summary: string
  description: string
  /** Dormitório: nº de camas. Privativo e tenda: nº máximo de hóspedes. */
  capacity: number
  beds: string[]
  bathroom: 'privativo' | 'comunitário'
  priceFrom: number
  priceUnit: 'pessoa' | 'quarto'
  minNightsHolidays: number
  amenities: AmenityKey[]
  included: string[]
  photos: Photo[]
}
