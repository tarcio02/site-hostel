import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { navLinks, siteConfig } from '../../config/site'
import { buttonClasses } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import { NavItem } from './NavItem'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { pathname, search } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // fecha ao trocar de página
  useEffect(() => setOpen(false), [pathname])

  // menu aberto: foco no primeiro link, Esc fecha e devolve o foco ao botão
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  // na página de detalhes, "Reservar" leva à caixa de reserva da própria página
  const onDetailPage = pathname.startsWith('/acomodacoes/')
  const reserveClass = buttonClasses('primary', 'sm', 'sm:px-5 sm:text-base')
  const linkClass = 'rounded-md px-1 py-1 font-bold text-marrom-texto transition-colors hover:text-terracota-escuro'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? 'border-marrom/15 bg-creme-claro/95 shadow-[0_6px_20px_-14px_rgba(74,52,38,0.6)] backdrop-blur'
          : 'border-transparent bg-creme-claro/80 backdrop-blur-sm'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-full focus:bg-terracota focus:px-4 focus:py-2 focus:text-creme-claro"
      >
        Pular para o conteúdo
      </a>

      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to={{ pathname: '/', search }} aria-label={`${siteConfig.name} — início`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavItem hash={l.href} className={linkClass}>
                  {l.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {onDetailPage ? (
            <a href="#reservar" className={reserveClass}>
              Reservar
            </a>
          ) : (
            <NavItem hash="#reservar" className={reserveClass}>
              Reservar
            </NavItem>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-terracota-escuro hover:bg-creme md:hidden"
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'fechar' : 'menu'} size={26} />
          </button>
        </div>
      </div>

      <div
        id="menu-celular"
        ref={panelRef}
        hidden={!open}
        className="border-t border-marrom/15 bg-creme-claro px-4 pb-6 md:hidden"
      >
        <nav aria-label="Menu do celular">
          <ul className="divide-y divide-marrom/15">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavItem hash={l.href} onClick={close} className="block py-4 font-display text-xl text-terracota">
                  {l.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
