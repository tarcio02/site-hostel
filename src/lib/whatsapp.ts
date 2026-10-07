import { siteConfig } from '../config/site'
import type { ISODate } from '../types'
import { countNights, formatDayMonth, plural } from './dates'

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}

export const GENERIC_MESSAGE = `Olá! Vim pelo site do ${siteConfig.shortName} e gostaria de mais informações.`

export function bookingMessage(params: {
  accommodationName: string
  checkIn: ISODate
  checkOut: ISODate
  guests: number
}): string {
  const { accommodationName, checkIn, checkOut, guests } = params
  const nights = countNights(checkIn, checkOut)
  return (
    `Olá! Vim pelo site e gostaria de reservar o *${accommodationName}* ` +
    `de *${formatDayMonth(checkIn)}* a *${formatDayMonth(checkOut)}* ` +
    `(${plural(nights, 'noite', 'noites')}) para *${plural(guests, 'pessoa', 'pessoas')}*. Está disponível?`
  )
}
