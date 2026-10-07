import { useState } from 'react'
import { siteConfig } from '../../config/site'

/** Logo em /public/logo.png. Enquanto o arquivo não existir, mostra o nome em texto. */
export function Logo({ className = 'h-12' }: { className?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="font-display text-xl leading-none font-bold text-terracota">
        Iniã <span className="block text-xs font-sans tracking-[0.2em] text-terracota-escuro uppercase">Casa Hostel</span>
      </span>
    )
  }

  return (
    <img
      src="/logo.png"
      alt={siteConfig.name}
      className={`w-auto ${className}`}
      onError={() => setFailed(true)}
      decoding="async"
    />
  )
}
