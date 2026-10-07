import { facilities } from '../data/content'
import { Icon } from '../components/ui/Icon'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

const iconBg = ['bg-rosa', 'bg-pessego', 'bg-verde/70', 'bg-azul']

export function Facilities() {
  return (
    <Section id="estrutura" labelledBy="estrutura-title">
      <div className="aquarela -bottom-10 -left-16 h-72 w-72 bg-verde" aria-hidden="true" />
      <SectionTitle id="estrutura-title" eyebrow="Estrutura" title="Áreas comuns">
        <p>Tudo o que você precisa para se sentir em casa entre uma trilha e outra.</p>
      </SectionTitle>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f, i) => (
          <li key={f.title} className="flex gap-4 rounded-artesanal border border-marrom/20 bg-creme-claro/80 p-5">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-marrom-texto ${iconBg[i % iconBg.length]}`}>
              <Icon name={f.icon} size={24} />
            </span>
            <div>
              <h3 className="font-sans text-lg font-bold text-marrom-texto">{f.title}</h3>
              <p className="mt-1 leading-relaxed">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
