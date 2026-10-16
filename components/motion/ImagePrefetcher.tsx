"use client"

import { useEffect } from "react"
import { preload } from "react-dom"
import { getImageProps, type StaticImageData } from "next/image"

import { LOW_QUALITY, QUALITY, SIZES } from "@/lib/image-sizes"
import {
  about,
  images,
  insights,
  processSteps,
  properties,
  reel,
  services,
  meetSara,
  testimonials,
  trailImages,
} from "@/lib/site-data"

type Entry = { src: StaticImageData; sizes: string; quality: number }

const entry = (src: StaticImageData, sizes: string, quality = QUALITY): Entry => ({
  src,
  sizes,
  quality,
})

// Roughly in the order a visitor reaches them: the menu photo first (the menu
// can be opened immediately), then each section down the page.
const queue: Entry[] = [
  entry(images.sara, SIZES.menu, LOW_QUALITY),
  ...about.images.map((i) => entry(i, SIZES.about)),
  ...properties.map((p) => entry(p.image, SIZES.property)),
  ...processSteps.map((s) => entry(s.image, SIZES.process)),
  ...services.map((s) => entry(s.image, SIZES.service)),
  ...reel.tiles.flatMap((t) => (typeof t === "string" ? [] : [entry(t, SIZES.reelCenter)])),
  entry(meetSara.image, SIZES.meetSara),
  ...testimonials.map((t) => entry(t.avatar, SIZES.avatar)),
  ...insights.map((b) => entry(b.image, SIZES.blog)),
  ...trailImages.map((i) => entry(i, SIZES.trail, LOW_QUALITY)),
  entry(images.footer, SIZES.footer, LOW_QUALITY),
]

/**
 * Below-the-fold images are lazy by default. Once the page has fully loaded
 * and the main thread is idle, hint the browser to fetch them at low priority
 * so they are already cached by the time the visitor scrolls to them.
 */
export function ImagePrefetcher() {
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection
    if (conn?.saveData) return

    let cancelled = false
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))

    const run = () => {
      let i = 0
      const pump = () => {
        if (cancelled) return
        // Small batches so prefetching never competes with interaction.
        for (const end = i + 6; i < end && i < queue.length; i++) {
          const { src, sizes, quality } = queue[i]
          const { props } = getImageProps({ src, alt: "", sizes, quality })
          preload(props.src, {
            as: "image",
            imageSrcSet: props.srcSet,
            imageSizes: props.sizes,
            fetchPriority: "low",
          })
        }
        if (i < queue.length) idle(pump)
      }
      idle(pump)
    }

    if (document.readyState === "complete") run()
    else window.addEventListener("load", run, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener("load", run)
    }
  }, [])

  return null
}
