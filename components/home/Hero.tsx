"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import * as m from "motion/react-m"
import { Phone } from "lucide-react"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { SplitText } from "@/components/motion/SplitText"
import { HERO_QUALITY, QUALITY, SIZES } from "@/lib/image-sizes"
import { brand, images } from "@/lib/site-data"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Depth stage: sky photo → name → transparent skyline cut-out, stacked in a
 * 3:2 box that is sized like `object-cover` (always covers the hero). Because
 * all three layers share the photo's coordinate system, the name lines up
 * with the skyline at every viewport size.
 *
 * The cut-out is the same buildings as the photo beneath it, so the two must
 * always move with the identical transform (`photoScale`) — any offset
 * between them shows as doubled buildings. Only the name moves independently.
 */
function DepthStage({
  photoScale,
  nameY,
}: {
  photoScale: MotionValue<string>
  nameY: MotionValue<string>
}) {
  const [first, ...rest] = brand.wordmark.split(" ")
  return (
    <div className="[container-type:size] absolute inset-0">
      <div className="absolute top-1/2 left-1/2 aspect-[3/2] w-[max(100cqw,150cqh)] -translate-x-1/2 -translate-y-1/2">
        {/* 1 · Sky */}
        <m.div
          className="absolute inset-0 origin-[45%_45%]"
          style={{ transform: photoScale }}
        >
          <Image
            src={images.heroSky}
            alt="Toronto skyline and the CN Tower across the harbour"
            fill
            quality={HERO_QUALITY}
            sizes={SIZES.hero}
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            className="object-cover"
          />
        </m.div>
        {/* Dims the sky only (the cut-out covers it below the skyline), so the
            white name reads against the pale horizon while the city stays bright */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/10 to-50%" />

        {/* 2 · Name — rises from behind the skyline, sinks back on scroll.
            Skyline tops sit at 47–62% down in hero-sky.jpg (CN Tower tip at
            30%, base at ~66%), so the baseline lands at ~58% on desktop: the
            CN Tower cuts through the name and the towers cover the lower part
            of the letters. Phones show only the middle third of the photo,
            where the towers are tallest, so the name sits higher there (high
            enough that the tall towers don't hide the end of the last name). */}
        <m.div
          className="absolute inset-x-0 bottom-[50%] text-center will-change-transform md:bottom-[46%]"
          style={{ transform: nameY }}
        >
          <m.p
            className="text-[18cqw] leading-[0.8] font-bold tracking-[-0.05em] whitespace-nowrap text-paper md:text-[11.2cqw]"
            initial={{ opacity: 0, y: "70%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          >
            <span className="block md:inline">{first}</span>
            <span className="hidden md:inline"> </span>
            <span className="block md:inline">{rest.join(" ")}</span>
          </m.p>
        </m.div>

        {/* 3 · Skyline + foreground cut-out, in front of the name */}
        <m.div
          className="pointer-events-none absolute inset-0 origin-[45%_45%]"
          style={{ transform: photoScale }}
        >
          <Image
            src={images.heroSkyline}
            alt=""
            fill
            quality={HERO_QUALITY}
            sizes={SIZES.hero}
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </m.div>
      </div>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // The photo (sky + cut-out, locked together) slowly zooms in while the name
  // sinks behind the skyline. Output full `transform` strings rather than
  // `scale`/`y`: Motion only hands `transform` to the browser's ScrollTimeline,
  // which runs on the compositor in step with native touch scrolling. Driven
  // from JS instead, the name lags a frame behind momentum scroll on phones.
  const photoScale = useTransform(
    scrollYProgress,
    [0, 1],
    ["scale(1)", reduce ? "scale(1)" : "scale(1.1)"]
  )
  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(0px)", reduce ? "translateY(0px)" : "translateY(220px)"]
  )

  return (
    <section
      ref={ref}
      className="relative z-10 flex h-svh min-h-[40rem] flex-col justify-end overflow-clip bg-ink pb-16 md:pb-14"
    >
      <DepthStage photoScale={photoScale} nameY={nameY} />
      {/* Legibility: darken the top behind the nav, and the city behind the copy */}
      {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent via-40% to-black/45" /> */}
      {/* Below the copy the photo dissolves into the About section's sand */}
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-sand to-transparent" /> */}

      <div className="container-site relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
            <SplitText
              as="h1"
              trigger="load"
              delay={0.3}
              staggerEach={0.03}
              lines={[
                "Your next home in the GTA",
                "starts with the right agent.",
              ]}
              className="text-[clamp(2rem,1.8vw,1.8rem)] leading-[1.05] font-medium tracking-tight text-paper"
            />
            <m.div
              className="mt-8 md:mt-6"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: EASE }}
            >
              <AnimatedButton href="#listings" tone="light">
                Explore Listings
              </AnimatedButton>
            </m.div>
          </div>

          {/* Contact card: the full (square) portrait, with name, role and a
              call button on a frosted strip over its lower edge.
              md+ only — on phones the stacked name already fills the hero.
              Kept compact and low so it stays below the name behind the skyline. */}
          <m.a
            href={brand.phoneHref}
            className="group hidden w-64 shrink-0 bg-paper p-1.5 md:block"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: EASE }}
          >
            <span className="relative block aspect-square overflow-hidden">
              <Image
                src={images.sara}
                alt={brand.agent}
                fill
                sizes={SIZES.heroCard}
                quality={QUALITY}
                loading="eager"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-paper/10 px-2.5 pt-2.5 pb-2 backdrop-blur-sm">
                <span className="min-w-0">
                  <span className="block text-sm text-ink">
                    Let&rsquo;s Talk
                  </span>
                  <span className="mt-1 block text-lg leading-tight font-semibold text-ink">
                    {brand.agent}
                  </span>
                  <span className="mt-1 block text-xs tracking-wide text-ink uppercase">
                    {brand.role}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-3">
                  {/* <span aria-hidden className="flex h-3.5 gap-[3px]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`w-[3px] ${i < 2 ? "bg-ink" : "bg-neutral-300"}`}
                      />
                    ))}
                  </span> */}
                  <span className="grid size-10 place-items-center bg-ink text-paper">
                    <Phone className="size-5 transition-transform duration-500 group-hover:-rotate-12" />
                  </span>
                </span>
              </span>
            </span>
          </m.a>
        </div>
      </div>
    </section>
  )
}
