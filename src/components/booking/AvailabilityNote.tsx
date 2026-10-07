import type { Accommodation, AvailabilityResult } from '../../types'
import { plural } from '../../lib/dates'
import { Icon } from '../ui/Icon'

/** Texto de disponibilidade usado nos cards e na página de detalhes. */
export function availabilityText(acc: Accommodation, result: AvailabilityResult): { title: string; detail?: string } {
  const isDorm = acc.kind === 'dormitorio'
  const beds = (n: number) => (n === 1 ? 'resta 1 cama' : `restam ${n} camas`)

  switch (result.status) {
    case 'disponivel':
      return { title: 'Disponível nessas datas', detail: isDorm ? beds(result.freeUnits) : undefined }
    case 'excede-capacidade':
      return { title: 'Indisponível nessas datas', detail: `Comporta até ${plural(acc.capacity, 'pessoa', 'pessoas')}` }
    case 'indisponivel':
      return {
        title: 'Indisponível nessas datas',
        detail: isDorm && result.freeUnits > 0 ? `Só ${beds(result.freeUnits)} no período` : undefined,
      }
  }
}

export function AvailabilityNote({ accommodation, result }: { accommodation: Accommodation; result: AvailabilityResult }) {
  const { title, detail } = availabilityText(accommodation, result)
  const ok = result.available
  return (
    <p
      className={`flex items-start gap-2 rounded-xl px-3 py-2 text-sm font-bold ${
        ok ? 'bg-verde/35 text-marrom-texto' : 'bg-marrom/10 text-marrom-texto'
      }`}
    >
      <Icon name={ok ? 'check' : 'info'} size={18} className={`mt-0.5 shrink-0 ${ok ? 'text-marrom-texto' : 'text-terracota-escuro'}`} />
      <span>
        {title}
        {detail && <span className="block font-semibold">{detail.charAt(0).toUpperCase() + detail.slice(1)}</span>}
      </span>
    </p>
  )
}
