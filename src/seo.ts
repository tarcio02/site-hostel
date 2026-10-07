import { siteConfig } from './config/site'
import { accommodations } from './data/accommodations'
import { facilities } from './data/content'

/*
 * SEO gerado no build (ver scripts/prerender.mjs): meta tags, dados estruturados
 * (JSON-LD), sitemap e robots de cada página. Nada aqui roda no navegador.
 * Campos ainda com [PREENCHER] ficam de fora do JSON-LD para não publicar dado falso.
 */

export interface Page {
  path: string
  /** arquivo gerado dentro de dist/ */
  file: string
}

export const pages: Page[] = [
  { path: '/', file: 'index.html' },
  ...accommodations.map((a) => ({ path: `/acomodacoes/${a.slug}`, file: `acomodacoes/${a.slug}.html` })),
  // a Vercel serve o 404.html (com status 404) para qualquer endereço que não exista
  { path: '/404', file: '404.html' },
]

const abs = (path: string) => `${siteConfig.siteUrl}${path === '/' ? '' : path}`
const filled = (value: string) => (value.includes('[PREENCHER]') ? undefined : value)

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const jsonLd = (data: object) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

interface Meta {
  title: string
  description: string
  /** imagem da prévia (JPG 1200x630 em public/og/) */
  image?: string
  noindex?: boolean
  structured?: object[]
}

const hostelLd = () => {
  const a = siteConfig.address
  return {
    '@context': 'https://schema.org',
    '@type': 'Hostel',
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: abs('/'),
    image: [abs('/og/home.jpg')],
    logo: abs('/logo.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: filled(a.street),
      addressLocality: `${a.district}, ${a.city}`,
      addressRegion: a.state,
      postalCode: filled(a.zip),
      addressCountry: 'BR',
    },
    // [PREENCHER] incluir telephone (siteConfig.whatsappDisplay) e geo (latitude/longitude)
    // quando os dados reais estiverem em config/site.ts
    checkinTime: filled(siteConfig.checkInTime),
    checkoutTime: filled(siteConfig.checkOutTime),
    sameAs: [filled(siteConfig.instagram.url)].filter(Boolean),
    amenityFeature: facilities.map((f) => ({ '@type': 'LocationFeatureSpecification', name: f.title, value: true })),
  }
}

function metaFor(path: string): Meta {
  if (path === '/') {
    return {
      title: `${siteConfig.name} · Vale do Capão, Chapada Diamantina`,
      description:
        'Hostel no Vale do Capão (Caeté-Açu), Chapada Diamantina - BA. Dormitórios e quartos privativos perto das trilhas e cachoeiras. Reserve pelo WhatsApp.',
      image: '/og/home.jpg',
      structured: [hostelLd()],
    }
  }

  const acc = accommodations.find((a) => `/acomodacoes/${a.slug}` === path)
  if (acc) {
    return {
      title: `${acc.name} · ${siteConfig.name}`,
      description: `${acc.summary} No ${siteConfig.name}, Vale do Capão, Chapada Diamantina. Reserve pelo WhatsApp.`,
      image: `/og/${acc.id}.jpg`,
      structured: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: siteConfig.name, item: abs('/') },
            { '@type': 'ListItem', position: 2, name: acc.name, item: abs(path) },
          ],
        },
      ],
    }
  }

  return { title: `Página não encontrada · ${siteConfig.name}`, description: siteConfig.tagline, noindex: true }
}

/** Tags do <head> de uma página, no lugar do bloco <!--seo:start--> … <!--seo:end--> do index.html. */
export function headFor(path: string): string {
  const m = metaFor(path)
  const url = abs(path)
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
  ]
  if (m.noindex) {
    tags.push('<meta name="robots" content="noindex" />')
  } else {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:locale" content="pt_BR" />',
      `<meta property="og:site_name" content="${esc(siteConfig.name)}" />`,
      `<meta property="og:title" content="${esc(m.title)}" />`,
      `<meta property="og:description" content="${esc(m.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
    )
  }
  if (m.image) {
    tags.push(
      `<meta property="og:image" content="${abs(m.image)}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
    )
  }
  for (const data of m.structured ?? []) tags.push(jsonLd(data))
  return tags.join('\n    ')
}

export function sitemapXml(): string {
  const urls = pages
    .filter((p) => !metaFor(p.path).noindex)
    .map((p) => `  <url><loc>${abs(p.path)}</loc></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function robotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`
}
