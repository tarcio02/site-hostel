import type { Accommodation, AmenityKey } from '../types'

/*
 * As acomodações do hostel (dados de referência do Booking):
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
    id: 'janelao',
    slug: 'janelao',
    name: 'Janelão',
    kind: 'privativo',
    accent: 'pessego',
    summary: 'Quarto privativo com um janelão aberto para a mata, para até duas pessoas.',
    description:
      '[PREENCHER] Descrição real do quarto. Ex.: como é o quarto, a vista do janelão, o vitral, ventilador, onde fica o banheiro.',
    capacity: 2,
    beds: ['1 cama de casal'], // [PREENCHER] confirmar a cama
    bathroom: 'comunitário',
    priceFrom: 126, // [PREENCHER] confirmar (valor do antigo "Quarto Duplo"; o preço não aparece no site)
    priceUnit: 'quarto',
    minNightsHolidays: 3, // [PREENCHER] confirmar
    amenities: comodidades,
    included: incluso,
    photos: [
      foto('janelao-1', 'Quarto com colcha de mandalas, janela grande para a mata, vitral em forma de folha e estante de madeira'),
      foto('janelao-2', 'Vista da cama para o janelão, com árvores, flores amarelas e céu azul'),
    ],
  },
  {
    id: 'rustico',
    slug: 'rustico',
    name: 'Rústico',
    kind: 'privativo',
    accent: 'rosa',
    summary: 'Quarto privativo de madeira e janelas para a mata, para até duas pessoas.',
    description:
      '[PREENCHER] Descrição real do quarto. Ex.: como é o quarto, as janelas, ventilador, onde fica o banheiro.',
    capacity: 2,
    beds: ['1 cama de casal'], // [PREENCHER] confirmar a cama
    bathroom: 'comunitário',
    priceFrom: 126, // [PREENCHER] confirmar (valor do antigo "Quarto Duplo"; o preço não aparece no site)
    priceUnit: 'quarto',
    minNightsHolidays: 3, // [PREENCHER] confirmar
    amenities: comodidades,
    included: incluso,
    photos: [
      foto('rustico-1', 'Cama de casal com colcha florida entre a janela de madeira e uma luminária de chão'),
      foto('rustico-2', 'Janela em arco com portinhola de madeira aberta para as árvores, ventilador e cabide na parede'),
      foto('rustico-3', 'Cama de casal com colcha florida e janela de madeira com cortina branca'),
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
      foto('tenda-capa', 'Barraca azul montada debaixo de uma lona azul, no meio das árvores, com o chão coberto de folhas secas'),
      foto('tenda-1','Tendas cobertas por lonas azuis e cinzas entre as árvores, com chão de terra sombreado'),
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
