"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bath, BedDouble, MapPin } from "lucide-react"

import { ClosedTag } from "@/components/listing/ClosedTag"
import { AnimatedButtonLabel } from "@/components/motion/AnimatedButton"
import { Reveal } from "@/components/motion/Reveal"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import {
  closedLabel,
  closedNote,
  listingAnchor,
  listingHref,
  listingStatus,
  type Property,
} from "@/lib/site-data"
import {
  LISTING_FILTERS,
  type ListingFilter,
  useHash,
  useListingFilter,
} from "@/lib/use-listing-filter"
import { cn } from "@/lib/utils"

const LABELS: Record<ListingFilter, string> = {
  all: "All",
  active: "Active",
  sold: "Sold",
  leased: "Leased",
}

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
    <div
      id={listingAnchor(p)}
      style={{ order: index }}
      className={cn("scroll-mt-24", inset)}
    >
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
                {p.closed?.status === "sold" ? "View Sale" : "View Home"}
              </AnimatedButtonLabel>
            </span>
            <span className="absolute top-3 left-3 flex items-center gap-1 bg-paper/90 px-2.5 py-1 text-sm text-ink backdrop-blur">
              <MapPin className="size-3.5" />
              {p.area}
            </span>
            {p.closed && (
              <ClosedTag
                label={closedLabel(p)}
                className="absolute top-3 right-3"
              />
            )}
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
            {p.closed ? (
              <>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-paper">
                    {p.price}
                    {p.closed.status === "leased" && (
                      <span className="text-base font-normal tracking-normal text-neutral-400">
                        /month
                      </span>
                    )}
                  </span>
                  {p.closed.listPrice !== p.price && (
                    <span className="text-neutral-500 line-through">
                      <span className="sr-only">Listed at </span>
                      {p.closed.listPrice}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  [ {closedNote(p)} ]
                </p>
              </>
            ) : (
              <p className="mt-3 text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-paper">
                {p.price}
              </p>
            )}
          </div>
        </article>
      </Reveal>
    </div>
  )
}

/**
 * Segmented filter in the site's language: square edges, frosted ink, and the
 * chosen option inverted to paper-on-ink with a square bullet, the reverse of
 * the SOLD / LEASED tag on the cards.
 */
function FilterBar({
  value,
  counts,
  onChange,
}: {
  value: ListingFilter
  counts: Record<ListingFilter, number>
  onChange: (next: ListingFilter) => void
}) {
  return (
    <ToggleGroup
      aria-label="Filter listings"
      value={[value]}
      // Clicking the pressed option would empty the group; keep it selected.
      onValueChange={(next) => next[0] && onChange(next[0] as ListingFilter)}
      spacing={0}
      className="rounded-none border border-white/15 bg-ink/75 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      {LISTING_FILTERS.map((f) => (
        <ToggleGroupItem
          key={f}
          value={f}
          disabled={counts[f] === 0}
          className="h-auto gap-2 rounded-none! px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-paper focus-visible:ring-white/40 aria-pressed:bg-paper aria-pressed:text-ink aria-pressed:hover:bg-paper aria-pressed:hover:text-ink md:px-5 md:py-2.5 md:text-base"
        >
          <span
            aria-hidden
            className="size-1.5 bg-current opacity-0 transition-opacity group-aria-pressed/toggle:opacity-100"
          />
          {LABELS[f]}
          <span className="text-xs text-neutral-500 tabular-nums group-aria-pressed/toggle:text-neutral-500">
            {counts[f]}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export function ListingsGrid({ properties }: { properties: Property[] }) {
  const [stored, setStored] = useListingFilter()
  const hash = useHash()
  const topRef = useRef<HTMLDivElement>(null)

  const counts = { all: properties.length, active: 0, sold: 0, leased: 0 }
  for (const p of properties) counts[listingStatus(p)]++

  // Fall back to "all" when the remembered filter has nothing in it, or when
  // the URL points at a card it would hide (the "All Listings" link back from
  // a listing page), so that card is always there to land on.
  const target = properties.find((p) => `#${listingAnchor(p)}` === hash)
  const filter: ListingFilter =
    counts[stored] === 0 || (target && listingStatus(target) !== stored)
      ? "all"
      : stored

  const visible =
    filter === "all"
      ? properties
      : properties.filter((p) => listingStatus(p) === filter)
  const columns = [
    visible.map((p, i) => ({ p, i })).filter(({ i }) => i % 2 === 0),
    visible.map((p, i) => ({ p, i })).filter(({ i }) => i % 2 === 1),
  ]

  const choose = (next: ListingFilter) => {
    setStored(next)
    // Deep in the list? Bring the first result back into view.
    const top = topRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) {
      window.scrollTo({ top: window.scrollY + top, behavior: "smooth" })
    }
  }

  return (
    <>
      <div ref={topRef} />
      {/* Pinned while the cards scroll past, so it's always within reach */}
      <div className="sticky top-3 z-20 mb-12 flex justify-center md:top-4 md:mb-20">
        <FilterBar value={filter} counts={counts} onChange={choose} />
      </div>
      <p aria-live="polite" className="sr-only">
        {filter === "all"
          ? `Showing all ${visible.length} homes`
          : `Showing ${visible.length} ${LABELS[filter].toLowerCase()} ${visible.length === 1 ? "home" : "homes"}`}
      </p>

      {/* Keyed by filter so the new set re-runs its reveal animation */}
      <div
        key={filter}
        className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-0"
      >
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
    </>
  )
}
