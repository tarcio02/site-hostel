import { useState } from 'react'
import { fullAddress, siteConfig } from '../config/site'
import { routes } from '../data/content'
import { Button, ButtonAnchor } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

export function HowToGet() {
  // o mapa só carrega quando o visitante pede: economiza dados em conexões fracas
  const [showMap, setShowMap] = useState(false)

  return (
    <Section id="como-chegar" labelledBy="chegar-title">
      <SectionTitle id="chegar-title" eyebrow="Como chegar" title="O caminho até o Capão">
        <p className="flex items-start justify-center gap-2">
          <Icon name="pin" className="mt-1 shrink-0 text-terracota-escuro" />
          {fullAddress()}
        </p>
      </SectionTitle>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-artesanal border border-marrom/25 bg-creme-claro lg:aspect-auto lg:min-h-[26rem]">
          {showMap ? (
            <iframe
              title={`Mapa: localização do ${siteConfig.name}`}
              src={siteConfig.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <img src="/placeholders/mapa.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" />
              <div className="relative flex flex-col items-center gap-3 rounded-artesanal bg-creme-claro/90 p-5">
                <Icon name="mapa" size={36} className="text-terracota" />
                <Button onClick={() => setShowMap(true)}>Carregar mapa</Button>
                <ButtonAnchor variant="ghost" size="sm" href={siteConfig.mapLink} target="_blank" rel="noopener noreferrer">
                  Abrir no Google Maps
                </ButtonAnchor>
              </div>
            </div>
          )}
        </div>

        <ol className="space-y-4">
          {routes.map((r) => (
            <li key={r.from} className="rounded-artesanal border border-marrom/20 bg-creme-claro p-5">
              <h3 className="mb-2 flex items-center gap-2 text-xl">
                <Icon name={r.icon} className="text-laranja-queimado" />
                {r.from}
              </h3>
              <ul className="space-y-2">
                {r.steps.map((s) => (
                  <li key={s} className="flex gap-2 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracota" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
