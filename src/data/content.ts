import type { AccentColor, Photo } from '../types'
import type { IconName } from '../components/ui/Icon'
import { siteConfig } from '../config/site'

/*
 * Textos das seções da página inicial.
 * Trechos com [PREENCHER] dependem de informações reais do hostel.
 * Informações sobre a região são gerais — revise antes de publicar.
 */

export const about = {
  title: 'E se a Iniã fosse uma pessoa?',
  paragraphs: [
    'Iniã seria aquela pessoa que chega descalça a uma roda de conversa e faz com que toda a gente se sinta confortável para ser quem é.',
    'Não tenta impressionar ninguém, nem convencer alguém a ficar. Acolhe quem chega com respeito e deixa partir quem percebe que aquele não é o seu lugar.',
    'É criativa, espontânea e sensível. Gosta de música, arte, fogueiras, natureza e conversas profundas, mas também sabe respeitar o silêncio.',
    'Não vive para seguir regras sociais; vive de acordo com os seus próprios valores. Valoriza a liberdade, mas entende que a liberdade só existe quando vem acompanhada de responsabilidade e respeito pelo outro.',
  ],
  photos: [
    { src: '/fotos/sobre-casa.webp', alt: 'Casa do hostel com telhado de barro entre bananeiras e árvores, ao lado de uma construção vermelha com porta de madeira' },
    { src: '/fotos/sobre-fogueira.webp', alt: 'Roda de violão em volta da fogueira à noite, com bandeirinhas coloridas e luzes entre as árvores' },
    { src: '/fotos/sobre-quarto.webp', alt: 'Quarto com colcha de mandalas, janela grande para a mata e vitral em forma de folha' },
  ],
}

/* Texto do modal "O que significa a palavra Iniã?", aberto a partir da seção Sobre. */
export const nameMeaning = {
  title: 'O que significa a palavra Iniã?',
  paragraphs: [
    'Iniã é um canto, um rezo indígena presente em contextos cerimoniais dos povos Noke Koi e Yawanawá que vivem na Amazônia.',
    'Existe uma história antiga que nos conta que, antes de nos comunicarmos pelas palavras, falávamos através das frequências e vibrações. Éramos capazes de nos comunicar com toda a floresta, com as árvores, as plantas, os animais, o fogo e as águas.',
    'A palavra veio como uma forma de materializar aquilo que antes era sentido, vibrado e compartilhado de outras maneiras.',
    'De origem na família linguística Pano, Iniã carrega, para mim, muito mais do que a imagem de uma flor. Representa a beleza que floresce sem pressa, a calma dos ciclos da natureza, a leveza do feminino e a potência de existir em toda a nossa essência.',
    'É sobre respeitar o tempo de cada coisa. Sobre compreender que a beleza não precisa de pressa, que a vida acontece em ciclos e que tudo, à sua maneira, encontra o momento de florescer.',
    'Tudo no seu tempo floresce.',
    'E foi com esse sentir que nasceu o Iniã Casa Hostel.',
    'Um espaço de encontro, natureza, arte e conexão, no coração do Vale do Capão, na Chapada Diamantina.',
    'Vem viver essa experiência com a gente. Vem desacelerar, respirar fundo e sentir a beleza de estar presente.',
  ],
  /** frase em destaque, no meio do texto */
  highlight: 'Tudo no seu tempo floresce.',
  signature: 'Iniã Casa Hostel — aqui, a vida floresce no seu tempo.',
}

export interface Facility {
  icon: IconName
  title: string
  text: string
}

export const facilities: Facility[] = [
  { icon: 'cozinha', title: 'Duas cozinhas equipadas', text: 'Duas cozinhas completas para você preparar suas refeições e o lanche da trilha.' },
  { icon: 'rede', title: 'Redário', text: 'Redes à sombra para descansar depois do dia de cachoeira.' },
  { icon: 'folha', title: 'Jardim', text: 'Plantas, passarinhos e céu estrelado à noite.' },
  { icon: 'sofa', title: 'Área de convivência', text: 'Espaço para conversar, ler, tocar um violão e planejar o próximo passeio.' },
  { icon: 'wifi', title: 'Wi-Fi', text: 'Duas redes que cobrem todo o espaço do hostel.' },
  { icon: 'lavanderia', title: 'Lavanderia', text: 'Tanque e varal para lavar suas roupas. Se preferir, tem máquina de lavar, com uma taxa à parte.' },
  { icon: 'carro', title: 'Estacionamento', text: 'Venha tranquilo: contamos com estacionamento para quem chega de carro ou moto.' },
  { icon: 'mochila', title: 'Guarda-volumes', text: 'Deixe a bagagem guardada enquanto faz trilhas de vários dias, como a travessia do Pati.' },
  { icon: 'pata', title: 'Pets fofos', text: 'A casa tem a presença de pets, que vão adorar te receber.' },
]

export interface Experience {
  title: string
  level: string
  duration: string
  text: string
  accent: AccentColor
  /** Foto quadrada (640x640, WebP) em public/fotos/ */
  photo: Photo
}

export const experiences: Experience[] = [
  {
    title: 'Cachoeira da Fumaça',
    photo: { src: '/fotos/cachoeira-da-fumaca.webp', alt: 'Vista aérea da Cachoeira da Fumaça caindo de um paredão de pedra até a mata' },
    level: 'Moderada',
    duration: 'Dia inteiro',
    accent: 'azul',
    text: 'Uma das quedas d’água mais altas do Brasil. A trilha “por cima” sai do próprio Vale e termina num mirante de tirar o fôlego.',
  },
  {
    title: 'Ponte Velha',
    photo: { src: '/fotos/ponte-velha.webp', alt: 'Ponte Velha: queda d’água entre pedras claras e um poço tranquilo para banho' },
    level: 'Leve',
    duration: 'Meio período',
    accent: 'verde',
    text: 'Cachoeira e poços pertinho da vila, perfeitos para um primeiro dia ou para uma tarde sem pressa.',
  },
  {
    title: 'Rio Preto',
    photo: { src: '/fotos/rio-preto.webp', alt: 'Rio Preto: poço de água escura entre pedras, com a mata ao fundo' },
    level: 'Leve',
    duration: 'Meio período',
    accent: 'pessego',
    text: 'Água gelada e revigorante, poço para banho e uma caminhada agradável entre a mata e as pedras.',
  },
  {
    title: 'Vale do Pati',
    photo: { src: '/fotos/vale-do-pati.webp', alt: 'Mirante do Cachoeirão, no Vale do Pati: cânion de paredões cobertos de mata' },
    level: 'Travessia',
    duration: '3 a 5 dias',
    accent: 'lilas',
    text: 'Uma das travessias mais bonitas do país. Saindo do Capão, com guia, e com sua bagagem guardada aqui no hostel.',
  },
]

/* Fora do site por enquanto. Para voltar, renderize de novo em sections/Valley.tsx. */
export const partnerGuides = {
  title: 'Guias parceiros',
  text: '[PREENCHER] Nomes e contatos dos guias locais que vocês indicam. Trilhas longas, como o Pati e a Fumaça por baixo, pedem guia credenciado.',
}

export const villageTips = [
  'Traga dinheiro em espécie: não tem caixa eletrônico na vila (só em Palmeiras) e nem todo lugar aceita cartão.',
  'Só o sinal da Claro pega na vila.',
  'Lanterna, protetor solar, repelente e uma garrafinha de água fazem toda a diferença nas trilhas.',
  'A vila é pequena e dá para fazer quase tudo a pé. À noite, a rua principal ganha vida com restaurantes e empórios.',
  'Toda quinta e todo domingo tem feira: uma riqueza gastronômica e artesanal do Vale.',
  'Aos domingos tem roda de capoeira no Coreto.',
  '[PREENCHER] Dicas pessoais: restaurante preferido, pôr do sol favorito…',
]

/** Van que faz Palmeiras → Vale do Capão. O número abre o WhatsApp. */
export const van = {
  phoneDisplay: '(75) 9883-1860',
  /** Apenas números, com DDI e DDD */
  whatsapp: '557598831860',
  message: `Olá! Peguei seu contato no site do ${siteConfig.name}. Gostaria de saber sobre a van de Palmeiras até o Vale do Capão.`,
}

export interface RouteStep {
  text: string
  /** mostra o contato da van (link para o WhatsApp) depois do texto */
  vanContact?: boolean
}

export interface Route {
  from: string
  icon: IconName
  steps: RouteStep[]
}

/* Revise tempos e distâncias — são aproximados. A van fica sempre como último passo. */
export const routes: Route[] = [
  {
    from: 'De Salvador',
    icon: 'onibus',
    steps: [
      { text: 'De ônibus: a Guanabara tem linhas de Salvador para Palmeiras e Lençóis (cerca de 6 a 7 horas).' },
      { text: 'De carro: cerca de 450 km pela BR-324 e BR-242 até Palmeiras, e de lá mais uns 20 km até o Vale do Capão.' },
      { text: 'De Palmeiras, siga de van até o Vale: R$ 25.', vanContact: true },
    ],
  },
  {
    from: 'De Palmeiras',
    icon: 'carro',
    steps: [
      { text: 'São cerca de 20 km até o Capão. Há táxis e mototáxis na cidade.' },
      { text: 'De van: R$ 25 até o Vale.', vanContact: true },
    ],
  },
  {
    from: 'De Lençóis',
    icon: 'mapa',
    steps: [
      { text: 'Cerca de 70 km passando por Palmeiras (em torno de 1h30 de carro). De ônibus, a Guanabara liga Lençóis a Palmeiras.' },
      { text: 'De Palmeiras, siga de van até o Vale: R$ 25.', vanContact: true },
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
    text: 'Casa linda, cozinha ótima e as melhores dicas de trilha. Voltei com vontade de ficar mais uma semana.',
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
    text: `No quarto: check-in a partir das ${siteConfig.checkInTime} e check-out até as ${siteConfig.checkOutTime}. No hostel: dá para chegar a partir das ${siteConfig.hostelOpensAt} e ficar até as ${siteConfig.hostelClosesAt}, aproveitando as áreas comuns e o guarda-volumes.`,
  },
  {
    icon: 'pix',
    title: 'Pagamento',
    text: 'Para reservar, pedimos 50% do valor antes. Aceitamos Pix e cartões (com taxa de 3%).',
  },
  {
    icon: 'calendario',
    title: 'Cancelamento',
    text: 'Cancelamento gratuito com até 24 horas de antecedência. Depois disso, cobramos 50% do valor da reserva.',
  },
  {
    icon: 'lua',
    title: 'Horário de silêncio',
    text: 'Das 22h às 10h, para que todo mundo descanse e acorde bem para as trilhas.',
  },
  {
    icon: 'pata',
    title: 'Pets',
    text: 'Seu pet é bem-vindo, com um valor adicional na diária. Lembre que a casa também tem os seus pets.',
  },
  {
    icon: 'pessoas',
    title: 'Idade mínima nos dormitórios',
    text: 'Menores de 18 anos são aceitos somente quando acompanhados pelos pais ou responsáveis legais.',
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
      'Não. O caixa eletrônico mais próximo fica em Palmeiras, então vale trazer dinheiro em espécie.',
  },
  {
    question: 'Vocês aceitam cartão?',
    answer: 'Sim, com taxa de 3%. Também aceitamos Pix.',
  },
  {
    question: 'Pega sinal de celular?',
    answer:
      'Na vila, só a Claro pega. Aqui no hostel temos Wi-Fi, mas nas trilhas o sinal costuma sumir. Avise alguém sobre seu roteiro.',
  },
  {
    question: 'Preciso de guia para fazer as trilhas?',
    answer:
      'Trilhas curtas e bem marcadas, como Ponte Velha e Rio Preto, dá para fazer por conta própria. Para trilhas longas ou pouco sinalizadas, como a Fumaça por baixo e a travessia do Pati, recomendamos guia credenciado.',
  },
  {
    question: 'Qual a melhor época para visitar?',
    answer:
      'O Capão é bonito o ano todo. Em geral, de abril a outubro chove menos e as trilhas ficam mais secas. De novembro a março as cachoeiras ficam mais cheias, mas é bom ficar de olho na chuva antes de sair para trilhas longas.',
  },
]
