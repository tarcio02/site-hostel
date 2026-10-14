/**
 * Configuração central do site.
 * Tudo marcado com [PREENCHER] precisa ser substituído pelos dados reais.
 */
export const siteConfig = {
  name: 'Iniã Casa Hostel',
  shortName: 'Iniã',
  tagline: 'Uma casa para descansar entre trilhas e cachoeiras no Vale do Capão.',
  /** Endereço público, sem barra no final. Usado no canonical, nas prévias e no sitemap.
   *  [PREENCHER] trocar pelo domínio definitivo quando houver. */
  siteUrl: 'https://site-hostel.vercel.app',

  /** Apenas números, com DDI e DDD: 55 + 75 + número */
  whatsapp: '5575982453894',
  whatsappDisplay: '(75) 98245-3894',
  email: 'iniacasahostel@gmail.com',
  instagram: {
    handle: '@inia.casa.hostel',
    url: 'https://instagram.com/inia.casa.hostel',
  },

  address: {
    street: 'Rua da Harmonia, 25',
    district: 'Vale do Capão (Caeté-Açu)',
    city: 'Palmeiras',
    state: 'BA',
    zip: '46940-000',
  },

  /** Link "abrir no Google Maps" — por enquanto busca o endereço; [PREENCHER] com o link do perfil do hostel */
  mapLink: 'https://maps.google.com/?q=Rua+da+Harmonia,+25,+Vale+do+Cap%C3%A3o,+Palmeiras+-+BA,+46940-000',
  /** Mapa embutido — [PREENCHER] com o "Incorporar mapa" do Google Maps do hostel */
  mapEmbedUrl:
    'https://www.google.com/maps?q=Rua+da+Harmonia,+25,+Vale+do+Cap%C3%A3o,+Palmeiras+-+BA,+46940-000&output=embed',

  /** Horários do quarto */
  checkInTime: '14h',
  checkOutTime: '12h',
  /** Horários em que o hóspede pode ficar no hostel (áreas comuns, guarda-volumes) */
  hostelOpensAt: '7h',
  hostelClosesAt: '17h',

  legal: {
    cnpj: '[PREENCHER]',
    cadastur: '[PREENCHER]',
  },
} as const

export const navLinks = [
  { label: 'Quartos', href: '#quartos' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'O Vale', href: '#o-vale' },
  { label: 'Como chegar', href: '#como-chegar' },
  { label: 'Contato', href: '#contato' },
] as const

export const fullAddress = () => {
  const a = siteConfig.address
  return `${a.street} · ${a.district}, ${a.city} - ${a.state} · ${a.zip}`
}
