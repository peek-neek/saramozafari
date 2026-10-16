"use client"

import { Children, type ReactNode } from "react"
import * as m from "motion/react-m"

const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds. The reference staggers sibling blocks in 0.2s steps. */
  delay?: number
  y?: number
}

/** Fade + rise into place when the block's top crosses 90% of the viewport. */
export function Reveal({ children, className, delay = 0, y = 80 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </m.div>
  )
}

/** Reveals each direct child in sequence, 0.2s apart. */
export function Stagger({
  children,
  className,
  itemClassName,
  each = 0.2,
}: {
  children: ReactNode
  className?: string
  itemClassName?: string
  each?: number
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: each }}
    >
      {Children.map(children, (child) => (
        <m.div
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: 80 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
          }}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  )
}
