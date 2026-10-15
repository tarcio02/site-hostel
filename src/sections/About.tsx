import { useState } from 'react'
import { about, nameMeaning } from '../data/content'
import { LazyImage } from '../components/ui/LazyImage'
import { MandalaDivider } from '../components/ui/MandalaDivider'
import { Modal } from '../components/ui/Modal'

export function About() {
  const [main, ...others] = about.photos
  const [meaningOpen, setMeaningOpen] = useState(false)

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div className="aquarela -top-10 right-0 h-64 w-64 bg-pessego" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="mb-2 text-sm font-bold tracking-[0.18em] text-terracota-escuro uppercase">Sobre o hostel</p>
          <h2 id="sobre-title" className="text-3xl leading-tight sm:text-4xl">
            {about.title}
          </h2>
          <MandalaDivider className="my-5 !justify-start" />
          <div className="space-y-4 text-lg leading-relaxed">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMeaningOpen(true)}
            aria-haspopup="dialog"
            className="mt-5 text-sm font-semibold text-terracota-escuro underline decoration-dotted underline-offset-4 hover:decoration-solid"
          >
            {nameMeaning.title}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <LazyImage
            src={main.src}
            alt={main.alt}
            width={960}
            height={720}
            className="col-span-2 aspect-[16/10] w-full rounded-artesanal"
          />
          {others.map((photo) => (
            <LazyImage
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={600}
              className="aspect-square w-full rounded-artesanal"
            />
          ))}
        </div>
      </div>

      <Modal open={meaningOpen} onClose={() => setMeaningOpen(false)} title={nameMeaning.title}>
        <div className="space-y-4 leading-relaxed">
          {nameMeaning.paragraphs.map((p) =>
            p === nameMeaning.highlight ? (
              <p key={p} className="py-2 text-center font-display text-2xl text-terracota italic">
                {p}
              </p>
            ) : (
              <p key={p}>{p}</p>
            ),
          )}
        </div>
        <MandalaDivider className="my-6" />
        <p className="text-center font-display text-lg font-semibold text-terracota-escuro">{nameMeaning.signature}</p>
      </Modal>
    </section>
  )
}
