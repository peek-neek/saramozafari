"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { animate, type AnimationPlaybackControls } from "motion/react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

import { EASE_OUT_CUBIC, prefersReducedMotion } from "@/components/motion/SmoothScroll"
import { Button } from "@/components/ui/button"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { testimonials } from "@/lib/site-data"

import { SectionHeader } from "./SectionHeader"

type Story = (typeof testimonials)[number]

function StoryCard({ t }: { t: Story }) {
  return (
    <article
      data-story
      className="flex h-[min(70svh,36rem)] w-[85vw] shrink-0 snap-start flex-col justify-between bg-sand-deep p-7 text-ink sm:w-104 sm:p-8"
    >
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

/**
 * The page scrolls straight past this section; the stories scroll sideways on
 * their own — trackpad swipe, touch swipe, shift + wheel, or the arrows. On
 * desktop, sideways input gets the same eased glide as the page.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 1)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  // Same inertia glide as the page's vertical SmoothScroll, on the x axis.
  const glide = useRef<{ controls: AnimationPlaybackControls | null; target: number; animating: boolean }>({
    controls: null,
    target: 0,
    animating: false,
  })

  const glideTo = useCallback((left: number) => {
    const el = trackRef.current
    if (!el) return
    const g = glide.current
    g.target = Math.max(0, Math.min(left, el.scrollWidth - el.clientWidth))
    g.controls?.stop()

    if (prefersReducedMotion()) {
      el.scrollLeft = g.target
      return
    }

    g.animating = true
    g.controls = animate(el.scrollLeft, g.target, {
      duration: 1,
      ease: EASE_OUT_CUBIC,
      onUpdate: (v) => {
        el.scrollLeft = v
      },
      onComplete: () => {
        g.animating = false
      },
    })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const g = glide.current
    // Matches SmoothScroll: desktop pointers only, touch keeps native momentum.
    const finePointer = window.matchMedia("(min-width: 768px) and (pointer: fine)")

    const onWheel = (e: WheelEvent) => {
      if (!finePointer.matches || prefersReducedMotion() || e.ctrlKey) return
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      // Shift + wheel scrolls sideways; otherwise vertical wheel goes to the page.
      if (!horizontal && !e.shiftKey) return
      const raw = horizontal ? e.deltaX : e.deltaY

      e.preventDefault()
      // Keep the page's vertical handler from also acting on shift + wheel.
      e.stopPropagation()

      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1
      if (!g.animating) g.target = el.scrollLeft
      glideTo(g.target + raw * unit)
    }

    const stop = () => {
      g.controls?.stop()
      g.animating = false
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    el.addEventListener("scroll", update, { passive: true })
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("pointerdown", stop)
    return () => {
      ro.disconnect()
      el.removeEventListener("scroll", update)
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("pointerdown", stop)
      stop()
    }
  }, [update, glideTo])

  // Step to the next / previous card edge.
  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const from = glide.current.animating ? glide.current.target : el.scrollLeft
    const padding = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const edges = Array.from(el.querySelectorAll<HTMLElement>("[data-story]")).map(
      (card) => card.offsetLeft - padding
    )
    const next =
      dir === 1
        ? edges.find((x) => x > from + 1)
        : [...edges].reverse().find((x) => x < from - 1)
    glideTo(next ?? (dir === 1 ? el.scrollWidth : 0))
  }

  const arrow =
    "size-11 rounded-none bg-paper text-ink hover:bg-sand-deep disabled:opacity-30 [&_svg:not([class*='size-'])]:size-5"

  return (
    <section className="relative overflow-clip bg-ink py-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="container-site">
        <SectionHeader
          tone="dark"
          eyebrow="Client Stories"
          title={["What Clients", "Say About Sara"]}
          summary="Real moves, real people. A few words from buyers and sellers across the GTA who trusted Sara with one of their biggest decisions."
        />
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Client stories"
        tabIndex={0}
        // Snap only for touch; on desktop it would fight the eased glide.
        className="mt-14 flex snap-x snap-mandatory md:pointer-fine:snap-none scroll-px-[clamp(1rem,3vw,2.5rem)] gap-4 overflow-x-auto overscroll-x-contain px-[clamp(1rem,3vw,2.5rem)] scrollbar-none focus-visible:outline-none md:mt-20 md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <StoryCard key={t.name} t={t} />
        ))}
      </div>

      <div className="container-site mt-8 flex justify-end gap-4">
        <Button className={arrow} onClick={() => step(-1)} disabled={!canPrev}>
          <ArrowLeft />
          <span className="sr-only">Previous story</span>
        </Button>
        <Button className={arrow} onClick={() => step(1)} disabled={!canNext}>
          <ArrowRight />
          <span className="sr-only">Next story</span>
        </Button>
      </div>
    </section>
  )
}
