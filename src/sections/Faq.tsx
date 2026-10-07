import { faq } from '../data/content'
import { Accordion } from '../components/ui/Accordion'
import { Section } from '../components/ui/Section'
import { SectionTitle } from '../components/ui/SectionTitle'

export function Faq() {
  return (
    <Section id="perguntas" tone="claro" labelledBy="faq-title">
      <SectionTitle id="faq-title" eyebrow="Dúvidas" title="Perguntas frequentes" />
      <div className="mx-auto max-w-3xl">
        <Accordion items={faq.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
      </div>
    </Section>
  )
}
