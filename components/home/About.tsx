"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useInView } from "motion/react"
import * as m from "motion/react-m"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Counter } from "@/components/motion/Counter"
import { Reveal, Stagger } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { about } from "@/lib/site-data"

/** Loops through the photos with slow crossfades while on screen. */
function CrossfadeGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "20% 0px" })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % about.images.length),
      3000
    )
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden bg-sand-deep"
    >
      {about.images.map((src, i) => (
        <m.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
            scale: i === active ? 1 : 1.06,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={i === 0 ? "A GTA home Sara helped sell" : ""}
            fill
            sizes={SIZES.about}
            quality={QUALITY}
            placeholder="blur"
            className="object-cover"
          />
        </m.div>
      ))}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative bg-sand">
      <div className="container-site">
        <div className="section-gap relative">
          {/* Column guide lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden grid-cols-3 border-x border-neutral-200 lg:grid"
          >
            <span />
            <span className="border-x border-neutral-200" />
            <span />
          </div>

          <div className="relative grid gap-y-10 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-24">
            <Reveal
              y={24}
              className="lg:col-start-3 lg:row-start-1 lg:justify-self-end"
            >
              <p className="text-base text-neutral-500">[ {about.eyebrow} ]</p>
            </Reveal>

            <SplitText
              lines={about.lines}
              staggerEach={0.02}
              className="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink uppercase lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:pr-8"
            />

            <Reveal className="lg:col-start-2 lg:row-start-2 lg:px-8">
              <CrossfadeGallery />
            </Reveal>

            <Stagger className="flex flex-col justify-between gap-8 text-lg leading-relaxed text-neutral-600 lg:col-start-3 lg:row-start-2 lg:pl-1">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 16)}>{p}</p>
              ))}
            </Stagger>

            <Reveal className="lg:col-start-1 lg:row-start-2 lg:self-end">
              <AnimatedButton href="#process">How Sara Works</AnimatedButton>
            </Reveal>
          </div>

          <div className="relative mt-20 grid gap-10 border-t border-black/10 pt-10 md:grid-cols-3 md:gap-6 lg:gap-0">
            {about.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.15}
                className="flex flex-col gap-3 lg:pr-8 lg:not-first:pl-1"
              >
                <p className="text-neutral-500">{s.label}</p>
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="text-[clamp(3.5rem,7vw,6rem)] leading-none font-medium tracking-tight text-ink"
                />
                <p className="max-w-xs text-neutral-600">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Neighbourhood marquee */}
      <div
        className="overflow-clip border-y border-black/10 py-6"
        aria-label="Areas served"
      >
        <div className="flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="animate-marquee flex shrink-0 items-center gap-12 pr-12"
            >
              {about.areas.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-12 text-[clamp(1.5rem,3vw,2.5rem)] font-medium whitespace-nowrap text-ink/80"
                >
                  {a}
                  <span className="size-2 rounded-full bg-ink/30" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
