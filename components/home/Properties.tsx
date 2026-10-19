import Image from "next/image"
import Link from "next/link"
import { Bath, BedDouble, MapPin } from "lucide-react"

import {
  AnimatedButton,
  AnimatedButtonLabel,
} from "@/components/motion/AnimatedButton"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { listingAnchor, listingHref, properties, type Property } from "@/lib/site-data"
import { cn } from "@/lib/utils"

/**
 * Staggered placement inside each column on md+: portrait cards on the left,
 * the right column alternates a wide landscape card with an inset portrait one.
 */
function placement(i: number) {
  if (i % 2 === 0) return { aspect: "aspect-[4/5]", inset: "" }
  return (i - 1) % 4 === 0
    ? { aspect: "aspect-[3/2]", inset: "" }
    : { aspect: "aspect-[4/5]", inset: "md:ml-[15%]" }
}

function PropertyCard({ p, index }: { p: Property; index: number }) {
  const { aspect, inset } = placement(index)
  return (
    // `order` keeps the original sequence on mobile, where both columns
    // collapse (`display: contents`) into one list. The id lets a listing
    // page's "All Listings" link return to this exact card.
    <div id={listingAnchor(p)} style={{ order: index }} className={cn("scroll-mt-16", inset)}>
      <Reveal>
        <article className="group">
          <Link
            href={listingHref(p)}
            className={cn("relative block overflow-hidden bg-ink-soft", aspect)}
          >
            <Image
              src={p.image}
              alt={`${p.title} in ${p.area}`}
              fill
              sizes={SIZES.property}
              quality={QUALITY}
              placeholder="blur"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
            />
            {/* Frosted layer grows in from the centre on hover */}
            <span className="absolute inset-0 hidden scale-0 items-center justify-center bg-white/10 opacity-0 backdrop-blur-[5px] transition-[opacity,scale] duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100 md:flex">
              <AnimatedButtonLabel className="px-8">
                View Home
              </AnimatedButtonLabel>
            </span>
            <span className="absolute top-3 left-3 flex items-center gap-1 bg-paper/90 px-2.5 py-1 text-sm text-ink backdrop-blur">
              <MapPin className="size-3.5" />
              {p.area}
            </span>
          </Link>
          <div className="bg-ink pt-5 pb-4">
            <h3 className="text-xl leading-snug font-medium text-paper">
              {p.title}
            </h3>
            <p className="mt-2 flex items-center gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-1.5">
                <BedDouble className="size-4" /> {p.beds} Beds
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="size-4" /> {p.baths} Baths
              </span>
            </p>
            <p className="mt-3 text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-paper">
              {p.price}
            </p>
          </div>
        </article>
      </Reveal>
    </div>
  )
}

export function Properties() {
  const columns = [
    properties.map((p, i) => ({ p, i })).filter(({ i }) => i % 2 === 0),
    properties.map((p, i) => ({ p, i })).filter(({ i }) => i % 2 === 1),
  ]

  return (
    <section id="listings" className="relative bg-ink text-paper">
      <div className="container-site">
        <div className="relative">
          {/* Column guide lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden grid-cols-3 border-x border-white/10 lg:grid"
          >
            <span />
            <span className="border-x border-white/10" />
            <span />
          </div>

          {/* Pinned title — stays centred while the listings scroll over it */}
          <div className="sticky top-0 flex h-svh items-center">
            <div className="grid w-full gap-6 lg:grid-cols-3 lg:gap-0">
              <Reveal y={24} className="lg:self-start lg:text-center">
                <p className="text-[clamp(1rem,1.6vw,1.75rem)] font-medium text-neutral-300">
                  [ Listings ]
                </p>
              </Reveal>
              <SplitText
                lines={["Homes Worth", "Coming", "Home To"]}
                className="text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-paper lg:py-[clamp(6rem,14vh,10rem)] lg:pr-6 lg:pl-2"
              />
              <Reveal
                delay={0.2}
                className="max-w-md lg:self-end lg:pr-6 lg:pl-1"
              >
                <p className="text-lg leading-relaxed text-neutral-300">
                  A hand-picked selection from across the GTA — from family
                  homes in York Region to modern builds in the city. Every
                  listing is one Sara would walk you through herself.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Listings scroll up over the pinned title */}
          <div className="relative z-10 pb-[clamp(4.5rem,9vw,7.5rem)]">
            <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-0">
              {columns.map((col, c) => (
                <div
                  key={c}
                  className={cn(
                    "contents md:flex md:flex-col md:gap-[clamp(6rem,14vw,14rem)]",
                    c === 0 ? "md:w-[41%]" : "md:w-[51%] md:pt-8"
                  )}
                >
                  {col.map(({ p, i }) => (
                    <PropertyCard key={p.slug} p={p} index={i} />
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-[clamp(5rem,10vw,9rem)] flex justify-center">
              <AnimatedButton href="#contact" tone="light">
                Ask About a Listing
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
