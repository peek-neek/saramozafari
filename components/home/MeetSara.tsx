import Image from "next/image"
import { Mail, Phone } from "lucide-react"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Reveal, Stagger } from "@/components/motion/Reveal"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { brand, meetSara } from "@/lib/site-data"

import { SectionHeader } from "./SectionHeader"

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const contacts = [
  { href: brand.instagram, label: "Instagram", icon: <InstagramGlyph className="size-4" /> },
  { href: brand.phoneHref, label: "Call", icon: <Phone className="size-4" /> },
  { href: `mailto:${brand.email}`, label: "Email", icon: <Mail className="size-4" /> },
]

/** Tilted portrait; hovering squares it up and reveals the quote and contact links. */
function Portrait() {
  const s = meetSara
  return (
    <article className="group relative aspect-4/5 perspective-[1400px] transform-3d">
      <div className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-out-expo [@media(hover:hover)]:transform-[rotateY(20deg)] [@media(hover:hover)]:group-hover:transform-[rotateY(0deg)]">
        <Image
          src={s.image}
          alt={s.name}
          fill
          sizes={SIZES.meetSara}
          quality={QUALITY}
          placeholder="blur"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/30 to-black/85 transition-opacity duration-700 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />

        {/* Name strip while tilted: rides on the card, gone at once on hover and
            back only once the card has turned away again. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden p-5 text-paper transition-opacity delay-300 duration-500 group-hover:opacity-0 group-hover:delay-0 group-hover:duration-200 [@media(hover:hover)]:block">
          <div className="bg-black/50 px-4 py-3">
            <p className="font-medium">{s.name}</p>
            <p className="text-sm text-neutral-300">{s.role}</p>
          </div>
        </div>

        {/* Fades in once the card has mostly squared up, and out straight away on leave. */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-paper transition-opacity duration-300 md:p-8 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:delay-300 [@media(hover:hover)]:group-hover:duration-500">
          <p className="text-xl leading-snug font-medium md:text-2xl">&ldquo;{s.quote}&rdquo;</p>
          <div>
            <div className="mb-4 h-px w-full bg-white/30" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-medium">{s.name}</h3>
                <p className="text-neutral-300">{s.role}</p>
              </div>
              <div className="flex gap-2">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    aria-label={`${c.label} Sara`}
                    className="grid size-9 place-items-center bg-white/20 transition-colors hover:bg-paper hover:text-ink"
                  >
                    {c.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function MeetSara() {
  const s = meetSara
  return (
    <section id="meet-sara" className="relative z-1 bg-paper">
      <div className="section-gap container-site grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <Reveal>
          <Portrait />
        </Reveal>

        <div>
          <SectionHeader eyebrow="Your Agent" title={["Meet Sara", "Mozafari"]} />

          <Reveal delay={0.2}>
            <p className="mt-8 text-xl leading-snug font-medium text-ink md:text-2xl">{s.lead}</p>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-neutral-600">
                {p}
              </p>
            ))}
          </Reveal>

          <Stagger className="mt-10 grid gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3" each={0.12}>
            {s.highlights.map((h) => (
              <div key={h.title}>
                <p className="font-medium text-ink">{h.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{h.body}</p>
              </div>
            ))}
          </Stagger>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AnimatedButton href="#contact">Let&rsquo;s Talk</AnimatedButton>
            <a href={brand.phoneHref} className="text-ink underline-offset-4 hover:underline">
              {brand.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
