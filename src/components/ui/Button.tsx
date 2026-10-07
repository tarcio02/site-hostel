import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

type Variant = 'primary' | 'outline' | 'whatsapp' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-terracota text-creme-claro hover:bg-laranja-queimado shadow-[0_3px_0_var(--color-terracota-escuro)]',
  outline: 'border-2 border-terracota text-terracota-escuro hover:bg-terracota hover:text-creme-claro',
  // texto escuro: branco sobre o verde do WhatsApp não tem contraste suficiente
  whatsapp: 'bg-whatsapp text-marrom-texto hover:brightness-95 shadow-[0_3px_0_#1a9c4b]',
  ghost: 'text-terracota-escuro underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function Button({ variant, size, className, ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClasses(variant, size, className)} {...rest} />
}

/** Link externo (WhatsApp, Instagram, Maps…). */
export function ButtonAnchor({ variant, size, className, ...rest }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses(variant, size, className)} {...rest} />
}

/** Navegação interna do React Router. */
export function ButtonLink({ variant, size, className, ...rest }: CommonProps & LinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...rest} />
}
