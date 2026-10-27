import { experiences, partnerGuides, villageTips, whereToEat, type PartnerContact } from '../data/content'
import { Icon } from '../components/ui/Icon'
import { LazyImage } from '../components/ui/LazyImage'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Tag } from '../components/ui/Tag'
import { whatsappUrl } from '../lib/whatsapp'

const stripe = { rosa: 'bg-rosa', pessego: 'bg-pessego', verde: 'bg-verde', azul: 'bg-azul', lilas: 'bg-lilas' } as const

const contactLink = 'inline-flex items-center gap-1.5 font-bold break-all text-terracota-escuro underline underline-offset-4'

/** Nome, descrição e contatos de um guia ou restaurante indicado. */
function ContactCard({ contact: c }: { contact: PartnerContact }) {
  return (
    <>
      <p className="font-display text-lg font-bold">{c.name}</p>
      {c.perk && (
        <p className="mt-1">
          <Tag accent="rosa">{c.perk}</Tag>
        </p>
      )}
      <p className="mt-1 leading-relaxed">{c.text}</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        <li>
          <a
            href={whatsappUrl(c.message, c.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.phoneDisplay}, WhatsApp de ${c.name}`}
            className={`${contactLink} whitespace-nowrap`}
          >
            <Icon name="whatsapp" size={18} /> {c.phoneDisplay}
          </a>
        </li>
        {c.email && (
          <li>
            <a href={`mailto:${c.email}`} className={contactLink}>
              <Icon name="email" size={18} className="shrink-0" /> {c.email}
            </a>
          </li>
        )}
        {c.instagram && (
          <li>
            <a href={c.instagram.url} target="_blank" rel="noopener noreferrer" className={contactLink}>
              <Icon name="instagram" size={18} className="shrink-0" /> {c.instagram.handle}
            </a>
          </li>
        )}
      </ul>
    </>
  )
}

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
          <ul className="mt-4 space-y-4">
            {partnerGuides.guides.map((g) => (
              <li key={g.name} className="border-t border-dashed border-marrom/35 pt-4">
                <ContactCard contact={g} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-artesanal border-2 border-dashed border-laranja bg-creme-claro p-6">
          <h3 className="flex items-center gap-2 text-xl">
            <Icon name="cozinha" className="text-laranja-queimado" /> Onde comer
          </h3>
          <div className="mt-4">
            <ContactCard contact={whereToEat} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-3xl rounded-artesanal border-2 border-dashed border-laranja bg-creme-claro p-6">
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
    </Section>
  )
}
