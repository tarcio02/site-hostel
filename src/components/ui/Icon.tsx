import type { SVGProps } from 'react'

/* Ícones de traço, desenhados em 24x24. Sem biblioteca externa para manter o site leve. */
const paths = {
  wifi: <><path d="M2.5 9a14 14 0 0 1 19 0" /><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" /><path d="M8.7 15.8a5 5 0 0 1 6.6 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></>,
  cafe: <><path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" /><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 3.5c-.6 1 .6 1.7 0 2.8M12 3.5c-.6 1 .6 1.7 0 2.8" /></>,
  ventilador: <><circle cx="12" cy="11" r="1.6" /><path d="M12 9.4C11 6 12.5 3.5 14.5 4.2s1 4.3-1.6 5.8" /><path d="M13.4 11.9c3.3 1.1 4.6 3.6 3 5s-4.2-1.3-4.1-4.3" /><path d="M10.5 11.4C7.4 13 4.7 12 5 10s3.7-2.2 5.6-.3" /><path d="M12 12.6V20M8.5 20h7" /></>,
  armario: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2.5" /></>,
  tomada: <><rect x="4" y="4" width="16" height="16" rx="5" /><path d="M9.5 9.5v2M14.5 9.5v2" /><path d="M10 15.2h4" /></>,
  'roupa-de-cama': <><path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18" /><path d="M3 15h18M3 18v2M21 18v2" /><rect x="5.5" y="5" width="6" height="4" rx="1.5" /></>,
  toalha: <><path d="M6 4h12v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z" /><path d="M6 8h12M9 14h6M9 17h6" /></>,
  banheiro: <><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" /><path d="M6 12V6a2 2 0 0 1 3.6-1.2" /><path d="M8 19l-1 2M16 19l1 2" /></>,
  varanda: <><path d="M3 9h18M5 9V20M19 9V20M3 20h18" /><path d="M9 9v11M12 9v11M15 9v11" /><path d="M5 9l7-5 7 5" /></>,
  cozinha: <><path d="M4 11h16v2a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7Z" /><path d="M2.5 11h19" /><path d="M9 4.5c-.6 1 .6 2 0 3M12 3.5c-.6 1 .6 2.4 0 3.5M15 4.5c-.6 1 .6 2 0 3" /></>,
  rede: <><path d="M3 5v14M21 5v14" /><path d="M3 8c3 7 15 7 18 0" /><path d="M3 8c4 4 14 4 18 0" /></>,
  folha: <><path d="M5 19C4 11 9 5 19 5c0 10-6 15-14 14Z" /><path d="M5 19 13 11" /></>,
  sofa: <><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" /><path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v4H3Z" /><path d="M5 17v2M19 17v2" /></>,
  lavanderia: <><rect x="4" y="3" width="16" height="18" rx="2.5" /><circle cx="12" cy="13" r="4.5" /><path d="M7 6.5h2M10.5 13.5c1-.8 2-.8 3 0" /></>,
  carro: <><path d="M3.5 15v-3l2-5A2 2 0 0 1 7.4 6h9.2a2 2 0 0 1 1.9 1.3l2 4.7v3" /><rect x="3" y="12" width="18" height="5" rx="1.5" /><path d="M6 17v2M18 17v2M6.5 14.5h1M16.5 14.5h1" /></>,
  mochila: <><path d="M6 10a6 6 0 0 1 12 0v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" /><path d="M9.5 4.5V3.5h5v1" /><path d="M9 21v-5h6v5M6 13h12" /></>,
  onibus: <><rect x="4" y="3.5" width="16" height="14" rx="3" /><path d="M4 11h16M8 17.5V20M16 17.5V20" /><path d="M7.5 14.5h1M15.5 14.5h1" /></>,
  mapa: <><path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z" /><path d="M9 4v14M15 6v14" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10" r="2.4" /></>,
  relogio: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pix: <><path d="m12 3 9 9-9 9-9-9Z" /><path d="m8 12 4-4 4 4-4 4Z" /></>,
  calendario: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  lua: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />,
  pata: <><circle cx="7" cy="10" r="1.8" /><circle cx="10.5" cy="6.2" r="1.8" /><circle cx="15" cy="6.5" r="1.8" /><circle cx="18" cy="10.5" r="1.8" /><path d="M12.5 11.5c-3 0-5.5 4-5.5 6s1.5 2.5 3 2.5h5c1.5 0 3-.5 3-2.5s-2.5-6-5.5-6Z" /></>,
  pessoas: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.3" /><path d="M16 14.2a4.5 4.5 0 0 1 5 4.3" /></>,
  cama: <><path d="M3 19V6M3 15h18v4M21 15v-2.5a3 3 0 0 0-3-3h-8v5.5" /><circle cx="6.5" cy="11.5" r="1.8" /></>,
  montanha: <><path d="m2.5 19.5 6.5-11 4 6.5 2.5-3.5 6 8Z" /><path d="m7 11 2 1.5 1.5-1" /></>,
  estrela: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z" />,
  email: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 6.5 8.5 7 8.5-7" /></>,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" /></>,
  whatsapp: <><path d="M4 20l1.2-4.1A8.3 8.3 0 1 1 8.4 19Z" /><path d="M9 8.5c-.4 2 2.4 5.7 5.6 6.3l1-1.4-2-1.2-.9.9c-1-.4-2-1.4-2.4-2.4l.9-.9-1.1-2Z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  fechar: <path d="M6 6l12 12M18 6 6 18" />,
  'chevron-baixo': <path d="m6 9 6 6 6-6" />,
  'chevron-esquerda': <path d="m15 6-6 6 6 6" />,
  'chevron-direita': <path d="m9 6 6 6-6 6" />,
  'seta-direita': <path d="M4 12h15M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.2" /></>,
  documento: <><path d="M6 3h8.5L19 7.5V21H6Z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>,
}

export type IconName = keyof typeof paths

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
  /** Se informado, o ícone é anunciado por leitores de tela. */
  label?: string
}

export function Icon({ name, size = 22, label, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
