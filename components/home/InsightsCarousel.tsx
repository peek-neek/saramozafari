"use client"

import * as m from "motion/react-m"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { InsightCard } from "@/components/blog/InsightCard"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"
import type { Insight } from "@/lib/site-data"

const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const

/** Square prev/next pair under the slide. Phones only. */
function Arrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const cls =
    "size-10 rounded-none bg-ink text-paper hover:bg-ink-soft disabled:opacity-30 [&_svg:not([class*='size-'])]:size-5"
  return (
    <div className="mt-8 flex justify-center gap-6 md:hidden">
      <Button className={cls} onClick={scrollPrev} disabled={!canScrollPrev}>
        <ArrowLeft />
        <span className="sr-only">Previous article</span>
      </Button>
      <Button className={cls} onClick={scrollNext} disabled={!canScrollNext}>
        <ArrowRight />
        <span className="sr-only">Next article</span>
      </Button>
    </div>
  )
}

/**
 * Phones: one article at a time, swiped or stepped with the arrows below.
 * md+: Embla switches off and the same markup becomes a 3-up grid.
 * Cards rise in sequence when the block scrolls into view (variants propagate
 * from the outer `m.div`, so off-screen slides animate in step too).
 */
export function InsightsCarousel({ posts }: { posts: Insight[] }) {
  return (
    <m.div
      className="mt-14 md:mt-20"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.2 }}
    >
      <Carousel
        opts={{ align: "start", breakpoints: { "(min-width: 768px)": { active: false } } }}
        // Desktop has no slides to clip, so let the cards' rise show unmasked.
        className="md:[&_[data-slot=carousel-content]]:overflow-visible"
      >
        <CarouselContent className="md:ml-0 md:grid md:grid-cols-3 md:gap-5">
          {posts.map((post) => (
            <CarouselItem
              key={post.slug}
              className="md:pl-0 [&:nth-child(4)]:md:hidden"
            >
              <m.div
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
                }}
              >
                <InsightCard post={post} />
              </m.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Arrows />
      </Carousel>
    </m.div>
  )
}
