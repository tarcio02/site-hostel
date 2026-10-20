import type { Accommodation, AmenityKey } from '../types'

/*
 * As 3 acomodações do hostel, conforme o anúncio no Booking:
 * nome, camas, nº de hóspedes, Wi-Fi e preço "a partir de" (valores de referência do Booking).
 * Fotos reais em public/fotos/. Descrições e o que mais estiver marcado com [PREENCHER] ainda são provisórios.
 */

/** Foto real em public/fotos/: <nome>.webp (1200px) e <nome>-mini.webp (miniatura) */
const foto = (name: string, alt: string) => ({ src: `/fotos/${name}.webp`, thumb: `/fotos/${name}-mini.webp`, alt })

/* Iguais para todas as acomodações */
const incluso = ['Acesso à lavanderia', 'Cozinha comunitária', 'Estacionamento']
const comodidades: AmenityKey[] = ['wifi', 'redario', 'fogueira', 'atividades']

export const accommodations: Accommodation[] = [
  {
    id: 'quarto-duplo',
    slug: 'quarto-duplo',
    name: 'Quarto Duplo',
    kind: 'privativo',
    accent: 'pessego',
    summary: 'Quarto privativo com cama de casal, para até duas pessoas. Sozinho, a diária sai a partir de R$ 86.',
    description:
      '[PREENCHER] Descrição real do quarto. Ex.: como é o quarto, a vista, se tem janela para a mata, ventilador, onde fica o banheiro.',
    capacity: 2,
    beds: ['1 cama de casal'],
    bathroom: 'comunitário',
    priceFrom: 126,
    priceUnit: 'quarto',
    minNightsHolidays: 3, // [PREENCHER] confirmar
    amenities: comodidades,
    included: incluso,
    photos: [
      foto('quarto-duplo-1', 'Quarto com colcha de mandalas, janela grande para a mata, vitral em forma de folha e estante de madeira'),
      foto('quarto-duplo-2', 'Vista da cama para a janela, com árvores, flores amarelas e céu azul'),
      foto('quarto-duplo-3', 'Cama de casal com colcha florida e janela de madeira com cortina branca'),
      foto('quarto-duplo-4', 'Cama de casal com colcha florida entre a janela de madeira e uma luminária de chão'),
      foto('quarto-duplo-5', 'Janela em arco com portinhola de madeira aberta para as árvores, ventilador e cabide na parede'),
    ],
  },
  {
    id: 'tenda',
    slug: 'tenda',
    name: 'Tenda',
    feminine: true,
    kind: 'tenda',
    accent: 'verde',
    summary: 'Uma tenda só sua, para até duas pessoas, para dormir pertinho da natureza.',
    description:
      '[PREENCHER] Descrição real da tenda. Ex.: onde ficam as tendas, se são cobertas, o que tem dentro, onde fica o banheiro.',
    capacity: 2,
    beds: ['1 cama de solteiro'], // [PREENCHER] confirmar a cama quando são 2 pessoas
    // [PREENCHER] o preço é o do Booking para 1 pessoa; confirmar o valor para 2
    bathroom: 'comunitário',
    priceFrom: 52,
    priceUnit: 'pessoa',
    minNightsHolidays: 3, // [PREENCHER] confirmar
    amenities: comodidades,
    included: incluso,
    photos: [
      foto('tenda-1', 'Tendas cobertas por lonas azuis e cinzas entre as árvores, com chão de terra sombreado'),
      foto('tenda-2', 'Barraca azul montada debaixo de uma lona, no meio das árvores'),
      foto('tenda-3', 'Interior da barraca com colchão de solteiro, lençol, travesseiro e toalha dobrada'),
    ],
  },
  {
    id: 'dormitorio',
    slug: 'dormitorio',
    name: 'Dormitório',
    kind: 'dormitorio',
    dormGender: 'misto', // [PREENCHER] confirmar se é misto
    accent: 'azul',
    summary: 'Cama de solteiro em dormitório compartilhado, para quem viaja leve e gosta de conhecer gente da estrada.',
    description:
      '[PREENCHER] Descrição real do dormitório. Ex.: quantas camas, se são beliches, armário, tomada, onde fica o banheiro.',
    capacity: 6, // [PREENCHER] nº de camas do dormitório
    beds: ['Cama de solteiro (preço por cama)'],
    bathroom: 'comunitário',
    priceFrom: 65,
    priceUnit: 'pessoa',
    minNightsHolidays: 3, // [PREENCHER] confirmar
    amenities: comodidades,
    included: incluso,
    photos: [
      foto('dormitorio-1', 'Beliche de madeira com escada, iluminado pelo sol, e um gato na porta que dá para a sala'),
      foto('dormitorio-2', 'Cama de solteiro com lençol azul, estante de madeira e janela para as bananeiras'),
      foto('dormitorio-3', 'Beliche de madeira com escada, lençóis azul e rosa e uma estante ao lado'),
    ],
  },
]

export const getAccommodationBySlug = (slug: string) => accommodations.find((a) => a.slug === slug)
export const getAccommodationById = (id: string) => accommodations.find((a) => a.id === id)
