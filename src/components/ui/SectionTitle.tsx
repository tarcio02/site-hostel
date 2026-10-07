import type { ReactNode } from 'react'
import { MandalaDivider } from './MandalaDivider'

interface Props {
  eyebrow?: string
  title: string
  /** id do <h2>, para o aria-labelledby da seção */
  id?: string
  children?: ReactNode
}

export function SectionTitle({ eyebrow, title, id, children }: Props) {
  return (
    <header className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-bold tracking-[0.18em] text-terracota-escuro uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      <MandalaDivider className="my-4" />
      {children && <div className="text-lg leading-relaxed">{children}</div>}
    </header>
  )
}
