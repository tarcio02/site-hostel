import { GENERIC_MESSAGE, whatsappUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'

/** Botão flutuante do WhatsApp, presente em todas as páginas. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(GENERIC_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-marrom-texto shadow-[0_8px_24px_-6px_rgba(26,156,75,0.7)] transition-transform hover:scale-105 sm:right-6"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <Icon name="whatsapp" size={30} strokeWidth={2} />
    </a>
  )
}
