import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { ISODate } from '../types'
import { isValidISO, todayISO, validateRange } from '../lib/dates'

export const MAX_GUESTS = 6

export interface SearchState {
  checkIn: ISODate | null
  checkOut: ISODate | null
  guests: number
}

/**
 * Busca (datas + hóspedes) guardada na URL: ?checkin=AAAA-MM-DD&checkout=AAAA-MM-DD&hospedes=N
 * Assim ela acompanha o visitante entre páginas e o link pode ser compartilhado.
 * Valores inválidos ou no passado são ignorados.
 */
export function useSearchState() {
  const [params, setParams] = useSearchParams()

  const state = useMemo<SearchState>(() => {
    const today = todayISO()
    const rawIn = params.get('checkin')
    const rawOut = params.get('checkout')
    const checkIn = isValidISO(rawIn) && rawIn >= today ? rawIn : null
    const checkOut = checkIn && isValidISO(rawOut) && rawOut > checkIn ? rawOut : null
    const g = Number(params.get('hospedes'))
    const guests = Number.isInteger(g) && g >= 1 && g <= MAX_GUESTS ? g : 1
    return { checkIn, checkOut, guests }
  }, [params])

  const setSearch = useCallback(
    (next: SearchState) => {
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          if (next.checkIn) p.set('checkin', next.checkIn)
          else p.delete('checkin')
          if (next.checkOut) p.set('checkout', next.checkOut)
          else p.delete('checkout')
          p.set('hospedes', String(next.guests))
          return p
        },
        { replace: true, preventScrollReset: true },
      )
    },
    [setParams],
  )

  const hasValidRange = validateRange(state.checkIn, state.checkOut) === null

  return { ...state, hasValidRange, setSearch, queryString: params.toString() }
}
