import type { ReactNode } from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Reveal, Stagger } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { listingAnchor, type Property } from "@/lib/site-data"
import { cn } from "@/lib/utils"

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-300 pb-3">
      <span className="text-neutral-500">[ {label} ]</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <h2 className="mb-6 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-medium tracking-tight">
        {title}
      </h2>
      {children}
    </Reveal>
  )
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-3 text-lg text-neutral-600 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 bg-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Pairs of photos, a narrow portrait beside a wide one, alternating sides. */
function Gallery({ title, photos }: { title: string; photos: StaticImageData[] }) {
  const rows: StaticImageData[][] = []
  for (let i = 0; i < photos.length; i += 2) rows.push(photos.slice(i, i + 2))

  return (
    <section className="mt-[clamp(4.5rem,9vw,7.5rem)]">
      <Reveal y={24}>
        <h2 className="mb-8 text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-tight md:mb-12">
          Gallery
        </h2>
      </Reveal>
      <div className="flex flex-col gap-4 md:gap-6">
        {rows.map((row, r) => {
          const flip = r % 2 === 1
          return (
            <div
              key={r}
              className={cn(
                "grid items-end gap-4 md:gap-6",
                row.length === 2 && (flip ? "md:grid-cols-[1fr_0.71fr]" : "md:grid-cols-[0.71fr_1fr]")
              )}
            >
              {row.map((src, i) => {
                const narrow = row.length === 2 && (i === 0) !== flip
                return (
                  <Reveal key={i} delay={i * 0.15}>
                    <div
                      className={cn(
                        "group relative overflow-hidden bg-neutral-200",
                        row.length === 1 ? "aspect-video" : narrow ? "aspect-4/5" : "aspect-5/4"
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${title} — photo ${r * 2 + i + 2}`}
                        fill
                        sizes={SIZES.listingGallery}
                        quality={QUALITY}
                        placeholder="blur"
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function ListingDetail({ p }: { p: Property }) {
  return (
    <article className="bg-paper text-ink">
      <div className="container-site pt-[clamp(7.5rem,12vw,10rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
        <Reveal y={24}>
          <Link
            href={`/#${listingAnchor(p)}`}
            className="inline-flex items-center gap-2 text-neutral-500 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            All Listings
          </Link>
        </Reveal>

        {/* Title block */}
        <div className="mx-auto mt-10 flex max-w-[53rem] flex-col items-center gap-6 text-center md:mt-6">
          <Reveal y={24}>
            <p className="text-neutral-500">[ {p.area} · {p.type} ]</p>
          </Reveal>
          <SplitText
            as="h1"
            trigger="load"
            delay={0.1}
            lines={[p.title]}
            className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.03em]"
          />
          <Reveal delay={0.2} className="max-w-xl">
            <p className="text-lg leading-relaxed text-neutral-600">{p.summary}</p>
          </Reveal>
        </div>

        {/* Banner */}
        <Reveal delay={0.3} className="mt-12 md:mt-16">
          <div className="relative aspect-4/3 overflow-hidden bg-neutral-200 md:aspect-21/9">
            <Image
              src={p.image}
              alt={`${p.title} in ${p.area}`}
              fill
              preload
              sizes={SIZES.listingHero}
              quality={QUALITY}
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Price + location, then two columns of facts */}
        <Stagger
          className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1fr_1.15fr_1fr] md:gap-8 lg:gap-14"
          each={0.12}
        >
          <div className="flex h-full flex-col items-start justify-between gap-6">
            <div>
              <p className="text-neutral-500">[ Listed at ]</p>
              <p className="mt-2 text-[clamp(2rem,3.5vw,3rem)] leading-none font-medium tracking-tight">
                {p.price}
              </p>
              <p className="mt-4 flex items-center gap-2 font-medium">
                <MapPin className="size-4" />
                {p.area}, Ontario
              </p>
            </div>
            <AnimatedButton href="#contact">Book a Viewing</AnimatedButton>
          </div>
          <div className="flex flex-col gap-4">
            <Stat label="Property Type" value={p.type} />
            <Stat label="Bedrooms" value={p.beds} />
            <Stat label="Bathrooms" value={p.baths} />
          </div>
          <div className="flex flex-col gap-4">
            <Stat label="Square Footage" value={p.sqft} />
            <Stat label="Lot Size" value={p.lot} />
            <Stat label="Area" value={p.area} />
          </div>
        </Stagger>

        {/* Write-up, pushed to the right like an editorial column */}
        <div className="mt-[clamp(4.5rem,9vw,7.5rem)] flex flex-col gap-14 md:ml-auto md:max-w-[67.5%] md:gap-20">
          <Block title="Property Overview">
            <div className="flex flex-col gap-4 text-lg leading-relaxed text-neutral-600">
              {p.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Block>
          <Block title="Key Features">
            <BulletList items={p.features} />
          </Block>
          {p.nearby && p.nearby.length > 0 && (
            <Block title="Location &amp; Neighbourhood">
              <BulletList
                items={p.nearby.map((n) => (
                  <>
                    <span className="font-medium text-ink">{n.time}</span> to {n.place}
                  </>
                ))}
              />
            </Block>
          )}
        </div>

        {p.gallery && p.gallery.length > 0 && <Gallery title={p.title} photos={p.gallery} />}
      </div>
    </article>
  )
}
