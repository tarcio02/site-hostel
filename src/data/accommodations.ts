import type { Accommodation } from '../types'

/*
 * DADOS DE EXEMPLO — nomes, preços, camas e fotos são fictícios.
 * [PREENCHER] com as acomodações reais. O `id` precisa bater com o
 * usado na fonte de disponibilidade (mock agora, iCal/Supabase depois).
 */

const ph = (file: string) => `/placeholders/${file}`

export const accommodations: Accommodation[] = [
  {
    id: 'dorm-misto',
    slug: 'dormitorio-misto',
    name: 'Dormitório Misto',
    kind: 'dormitorio',
    dormGender: 'misto',
    accent: 'verde',
    summary: 'Seis camas em beliches, janela para o jardim e clima de troca entre viajantes.',
    description:
      '[PREENCHER] Descrição real. Exemplo: dormitório arejado com três beliches de madeira, cortina individual em cada cama e janela para o jardim. Ótimo para quem chega para fazer trilhas e quer conhecer gente da estrada.',
    capacity: 6,
    units: 6,
    beds: ['3 beliches (6 camas de solteiro)'],
    bathroom: 'compartilhado',
    priceFrom: 80,
    priceUnit: 'pessoa',
    minNightsHolidays: 3,
    amenities: ['wifi', 'cafe', 'armario', 'tomada', 'ventilador', 'roupa-de-cama', 'banheiro-compartilhado'],
    included: [
      'Roupa de cama',
      'Café da manhã',
      'Armário individual com cadeado',
      'Ventilador',
      'Tomada e luz de leitura em cada cama',
      'Toalha (aluguel à parte) [PREENCHER]',
    ],
    photos: [
      { src: '/fotos/dorm-misto.webp', alt: 'Dormitório com beliches de madeira e janela para as montanhas (imagem ilustrativa)' },
      { src: ph('dorm-misto-banheiro.svg'), alt: 'Banheiro compartilhado do dormitório misto (foto ilustrativa)' },
      { src: ph('dorm-misto-vista.svg'), alt: 'Vista da janela para o jardim (foto ilustrativa)' },
    ],
  },
  {
    id: 'dorm-feminino',
    slug: 'dormitorio-feminino',
    name: 'Dormitório Feminino',
    kind: 'dormitorio',
    dormGender: 'feminino',
    accent: 'rosa',
    summary: 'Quatro camas só para mulheres, com banheiro exclusivo do quarto.',
    description:
      '[PREENCHER] Descrição real. Exemplo: dormitório exclusivo para mulheres, com dois beliches, espelho grande, cabideiro e banheiro de uso exclusivo das hóspedes do quarto.',
    capacity: 4,
    units: 4,
    beds: ['2 beliches (4 camas de solteiro)'],
    bathroom: 'privativo',
    priceFrom: 90,
    priceUnit: 'pessoa',
    minNightsHolidays: 3,
    amenities: ['wifi', 'cafe', 'armario', 'tomada', 'ventilador', 'roupa-de-cama', 'toalha', 'banheiro-privativo'],
    included: [
      'Roupa de cama',
      'Toalha',
      'Café da manhã',
      'Armário individual com cadeado',
      'Ventilador',
      'Tomada e luz de leitura em cada cama',
    ],
    photos: [
      { src: '/fotos/dorm-feminino.webp', alt: 'Dormitório feminino com beliches de madeira e cortinas rosadas (imagem ilustrativa)' },
      { src: ph('dorm-feminino-banheiro.svg'), alt: 'Banheiro exclusivo do dormitório feminino (foto ilustrativa)' },
      { src: ph('dorm-feminino-vista.svg'), alt: 'Vista das montanhas a partir do quarto (foto ilustrativa)' },
    ],
  },
  {
    id: 'quarto-casal',
    slug: 'quarto-casal',
    name: 'Quarto Casal',
    kind: 'privativo',
    accent: 'pessego',
    summary: 'Cama de casal, banheiro privativo e uma varandinha para ver o morro.',
    description:
      '[PREENCHER] Descrição real. Exemplo: quarto privativo aconchegante com cama de casal, banheiro próprio e varanda com rede para descansar depois da trilha.',
    capacity: 2,
    units: 1,
    beds: ['1 cama de casal'],
    bathroom: 'privativo',
    priceFrom: 220,
    priceUnit: 'quarto',
    minNightsHolidays: 3,
    amenities: ['wifi', 'cafe', 'ventilador', 'tomada', 'roupa-de-cama', 'toalha', 'banheiro-privativo', 'varanda'],
    included: ['Roupa de cama', 'Toalhas', 'Café da manhã', 'Ventilador', 'Tomadas ao lado da cama', 'Varanda com rede'],
    photos: [
      { src: '/fotos/quarto-casal.webp', alt: 'Quarto casal com cama de casal e janela para o morro (imagem ilustrativa)' },
      { src: ph('casal-banheiro.svg'), alt: 'Banheiro privativo do quarto casal (foto ilustrativa)' },
      { src: ph('casal-vista.svg'), alt: 'Varanda com rede e vista para o morro (foto ilustrativa)' },
    ],
  },
  {
    id: 'quarto-familia',
    slug: 'quarto-familia',
    name: 'Quarto Família',
    kind: 'privativo',
    accent: 'azul',
    summary: 'Espaço para até quatro pessoas: cama de casal e beliche, com banheiro privativo.',
    description:
      '[PREENCHER] Descrição real. Exemplo: quarto amplo para famílias ou grupos de amigos, com cama de casal, um beliche, mesa pequena e banheiro privativo.',
    capacity: 4,
    units: 1,
    beds: ['1 cama de casal', '1 beliche (2 camas de solteiro)'],
    bathroom: 'privativo',
    priceFrom: 340,
    priceUnit: 'quarto',
    minNightsHolidays: 4,
    amenities: ['wifi', 'cafe', 'ventilador', 'tomada', 'roupa-de-cama', 'toalha', 'banheiro-privativo'],
    included: ['Roupa de cama', 'Toalhas', 'Café da manhã', 'Ventilador', 'Tomadas individuais', 'Armário grande'],
    photos: [
      { src: '/fotos/quarto-familia.webp', alt: 'Quarto família com cama de casal e beliche (imagem ilustrativa)' },
      { src: ph('familia-banheiro.svg'), alt: 'Banheiro privativo do quarto família (foto ilustrativa)' },
      { src: ph('familia-vista.svg'), alt: 'Vista do jardim a partir do quarto família (foto ilustrativa)' },
    ],
  },
]

export const getAccommodationBySlug = (slug: string) => accommodations.find((a) => a.slug === slug)
export const getAccommodationById = (id: string) => accommodations.find((a) => a.id === id)
