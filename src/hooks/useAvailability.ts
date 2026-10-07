import { useEffect, useState } from 'react'
import type { AvailabilityResult, DayAvailability, ISODate } from '../types'
import { getAvailability, getCalendar } from '../services/availability'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/** Disponibilidade de todas as acomodações para o período. Inativo sem datas válidas. */
export function useAvailability(checkIn: ISODate | null, checkOut: ISODate | null, guests: number, enabled: boolean) {
  const [state, setState] = useState<AsyncState<Map<string, AvailabilityResult>>>({
    data: null,
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!enabled || !checkIn || !checkOut) {
      setState({ data: null, loading: false, error: null })
      return
    }
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    getAvailability(checkIn, checkOut, guests)
      .then((results) => {
        if (!cancelled) setState({ data: new Map(results.map((r) => [r.accommodationId, r])), loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Erro ao consultar disponibilidade.' })
      })
    return () => {
      cancelled = true
    }
  }, [checkIn, checkOut, guests, enabled])

  return state
}

/** Situação noite a noite de uma acomodação, para o calendário. */
export function useCalendar(accommodationId: string, from: ISODate, to: ISODate, guests: number) {
  const [state, setState] = useState<AsyncState<Map<ISODate, DayAvailability>>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    getCalendar(accommodationId, from, to, guests)
      .then((days) => {
        if (!cancelled) setState({ data: new Map(days.map((d) => [d.date, d])), loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Erro ao carregar o calendário.' })
      })
    return () => {
      cancelled = true
    }
  }, [accommodationId, from, to, guests])

  return state
}
