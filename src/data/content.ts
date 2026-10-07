import type { AccentColor, Photo } from '../types'
import type { IconName } from '../components/ui/Icon'
import { siteConfig } from '../config/site'

/*
 * Textos das seções da página inicial.
 * Trechos com [PREENCHER] dependem de informações reais do hostel.
 * Informações sobre a região são gerais — revise antes de publicar.
 */

export const about = {
  title: 'Uma casa no meio do Vale',
  paragraphs: [
    '[PREENCHER] Conte a história do Iniã: quem recebe, como a casa surgiu e o que o nome significa.',
    'Aqui a ideia é simples: um lugar tranquilo para dormir bem, cozinhar junto, trocar dicas de trilha e voltar para casa com o pé sujo de terra vermelha e a cabeça leve.',
  ],
  photos: [
    { src: '/fotos/sobre-fachada.webp', alt: 'Entrada do hostel com jardim, varanda e vista para os morros (imagem ilustrativa)' },
    { src: '/fotos/sobre-dormitorio.webp', alt: 'Dormitório com beliches de madeira (imagem ilustrativa)' },
    { src: '/fotos/sobre-varanda.webp', alt: 'Rede na varanda com o pôr do sol no Vale (imagem ilustrativa)' },
  ],
}

export interface Facility {
  icon: IconName
  title: string
  text: string
}

export const facilities: Facility[] = [
  { icon: 'cozinha', title: 'Cozinha compartilhada', text: 'Equipada para você preparar suas refeições e o lanche da trilha.' },
  { icon: 'cafe', title: 'Café da manhã', text: '[PREENCHER] Horário e o que é servido.' },
  { icon: 'rede', title: 'Redário', text: 'Redes à sombra para descansar depois do dia de cachoeira.' },
  { icon: 'folha', title: 'Jardim', text: 'Plantas, passarinhos e céu estrelado à noite.' },
  { icon: 'sofa', title: 'Área de convivência', text: 'Espaço para conversar, ler, tocar um violão e planejar o próximo passeio.' },
  { icon: 'wifi', title: 'Wi-Fi', text: '[PREENCHER] Em quais áreas pega e se a velocidade dá para trabalhar.' },
  { icon: 'lavanderia', title: 'Lavanderia', text: '[PREENCHER] Self-service ou serviço pago, e valores.' },
  { icon: 'carro', title: 'Estacionamento', text: '[PREENCHER] Quantas vagas, se é coberto e se precisa reservar.' },
  { icon: 'mochila', title: 'Guarda-volumes', text: 'Deixe a bagagem guardada enquanto faz trilhas de vários dias, como a travessia do Pati.' },
]

export interface Experience {
  title: string
  level: string
  duration: string
  text: string
  accent: AccentColor
  /** Imagem ilustrativa, não é do lugar exato. [PREENCHER] trocar por foto real. */
  photo: Photo
}

export const experiences: Experience[] = [
  {
    title: 'Cachoeira da Fumaça',
    photo: { src: '/fotos/cachoeira-2.webp', alt: 'Queda d’água alta caindo de um paredão de pedra (imagem ilustrativa)' },
    level: 'Moderada',
    duration: 'Dia inteiro',
    accent: 'azul',
    text: 'Uma das quedas d’água mais altas do Brasil. A trilha “por cima” sai do próprio Vale e termina num mirante de tirar o fôlego.',
  },
  {
    title: 'Riachinho',
    photo: { src: '/fotos/cachoeira-3.webp', alt: 'Cachoeira em degraus de pedra com poço para banho (imagem ilustrativa)' },
    level: 'Leve',
    duration: 'Meio período',
    accent: 'verde',
    text: 'Cachoeira e poços pertinho da vila, perfeitos para um primeiro dia ou para uma tarde sem pressa.',
  },
  {
    title: 'Águas Claras',
    photo: { src: '/fotos/cachoeira-4.webp', alt: 'Poço de água verde-clara ao pé de uma cachoeira (imagem ilustrativa)' },
    level: 'Leve a moderada',
    duration: 'Meio período',
    accent: 'pessego',
    text: 'Água cristalina, poço para banho e uma caminhada agradável entre a mata e as pedras.',
  },
  {
    title: 'Vale do Pati',
    photo: { src: '/fotos/cachoeira-1.webp', alt: 'Cachoeira entre a mata com morros ao fundo (imagem ilustrativa)' },
    level: 'Travessia',
    duration: '3 a 5 dias',
    accent: 'lilas',
    text: 'Uma das travessias mais bonitas do país. Saindo do Capão, com guia, e com sua bagagem guardada aqui no hostel.',
  },
]

export const partnerGuides = {
  title: 'Guias parceiros',
  text: '[PREENCHER] Nomes e contatos dos guias locais que vocês indicam. Trilhas longas, como o Pati e a Fumaça por baixo, pedem guia credenciado.',
}

export const villageTips = [
  'Traga dinheiro em espécie: nem todo lugar na vila aceita cartão e as opções de saque são limitadas.',
  'Lanterna, protetor solar, repelente e uma garrafinha de água fazem toda a diferença nas trilhas.',
  'A vila é pequena e dá para fazer quase tudo a pé. À noite, a rua principal ganha vida com restaurantes e empórios.',
  '[PREENCHER] Dicas pessoais: feira, restaurante preferido, pôr do sol favorito…',
]

export interface Route {
  from: string
  icon: IconName
  steps: string[]
}

/* Revise tempos e distâncias — são aproximados. */
export const routes: Route[] = [
  {
    from: 'De Salvador',
    icon: 'onibus',
    steps: [
      'De ônibus: linhas de Salvador para Palmeiras ou Lençóis (cerca de 6 a 7 horas). [PREENCHER] Empresa e horários atualizados.',
      'De carro: cerca de 450 km pela BR-324 e BR-242 até Palmeiras, e de lá mais uns 20 km até o Vale do Capão.',
    ],
  },
  {
    from: 'De Palmeiras',
    icon: 'carro',
    steps: [
      'São cerca de 20 km até o Capão. Há táxis e mototáxis na cidade.',
      '[PREENCHER] Contato de transfer parceiro e valor médio.',
    ],
  },
  {
    from: 'De Lençóis',
    icon: 'mapa',
    steps: [
      'Cerca de 70 km passando por Palmeiras (em torno de 1h30 de carro).',
      '[PREENCHER] Transfer ou van compartilhada que vocês indicam.',
    ],
  },
]

export interface Review {
  name: string
  origin: string
  text: string
  source: string
}

/* DEPOIMENTOS DE EXEMPLO — substitua por avaliações reais antes de publicar. */
export const reviews: Review[] = [
  {
    name: '[PREENCHER] Hóspede 1',
    origin: 'São Paulo, SP',
    text: 'Casa linda, café da manhã caprichado e as melhores dicas de trilha. Voltei com vontade de ficar mais uma semana.',
    source: 'Avaliação de exemplo',
  },
  {
    name: '[PREENCHER] Hóspede 2',
    origin: 'Buenos Aires, Argentina',
    text: 'Deixei a mochila grande guardada e fui fazer o Pati tranquila. Na volta, banho quente e rede no jardim.',
    source: 'Avaliação de exemplo',
  },
  {
    name: '[PREENCHER] Hóspede 3',
    origin: 'Salvador, BA',
    text: 'Ambiente acolhedor, cozinha organizada e silêncio à noite. Lugar perfeito para descansar no Capão.',
    source: 'Avaliação de exemplo',
  },
]

export interface Policy {
  icon: IconName
  title: string
  text: string
}

export const policies: Policy[] = [
  {
    icon: 'relogio',
    title: 'Check-in e check-out',
    text: `Check-in a partir das ${siteConfig.checkInTime}. Check-out até as ${siteConfig.checkOutTime}. Chegou cedo ou vai sair tarde? Pode deixar a mochila guardada.`,
  },
  {
    icon: 'pix',
    title: 'Pagamento',
    text: 'A reserva é confirmada com um sinal via Pix de [PREENCHER]% do valor total. O restante pode ser pago na chegada em [PREENCHER] formas de pagamento.',
  },
  {
    icon: 'calendario',
    title: 'Cancelamento',
    text: '[PREENCHER] Regra de cancelamento. Ex.: cancelamentos com até X dias de antecedência têm o sinal devolvido ou convertido em crédito.',
  },
  {
    icon: 'lua',
    title: 'Horário de silêncio',
    text: 'Das [PREENCHER] às [PREENCHER], para que todo mundo descanse e acorde cedo para as trilhas.',
  },
  {
    icon: 'pata',
    title: 'Pets',
    text: '[PREENCHER] Aceitam animais? Em quais quartos e com quais condições?',
  },
  {
    icon: 'pessoas',
    title: 'Idade mínima nos dormitórios',
    text: 'Os dormitórios são para maiores de [PREENCHER] anos. Famílias com crianças ficam melhor no Quarto Família.',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'Tem caixa eletrônico na vila?',
    answer:
      '[PREENCHER] Confirme a situação atual. As opções de saque no Vale do Capão são poucas e nem sempre funcionam, então recomendamos trazer dinheiro em espécie.',
  },
  {
    question: 'Vocês aceitam cartão?',
    answer: 'O sinal da reserva é feito via Pix. Na chegada, aceitamos [PREENCHER] (ex.: Pix, dinheiro, débito e crédito).',
  },
  {
    question: 'Pega sinal de celular?',
    answer:
      '[PREENCHER] Quais operadoras funcionam na vila. Aqui no hostel temos Wi-Fi, mas nas trilhas o sinal costuma sumir. Avise alguém sobre seu roteiro.',
  },
  {
    question: 'Preciso de guia para fazer as trilhas?',
    answer:
      'Trilhas curtas e bem marcadas, como Riachinho e Águas Claras, dá para fazer por conta própria. Para trilhas longas ou pouco sinalizadas, como a Fumaça por baixo e a travessia do Pati, recomendamos guia credenciado. Indicamos guias parceiros.',
  },
  {
    question: 'Qual a melhor época para visitar?',
    answer:
      'O Capão é bonito o ano todo. Em geral, de abril a outubro chove menos e as trilhas ficam mais secas. De novembro a março as cachoeiras ficam mais cheias, mas é bom ficar de olho na chuva antes de sair para trilhas longas.',
  },
]
