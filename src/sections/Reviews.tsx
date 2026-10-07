import { reviews } from '../data/content'
import { Icon } from '../components/ui/Icon'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

const tones = ['bg-rosa/45', 'bg-azul/50', 'bg-verde/40']

export function Reviews() {
  return (
    <Section id="avaliacoes" tone="claro" labelledBy="avaliacoes-title">
      <SectionTitle id="avaliacoes-title" eyebrow="Avaliações" title="Quem passou por aqui" />

      {/* rolagem horizontal no celular, grade no desktop */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {reviews.map((r, i) => (
          <li
            key={r.name}
            className={`flex w-[85%] shrink-0 snap-center flex-col rounded-artesanal p-6 md:w-auto ${tones[i % tones.length]}`}
          >
            <div className="mb-3 flex gap-0.5 text-terracota" role="img" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }, (_, s) => (
                <Icon key={s} name="estrela" size={18} fill="currentColor" />
              ))}
            </div>
            <blockquote className="flex-1 text-lg leading-relaxed">“{r.text}”</blockquote>
            <p className="mt-4 font-bold">{r.name}</p>
            <p className="text-sm">
              {r.origin} · {r.source}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
