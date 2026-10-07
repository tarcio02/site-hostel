/* Pequeno ornamento de mandala usado entre o título e o texto das seções. */
const petals = Array.from({ length: 8 }, (_, i) => i * 45)

export function MandalaDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-laranja ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-laranja sm:w-20" />
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        {petals.map((deg) => (
          <ellipse key={deg} cx="20" cy="10" rx="4" ry="8" transform={`rotate(${deg} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="3.5" fill="var(--color-terracota)" stroke="none" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-laranja sm:w-20" />
    </div>
  )
}
