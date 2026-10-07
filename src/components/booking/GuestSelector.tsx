import { useId } from 'react'
import { fieldLabel } from './DateRangeFields'

interface Props {
  value: number
  onChange: (value: number) => void
  max: number
  className?: string
}

export function GuestSelector({ value, onChange, max, className = '' }: Props) {
  const id = useId()
  const btn =
    'grid h-9 w-9 place-items-center rounded-full border-2 border-terracota text-xl leading-none font-bold text-terracota-escuro hover:bg-terracota hover:text-creme-claro disabled:border-marrom/30 disabled:text-marrom/50 disabled:hover:bg-transparent'

  return (
    <div className={className} role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className={fieldLabel}>
        Hóspedes
      </span>
      <div className="flex items-center justify-between gap-2 rounded-xl border border-marrom/40 bg-creme-claro px-2 py-1">
        <button
          type="button"
          className={btn}
          onClick={() => onChange(value - 1)}
          disabled={value <= 1}
          aria-label="Diminuir hóspedes"
        >
          −
        </button>
        <output aria-live="polite" className="min-w-[5.5rem] text-center font-bold">
          {value} {value === 1 ? 'pessoa' : 'pessoas'}
        </output>
        <button
          type="button"
          className={btn}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label="Aumentar hóspedes"
        >
          +
        </button>
      </div>
    </div>
  )
}
