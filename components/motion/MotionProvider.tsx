"use client"

import type { ReactNode } from "react"
import { LazyMotion, MotionConfig, domAnimation } from "motion/react"

/**
 * `LazyMotion` + `m` components ship only the animation features we use,
 * instead of the full `motion` bundle. `strict` makes a stray `motion.div`
 * fail loudly in development.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
