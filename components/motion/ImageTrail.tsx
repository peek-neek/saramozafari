"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Image, { type StaticImageData } from "next/image"
import { animate } from "motion/react"

import { LOW_QUALITY, SIZES } from "@/lib/image-sizes"

type ImageTrailProps = {
  images: StaticImageData[]
  children: ReactNode
  className?: string
  /** Trail only runs at or above this viewport width. */
  minWidth?: number
  /** A new image spawns every (viewport width / moveDistance) px of travel. */
  moveDistance?: number
}

/**
 * Spawns images along the cursor path. Each image glides from the previous
 * spawn point to the cursor, then shrinks away. Imperative Motion `animate`
 * calls on refs — no React state per mouse move.
 */
export function ImageTrail({
  images,
  children,
  className,
  minWidth = 992,
  moveDistance = 15,
}: ImageTrailProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const media = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine) and (prefers-reduced-motion: no-preference)`
    )

    let index = 0
    let z = 1
    let last = { x: 0, y: 0 }
    let primed = false

    const onMove = (e: PointerEvent) => {
      if (!media.matches) return
      const rect = wrapper.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (!primed) {
        last = { x, y }
        primed = true
        return
      }
      if (Math.hypot(x - last.x, y - last.y) < window.innerWidth / moveDistance) {
        return
      }

      const el = itemRefs.current[index % images.length]
      index++
      if (!el) return

      const w = el.offsetWidth
      const h = el.offsetHeight
      el.style.zIndex = String(z++)

      animate(
        el,
        {
          opacity: [0, 1, 1, 0],
          x: [last.x - w / 2, x - w / 2, x - w / 2, x - w / 2],
          y: [last.y - h / 2, y - h / 2, y - h / 2, y - h / 2],
          scale: [1, 1, 1, 0.6],
        },
        { duration: 0.9, times: [0, 0.25, 0.75, 1], ease: "easeOut" }
      )

      last = { x, y }
    }

    const onLeave = () => {
      primed = false
    }

    wrapper.addEventListener("pointermove", onMove)
    wrapper.addEventListener("pointerleave", onLeave)
    return () => {
      wrapper.removeEventListener("pointermove", onMove)
      wrapper.removeEventListener("pointerleave", onLeave)
    }
  }, [images.length, minWidth, moveDistance])

  return (
    <div ref={wrapperRef} className={className}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="absolute top-0 left-0 aspect-[4/5] w-44 overflow-hidden opacity-0 will-change-transform xl:w-52"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={SIZES.trail}
              quality={LOW_QUALITY}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}
