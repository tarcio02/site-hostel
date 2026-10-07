/**
 * Configuração central do site.
 * Tudo marcado com [PREENCHER] precisa ser substituído pelos dados reais.
 */
export const siteConfig = {
  name: 'Iniã Casa Hostel',
  shortName: 'Iniã',
  tagline: 'Uma casa para descansar entre trilhas e cachoeiras no Vale do Capão.',
  siteUrl: 'https://[PREENCHER].com.br',

  /** Apenas números, com DDI e DDD: 55 + 75 + número */
  whatsapp: '5575999999999', // [PREENCHER] número real
  whatsappDisplay: '(75) 99999-9999', // [PREENCHER]
  email: 'contato@[PREENCHER].com.br',
  instagram: {
    handle: '@[PREENCHER]',
    url: 'https://instagram.com/[PREENCHER]',
  },

  address: {
    street: '[PREENCHER] Rua / referência, nº',
    district: 'Vale do Capão (Caeté-Açu)',
    city: 'Palmeiras',
    state: 'BA',
    zip: '[PREENCHER] CEP',
  },

  /** Link "abrir no Google Maps" — [PREENCHER] com o link do perfil do hostel */
  mapLink: 'https://maps.google.com/?q=Vale+do+Cap%C3%A3o,+Palmeiras+-+BA',
  /** Mapa embutido — [PREENCHER] com o "Incorporar mapa" do Google Maps do hostel */
  mapEmbedUrl: 'https://www.google.com/maps?q=Vale+do+Cap%C3%A3o,+Palmeiras+-+BA&output=embed',

  checkInTime: '[PREENCHER] 14h',
  checkOutTime: '[PREENCHER] 11h',

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
