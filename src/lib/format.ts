import type { Accommodation } from '../types'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const formatPrice = (value: number) => brl.format(value)

export function kindLabel(acc: Accommodation): string {
  if (acc.kind === 'privativo') return 'Quarto privativo'
  if (acc.kind === 'tenda') return 'Tenda'
  return acc.dormGender === 'feminino' ? 'Dormitório feminino' : 'Dormitório misto'
}
