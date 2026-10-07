import { ButtonLink } from '../components/ui/Button'
import { MandalaDivider } from '../components/ui/MandalaDivider'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFound() {
  usePageTitle('Página não encontrada · Iniã Casa Hostel')
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="text-4xl">Ih, essa trilha não existe</h1>
      <MandalaDivider className="my-5" />
      <p className="mb-8 text-lg">A página que você procurou não foi encontrada.</p>
      <ButtonLink to="/">Voltar para o início</ButtonLink>
    </div>
  )
}
