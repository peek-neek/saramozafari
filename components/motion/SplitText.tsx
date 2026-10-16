"use client"

import { Fragment, useEffect, type ElementType } from "react"
import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type SplitTextProps = {
  /** One string per visual line. */
  lines: string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  /** "inView" plays when scrolled into view; "load" plays on mount. */
  trigger?: "inView" | "load"
  delay?: number
  staggerEach?: number
  /** "slide" = chars slide in from the right; "mask" = chars rise from a clip mask. */
  variant?: "slide" | "mask"
}

/**
 * Character-split heading reveal. Spans are plain DOM (not motion components)
 * and animated with a single `useAnimate` call, which keeps long headings cheap.
 */
export function SplitText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  trigger = "inView",
  delay = 0,
  staggerEach = 0.035,
  variant = "slide",
}: SplitTextProps) {
  const [scope, animate] = useAnimate<HTMLElement>()
  const inView = useInView(scope, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const play = trigger === "load" || inView

  useEffect(() => {
    if (!play) return
    const chars = scope.current?.querySelectorAll("[data-char]")
    if (!chars?.length) return

    if (reduce) {
      animate(chars, { opacity: 1, transform: "none" }, { duration: 0 })
      return
    }

    animate(
      chars,
      variant === "mask"
        ? { opacity: [0, 1], y: ["100%", "0%"] }
        : { opacity: [0, 1], x: ["40%", "0%"], scale: [1.2, 1] },
      {
        duration: variant === "mask" ? 0.9 : 0.6,
        delay: stagger(staggerEach, { startDelay: delay }),
        ease: [0.16, 1, 0.3, 1],
      }
    )
  }, [play, reduce, animate, scope, delay, staggerEach, variant])

  // Inline styles (not Tailwind translate/scale utilities, which use separate
  // CSS properties) so Motion's `transform` fully replaces the start state.
  const initial = {
    opacity: 0,
    transform:
      variant === "mask" ? "translateY(100%)" : "translateX(40%) scale(1.2)",
  }

  return (
    <Tag ref={scope} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={cn("block", lineClassName)}>
          {line.split(" ").map((word, wi, words) => (
            <Fragment key={wi}>
              <span
                className={cn(
                  "inline-block whitespace-nowrap",
                  variant === "mask" && "overflow-hidden pb-[0.08em] align-bottom"
                )}
              >
                {Array.from(word).map((ch, ci) => (
                  <span key={ci} data-char className="inline-block" style={initial}>
                    {ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  )
}
