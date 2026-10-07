import { siteConfig } from '../config/site'
import { SearchBar } from '../components/booking/SearchBar'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative flex min-h-[78svh] items-end overflow-hidden px-4 pt-16 pb-36 sm:px-6 md:min-h-[82vh] md:items-center md:pb-40">
        {/* Imagem ilustrativa. [PREENCHER] trocar por foto real (WebP, < 250 KB) mantendo as duas versões */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/fotos/hero-desktop.webp" width={1672} height={941} />
          <img
            src="/fotos/hero-mobile.webp"
            alt=""
            width={941}
            height={1672}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <div
          className="absolute inset-0 bg-gradient-to-t from-marrom-texto/85 via-marrom-texto/45 to-marrom-texto/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="mb-3 text-sm font-bold tracking-[0.2em] text-creme uppercase">Vale do Capão · Chapada Diamantina</p>
          <h1 id="hero-title" className="max-w-2xl text-5xl leading-[1.02] text-creme-claro sm:text-6xl md:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-creme-claro sm:text-xl">{siteConfig.tagline}</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-28 max-w-5xl px-4 sm:px-6">
        <SearchBar />
      </div>
    </section>
  )
}
