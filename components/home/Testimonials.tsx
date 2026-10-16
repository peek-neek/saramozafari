"use client"

import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { useScroll, useSpring, useTransform } from "motion/react"
import * as m from "motion/react-m"
import { Quote } from "lucide-react"

import { QUALITY, SIZES } from "@/lib/image-sizes"
import { testimonials } from "@/lib/site-data"

import { SectionHeader } from "./SectionHeader"

type Story = (typeof testimonials)[number]

function StoryCard({ t }: { t: Story }) {
  return (
    <article className="flex h-[min(78svh,40rem)] w-[85vw] shrink-0 flex-col justify-between bg-sand-deep p-7 text-ink sm:w-104 sm:p-8">
      <div>
        <Quote className="size-10 fill-current stroke-0 text-ink" />
        <p className="mt-12 text-xl leading-snug sm:mt-16">{t.quote}</p>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={t.avatar}
          alt=""
          width={48}
          height={48}
          sizes={SIZES.avatar}
          quality={QUALITY}
          className="size-12 object-cover"
        />
        <div>
          <p className="font-medium">{t.name}</p>
          <p className="text-sm text-neutral-600">{t.city}</p>
        </div>
      </div>
    </article>
  )
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // Measure how far the track must travel; that also sets the section height,
  // so one pixel of vertical scroll moves the cards one pixel sideways.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])

  return (
    <section className="relative overflow-clip bg-ink">
      <div className="container-site pt-[clamp(4.5rem,9vw,7.5rem)]">
        <SectionHeader
          tone="dark"
          eyebrow="Client Stories"
          title={["What Clients", "Say About Sara"]}
          summary="Real moves, real people. A few words from buyers and sellers across the GTA who trusted Sara with one of their biggest decisions."
        />
      </div>

      <div ref={sectionRef} style={{ height: `calc(100svh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <m.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 px-[clamp(1rem,3vw,2.5rem)] will-change-transform md:gap-6"
          >
            {testimonials.map((t) => (
              <StoryCard key={t.name} t={t} />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  )
}
