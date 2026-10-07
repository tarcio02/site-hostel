import { useId, useState, type ReactNode } from 'react'
import { Icon } from './Icon'

export interface AccordionItem {
  title: string
  content: ReactNode
}

/**
 * Acordeão acessível: cada pergunta é um <button> com aria-expanded e
 * aria-controls, navegável com Tab e acionado com Enter/Espaço.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="divide-y divide-marrom/25 overflow-hidden rounded-artesanal border border-marrom/25 bg-creme-claro">
      {items.map((item, i) => {
        const isOpen = open === i
        const buttonId = `${baseId}-btn-${i}`
        const panelId = `${baseId}-panel-${i}`
        return (
          <div key={item.title}>
            <h3 className="font-sans text-base text-marrom-texto">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-bold hover:bg-creme/60 sm:px-6"
              >
                {item.title}
                <Icon
                  name="chevron-baixo"
                  className={`shrink-0 text-terracota transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-relaxed sm:px-6"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
