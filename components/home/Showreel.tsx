"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import * as m from "motion/react-m"
import { Play } from "lucide-react"

import { QUALITY, SIZES } from "@/lib/image-sizes"
import { brand, reel } from "@/lib/site-data"

// Grid placement for the 5 tiles on a 12-column × 3-row grid: full-height
// columns either side, three stacked in the middle. Tile 2 sits dead centre
// so scaling the whole grid from its centre starts "zoomed in" on that tile.
const TILE_AREAS = [
  "1 / 1 / 4 / 5",
  "1 / 5 / 2 / 9",
  "2 / 5 / 3 / 9",
  "3 / 5 / 4 / 9",
  "1 / 9 / 4 / 13",
]

const ZOOM_END = 0.69
const TITLE_OUT = [0.69, 0.9] as const

function Char({
  char,
  index,
  count,
  progress,
}: {
  char: string
  index: number
  count: number
  progress: MotionValue<number>
}) {
  // Each letter rises in during the first quarter, then leaves upward,
  // staggered left to right.
  const step = 0.1 / count
  const inStart = index * step
  const outStart = TITLE_OUT[0] + index * step
  const y = useTransform(
    progress,
    [inStart, inStart + 0.15, outStart, outStart + 0.12],
    ["100%", "0%", "0%", "-100%"]
  )
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      <m.span className="inline-block" style={{ y }}>
        {char === " " ? " " : char}
      </m.span>
    </span>
  )
}

/** Instagram app icon in its brand gradient. */
function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="ig-gradient" cx="0.3" cy="1.07" r="1.2">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.25" stopColor="#fa7e1e" />
          <stop offset="0.5" stopColor="#d62976" />
          <stop offset="0.75" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-gradient)" />
      <g fill="none" stroke="#fff" strokeWidth="1.8">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.3" />
      </g>
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  )
}

function ReelVideo({ src, play }: { src: string; play: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (play) video.play().catch(() => {})
    else video.pause()
  }, [play])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 size-full object-cover"
    />
  )
}

export function Showreel() {
  const ref = useRef<HTMLElement>(null)
  // Clips are heavy, so only fetch and play them while the section is close.
  const near = useInView(ref, { margin: "50% 0px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  // A touch of lag, like a scrubbed timeline.
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  })

  const gridScale = useTransform(progress, [0, ZOOM_END], [3.25, 1])
  const shade = useTransform(progress, [0, ZOOM_END, 0.8], [0.35, 0.35, 0])
  const playOpacity = useTransform(progress, [0.92, 1], [0, 1])
  const playScale = useTransform(progress, [0.92, 1], [0.7, 1])

  const chars = Array.from(reel.title)
  const subChars = Array.from(reel.subtitle)
  const allChars = chars.length + subChars.length

  return (
    <section
      ref={ref}
      aria-label="Showreel"
      className="relative z-[1] h-[400vh] bg-paper"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-clip">
        <m.div
          style={{ scale: gridScale }}
          className="grid size-full origin-center grid-cols-12 grid-rows-[1fr_1.4fr_1fr] gap-[0.5vw] p-[0.65rem] will-change-transform"
        >
          {reel.tiles.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-sand-deep"
              style={{ gridArea: TILE_AREAS[i] }}
            >
              {typeof src === "string" ? (
                <ReelVideo src={src} play={near} />
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={SIZES.reelCenter}
                  quality={QUALITY}
                  placeholder="blur"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </m.div>

        <m.div
          aria-hidden
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 bg-black"
        />

        <h2
          aria-label={`${reel.title} ${reel.subtitle}`}
          className="pointer-events-none absolute flex flex-col items-center px-4 text-center leading-none font-medium tracking-[-0.04em] text-paper"
        >
          {/* Subtitle letters continue the title's stagger, so it follows on. */}
          <span aria-hidden className="text-[clamp(3rem,10vw,9rem)]">
            {chars.map((c, i) => (
              <Char
                key={i}
                char={c}
                index={i}
                count={allChars}
                progress={progress}
              />
            ))}
          </span>
          <span
            aria-hidden
            className="mt-[0.4em] text-[clamp(1.75rem,5vw,4.5rem)]"
          >
            {subChars.map((c, i) => (
              <Char
                key={i}
                char={c}
                index={chars.length + i}
                count={allChars}
                progress={progress}
              />
            ))}
          </span>
        </h2>

        {/* Play button and its label share one link to Sara's Instagram. */}
        <m.a
          href={brand.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Sara on Instagram"
          style={{ opacity: playOpacity, scale: playScale }}
          className="group absolute flex justify-center"
        >
          <span className="grid size-24 place-items-center rounded-full bg-paper text-ink shadow-xl transition-colors group-hover:bg-ink group-hover:text-paper">
            <Play className="size-7 translate-x-0.5 fill-current" />
          </span>
          {/* Hangs below so the button itself stays dead centre */}
          <span className="absolute top-full mt-4 flex items-center gap-2 rounded-full bg-black/55 py-1.5 pr-1.5 pl-4 text-sm font-medium tracking-wide whitespace-nowrap text-paper">
            Follow Sara on
            <InstagramLogo className="size-6" />
          </span>
        </m.a>
      </div>
    </section>
  )
}
