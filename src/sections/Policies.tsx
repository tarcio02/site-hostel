import { policies } from '../data/content'
import { Icon } from '../components/ui/Icon'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

export function Policies() {
  return (
    <Section id="politicas" labelledBy="politicas-title">
      <SectionTitle id="politicas-title" eyebrow="Combinados" title="Políticas da casa" />
      <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {policies.map((p) => (
          <div key={p.title} className="flex gap-4 border-b border-dashed border-marrom/35 pb-6">
            <Icon name={p.icon} size={26} className="mt-0.5 shrink-0 text-terracota" />
            <div>
              <dt className="font-bold">{p.title}</dt>
              <dd className="mt-1 leading-relaxed">{p.text}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  )
}
