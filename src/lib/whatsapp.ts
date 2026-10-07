import { siteConfig } from '../config/site'
import type { ISODate } from '../types'
import { countNights, formatDayMonth, plural } from './dates'

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}

export const GENERIC_MESSAGE = `Olá! Vim pelo site do ${siteConfig.shortName} e gostaria de mais informações.`

/**
 * Mensagem do botão "Reservar pelo WhatsApp" da página de uma acomodação.
 * O site não consulta disponibilidade: a mensagem pergunta ao hostel.
 * Sem datas escolhidas, pergunta de forma geral.
 */
export function bookingMessage(params: {
  accommodationName: string
  checkIn: ISODate | null
  checkOut: ISODate | null
  guests: number
}): string {
  const { accommodationName, checkIn, checkOut, guests } = params
  const people = plural(guests, 'pessoa', 'pessoas')
  const greeting = `Olá! Tudo bem? Vim pelo site do ${siteConfig.shortName} e tenho interesse no *${accommodationName}*.`

  if (!checkIn || !checkOut) {
    return `${greeting} Ele está disponível para *${people}*? Ainda estou definindo as datas.`
  }
  const nights = countNights(checkIn, checkOut)
  return (
    `${greeting} Ele está disponível de *${formatDayMonth(checkIn)}* a *${formatDayMonth(checkOut)}* ` +
    `(${plural(nights, 'noite', 'noites')}) para *${people}*? Desde já, agradeço!`
  )
}
