import { useEffect, useState, type FormEvent } from 'react'
import { MAX_GUESTS, useSearchState } from '../../hooks/useSearchState'
import { validateRange } from '../../lib/dates'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { DateRangeFields } from './DateRangeFields'
import { GuestSelector } from './GuestSelector'

/** Barra de busca do hero. Ao enviar, grava a busca na URL e rola até os quartos. */
export function SearchBar() {
  const search = useSearchState()
  const [draft, setDraft] = useState({ checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests })
  const [error, setError] = useState<string | null>(null)

  // mantém o rascunho em sincronia se a URL mudar (ex.: voltar no navegador)
  useEffect(() => {
    setDraft({ checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests })
  }, [search.checkIn, search.checkOut, search.guests])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const problem = validateRange(draft.checkIn, draft.checkOut)
    setError(problem)
    if (problem) return
    search.setSearch(draft)
    document.getElementById('quartos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form
      id="reservar"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Buscar disponibilidade"
      className="rounded-artesanal border border-marrom/20 bg-creme-claro/95 p-4 shadow-[0_18px_40px_-20px_rgba(74,52,38,0.55)] backdrop-blur sm:p-5"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-[1fr_1fr_1.1fr_auto] md:items-end">
        <DateRangeFields
          checkIn={draft.checkIn}
          checkOut={draft.checkOut}
          onChange={(range) => {
            setDraft((d) => ({ ...d, ...range }))
            setError(null)
          }}
        />
        <GuestSelector
          className="col-span-2 md:col-span-1"
          value={draft.guests}
          max={MAX_GUESTS}
          onChange={(guests) => setDraft((d) => ({ ...d, guests }))}
        />
        <Button type="submit" size="lg" className="col-span-2 md:col-span-1">
          <Icon name="calendario" size={20} />
          Ver disponibilidade
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-3 flex items-center gap-2 text-sm font-bold text-terracota-escuro">
          <Icon name="info" size={18} /> {error}
        </p>
      )}
    </form>
  )
}
