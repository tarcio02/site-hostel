import { fullAddress, navLinks, siteConfig } from '../../config/site'
import { GENERIC_MESSAGE, whatsappUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'
import { MandalaDivider } from '../ui/MandalaDivider'
import { Logo } from './Logo'
import { NavItem } from './NavItem'

export function Footer() {
  const year = new Date().getFullYear()
  const linkClass = 'inline-flex items-center gap-2 font-semibold text-terracota-escuro underline-offset-4 hover:underline'

  return (
    <footer id="contato" className="relative isolate overflow-hidden border-t border-marrom/25 bg-creme-claro px-4 pt-14 pb-28 sm:px-6">
      <div className="aquarela -top-16 -left-20 h-56 w-72 bg-rosa" aria-hidden="true" />
      <div className="aquarela -right-16 bottom-10 h-56 w-64 bg-azul" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo className="h-16" />
          <p className="max-w-sm leading-relaxed">{siteConfig.tagline}</p>
          <p className="flex items-start gap-2">
            <Icon name="pin" className="mt-0.5 shrink-0 text-terracota-escuro" />
            <span>{fullAddress()}</span>
          </p>
          <a className={linkClass} href={siteConfig.mapLink} target="_blank" rel="noopener noreferrer">
            <Icon name="mapa" size={18} /> Ver no mapa
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-xl">Contato</h2>
          <ul className="space-y-3">
            <li>
              <a className={linkClass} href={whatsappUrl(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={20} /> {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              <a className={`${linkClass} break-all`} href={`mailto:${siteConfig.email}`}>
                <Icon name="email" size={20} /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a className={linkClass} href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={20} /> {siteConfig.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Atalhos do rodapé">
          <h2 className="mb-4 text-xl">Navegue</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavItem hash={l.href} className={linkClass}>
                  {l.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <MandalaDivider className="relative my-10" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {year} {siteConfig.name}
        </p>
        <p>
          CNPJ {siteConfig.legal.cnpj} · Cadastur {siteConfig.legal.cadastur}
        </p>
      </div>
    </footer>
  )
}
