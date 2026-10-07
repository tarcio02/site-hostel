import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

interface Props {
  /** âncora da página inicial, ex.: "#quartos" */
  hash: string
  className?: string
  onClick?: () => void
  children: ReactNode
}

/**
 * Link para uma seção da página inicial.
 * Na home vira uma âncora simples (rolagem suave, mantém as datas da busca na URL);
 * nas outras páginas navega para "/" + âncora, levando junto a busca.
 */
export function NavItem({ hash, className, onClick, children }: Props) {
  const { pathname, search } = useLocation()
  if (pathname === '/') {
    return (
      <a href={hash} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={{ pathname: '/', search, hash }} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
