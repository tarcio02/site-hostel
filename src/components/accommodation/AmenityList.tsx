import type { AmenityKey } from '../../types'
import { Icon, type IconName } from '../ui/Icon'

export const amenityInfo: Record<AmenityKey, { icon: IconName; label: string }> = {
  wifi: { icon: 'wifi', label: 'Wi-Fi' },
  redario: { icon: 'rede', label: 'Redário' },
  fogueira: { icon: 'fogueira', label: 'Fogueira' },
  atividades: { icon: 'pessoas', label: 'Atividades em grupo' },
}

/** compact: só ícones (com nome acessível), usado nos cards. */
export function AmenityList({ items, compact = false }: { items: AmenityKey[]; compact?: boolean }) {
  if (compact) {
    return (
      <ul className="flex flex-wrap gap-2" aria-label="Comodidades">
        {items.map((key) => (
          <li
            key={key}
            title={amenityInfo[key].label}
            className="grid h-9 w-9 place-items-center rounded-full bg-creme text-terracota-escuro"
          >
            <Icon name={amenityInfo[key].icon} size={19} label={amenityInfo[key].label} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((key) => (
        <li key={key} className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-creme text-terracota-escuro">
            <Icon name={amenityInfo[key].icon} size={20} />
          </span>
          {amenityInfo[key].label}
        </li>
      ))}
    </ul>
  )
}
