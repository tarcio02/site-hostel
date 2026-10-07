import type { ReactNode } from 'react'
import type { AccentColor } from '../../types'

const accents: Record<AccentColor, string> = {
  rosa: 'bg-rosa',
  pessego: 'bg-pessego',
  verde: 'bg-verde',
  azul: 'bg-azul',
  // o lilás é escuro demais para texto marrom em cor cheia
  lilas: 'bg-lilas/35',
}

export function Tag({ accent, children }: { accent: AccentColor; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide text-marrom-texto uppercase ${accents[accent]}`}
    >
      {children}
    </span>
  )
}
