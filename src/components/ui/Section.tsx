import type { ReactNode } from 'react'

interface Props {
  id: string
  /** Fundos alternados: creme ou creme-claro */
  tone?: 'creme' | 'claro'
  labelledBy?: string
  className?: string
  children: ReactNode
}

export function Section({ id, tone = 'creme', labelledBy, className = '', children }: Props) {
  const bg = tone === 'claro' ? 'bg-creme-claro' : ''
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24 ${bg} ${className}`}
    >
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
