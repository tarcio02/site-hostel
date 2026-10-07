import { experiences, partnerGuides, villageTips } from '../data/content'
import { Icon } from '../components/ui/Icon'
import { LazyImage } from '../components/ui/LazyImage'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Tag } from '../components/ui/Tag'

const stripe = { rosa: 'bg-rosa', pessego: 'bg-pessego', verde: 'bg-verde', azul: 'bg-azul', lilas: 'bg-lilas' } as const

export function Valley() {
  return (
    <Section id="o-vale" tone="claro" labelledBy="vale-title">
      <SectionTitle id="vale-title" eyebrow="O Vale" title="Experiências no Capão">
        <p>Cachoeiras, mirantes e travessias a poucos passos (ou alguns dias) de caminhada.</p>
      </SectionTitle>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {experiences.map((e) => (
          <li key={e.title} className="overflow-hidden rounded-artesanal border border-marrom/20 bg-creme">
            <LazyImage src={e.photo.src} alt={e.photo.alt} width={640} height={480} className="aspect-[4/3] w-full" />
            <span className={`block h-2 ${stripe[e.accent]}`} aria-hidden="true" />
            <div className="p-5">
              <h3 className="text-xl">{e.title}</h3>
              <div className="my-3 flex flex-wrap gap-2">
                <Tag accent={e.accent}>{e.level}</Tag>
                <Tag accent={e.accent}>{e.duration}</Tag>
              </div>
              <p className="leading-relaxed">{e.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-artesanal border-2 border-dashed border-laranja bg-creme-claro p-6">
          <h3 className="flex items-center gap-2 text-xl">
            <Icon name="pessoas" className="text-laranja-queimado" /> {partnerGuides.title}
          </h3>
          <p className="mt-2 leading-relaxed">{partnerGuides.text}</p>
        </div>
        <div className="rounded-artesanal border-2 border-dashed border-laranja bg-creme-claro p-6">
          <h3 className="flex items-center gap-2 text-xl">
            <Icon name="folha" className="text-laranja-queimado" /> Dicas da vila
          </h3>
          <ul className="mt-2 space-y-2">
            {villageTips.map((tip) => (
              <li key={tip} className="flex gap-2 leading-relaxed">
                <Icon name="check" size={18} className="mt-1 shrink-0 text-terracota-escuro" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
