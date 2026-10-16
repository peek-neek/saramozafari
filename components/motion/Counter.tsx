"use client"

import { useEffect, useRef } from "react"
import { animate, useInView } from "motion/react"

/** Counts up from 0 once in view. Writes to the DOM directly — no re-renders. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })

  // Hydrated: start from zero so the count-up has somewhere to come from.
  useEffect(() => {
    if (ref.current && !inView) ref.current.textContent = "0" + suffix
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.floor(v).toLocaleString() + suffix
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix])

  // Server-render the final value so it is correct without JS and for crawlers.
  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}
