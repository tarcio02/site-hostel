import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Icon } from './Icon'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/**
 * Modal com o <dialog> nativo: o navegador já prende o foco dentro dele,
 * fecha com Esc e devolve o foco a quem abriu. Clicar fora também fecha.
 */
export function Modal({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // o clique cai no próprio <dialog> só quando é no fundo escurecido
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-artesanal border border-marrom/25 bg-creme-claro p-0 text-marrom-texto shadow-[0_24px_60px_-20px_rgba(74,52,38,0.7)] backdrop:bg-marrom-texto/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl leading-tight sm:text-3xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-terracota-escuro hover:bg-creme"
          >
            <Icon name="fechar" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
