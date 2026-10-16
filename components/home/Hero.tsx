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
  photoScale: MotionValue<number>
  nameY: MotionValue<number>
}) {
  const [first, ...rest] = brand.wordmark.split(" ")
  return (
    <div className="[container-type:size] absolute inset-0">
      <div className="absolute top-1/2 left-1/2 aspect-[3/2] w-[max(100cqw,150cqh)] -translate-x-1/2 -translate-y-1/2">
        {/* 1 · Sky */}
        <m.div
          className="absolute inset-0 origin-[45%_45%]"
          style={{ scale: photoScale }}
        >
          <Image
            src={images.heroSky}
            alt="Toronto skyline and the CN Tower at sunset"
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
            white name reads against the pale horizon while the city keeps its glow */}
        <div className="absolute inset-0 bg-linear-to-b from-black/35 to-black/15 to-50%" />

        {/* 2 · Name — rises from behind the skyline, sinks back on scroll.
            Skyline tops sit at 32–46% down in hero-sky.jpg and the low-rise
            base at ~50%, so the baseline lands just above the base and the
            towers cover the lower part of the letters. */}
        <m.div
          className="absolute inset-x-0 bottom-[53%] text-center md:bottom-[53.5%]"
          style={{ y: nameY }}
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
          style={{ scale: photoScale }}
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
  // sinks behind the skyline.
  const photoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 1.1]
  )
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220])

  return (
    <section
      ref={ref}
      className="relative z-10 flex h-svh min-h-[40rem] flex-col justify-end overflow-clip bg-ink pb-36 md:pb-48"
    >
      <DepthStage photoScale={photoScale} nameY={nameY} />
      {/* Legibility: darken the top behind the nav, and the city behind the copy */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent via-40% to-black/45" />
      {/* Below the copy the photo dissolves into the About section's sand */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-sand to-transparent" />

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
              className="text-[clamp(2rem,3vw,3rem)] leading-[1.05] font-medium tracking-tight text-paper"
            />
            <m.div
              className="mt-8"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: EASE }}
            >
              <AnimatedButton href="#listings" tone="light">
                Explore Listings
              </AnimatedButton>
            </m.div>
          </div>

          {/* Contact card: framed portrait over name, role and a call button.
              md+ only — on phones the stacked name already fills the hero. */}
          <m.a
            href={brand.phoneHref}
            className="group hidden w-80 shrink-0 bg-paper p-2 md:block"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: EASE }}
          >
            <span className="relative block aspect-[1.85] overflow-hidden">
              <Image
                src={images.sara}
                alt={brand.agent}
                fill
                sizes={SIZES.heroCard}
                quality={QUALITY}
                loading="eager"
                className="object-cover object-[50%_10%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </span>
            <span className="flex items-end justify-between gap-4 px-1.5 pt-2.5 pb-1">
              <span className="min-w-0">
                <span className="block text-base text-ink">Let&rsquo;s Talk</span>
                <span className="mt-1.5 block text-xl leading-tight font-semibold text-ink">
                  {brand.agent}
                </span>
                <span className="mt-1 block text-sm tracking-wide text-ink uppercase">
                  {brand.role}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-4">
                <span aria-hidden className="flex h-3.5 gap-[3px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`w-[3px] ${i < 2 ? "bg-ink" : "bg-neutral-300"}`}
                    />
                  ))}
                </span>
                <span className="grid size-11 place-items-center bg-ink text-paper">
                  <Phone className="size-5 transition-transform duration-500 group-hover:-rotate-12" />
                </span>
              </span>
            </span>
          </m.a>
        </div>
      </div>
    </section>
  )
}
