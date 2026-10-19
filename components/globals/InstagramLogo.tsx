import { useId } from "react"

/** Instagram app icon in its brand gradient. */
export function InstagramLogo({ className }: { className?: string }) {
  // Unique per instance: a shared id breaks when the first copy is hidden
  // (e.g. inside the closed header menu), since others reference its gradient.
  const gradientId = useId()
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id={gradientId} cx="0.3" cy="1.07" r="1.2">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.25" stopColor="#fa7e1e" />
          <stop offset="0.5" stopColor="#d62976" />
          <stop offset="0.75" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
      <g fill="none" stroke="#fff" strokeWidth="1.8">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.3" />
      </g>
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  )
}
