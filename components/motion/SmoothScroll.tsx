"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { animate, type AnimationPlaybackControls } from "motion/react"

export const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const

let controls: AnimationPlaybackControls | null = null
let target = 0
let animating = false

function maxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Drop `#section` from the address bar without navigating. Keeping it would
 * make a refresh jump back to that section even after the visitor has scrolled
 * elsewhere; without it the browser restores their actual scroll position.
 * `history.state` is passed through so Next's router state is preserved.
 */
function clearHash() {
  if (!window.location.hash) return
  const { pathname, search } = window.location
  window.history.replaceState(window.history.state, "", pathname + search)
}

/** Animate the window to `y` using the same easing as wheel scrolling. */
export function scrollToY(y: number, duration = 1.2) {
  target = Math.max(0, Math.min(y, maxScroll()))
  controls?.stop()

  if (prefersReducedMotion()) {
    window.scrollTo(0, target)
    return
  }

  animating = true
  controls = animate(window.scrollY, target, {
    duration,
    ease: EASE_OUT_CUBIC,
    onUpdate: (v) => window.scrollTo(0, v),
    onComplete: () => {
      animating = false
    },
  })
}

/**
 * Inertia-style smooth scrolling driven by Motion's `animate`.
 * Desktop pointers only — touch devices keep native momentum scrolling.
 * Uses real window scroll, so `position: sticky` and `useScroll` keep working.
 */
export function SmoothScroll() {
  const pathname = usePathname()

  // Arriving with a hash (e.g. "All Insights" → /#insight-…): sections above
  // the target can still grow after the browser's jump (images and fonts
  // settling), which would leave us short of it. Keep the
  // target aligned while the layout settles, until the user takes over —
  // then clear the hash so a later refresh doesn't snap back here.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    const el = id ? document.getElementById(id) : null
    if (!el) return

    const align = () => {
      // A target hidden at this breakpoint falls back to its section.
      const target = el.getClientRects().length ? el : (el.closest("section") ?? el)
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - margin,
        behavior: "instant",
      })
    }

    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const
    const ro = new ResizeObserver(align)
    const detach = () => {
      ro.disconnect()
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, release))
    }
    const release = () => {
      detach()
      clearHash()
    }
    const timer = setTimeout(release, 2500)

    align()
    ro.observe(document.body)
    events.forEach((e) => window.addEventListener(e, release, { passive: true }))
    return detach
  }, [pathname])

  useEffect(() => {
    const finePointer = window.matchMedia("(min-width: 768px) and (pointer: fine)")

    const stop = () => {
      controls?.stop()
      animating = false
    }

    const onWheel = (e: WheelEvent) => {
      if (!finePointer.matches || prefersReducedMotion()) return
      // A full-screen overlay (e.g. the open menu) has locked page scroll.
      if (document.documentElement.hasAttribute("data-scroll-locked")) return
      // Let pinch-zoom, horizontal swipes and nested scroll areas behave natively.
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      if ((e.target as Element | null)?.closest?.("[data-native-scroll]")) return

      e.preventDefault()

      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      if (!animating) target = window.scrollY
      target = Math.max(0, Math.min(target + e.deltaY * unit, maxScroll()))

      controls?.stop()
      animating = true
      controls = animate(window.scrollY, target, {
        duration: 1,
        ease: EASE_OUT_CUBIC,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          animating = false
        },
      })
    }

    // In-page anchors (#about, #contact…) glide instead of jumping. Homepage
    // anchors (/#about) glide too when we're already on the homepage;
    // elsewhere they navigate normally. The hash is never written to the URL.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const link = (e.target as Element | null)?.closest?.("a[href^='#'], a[href^='/#']")
      if (!link) return
      const href = link.getAttribute("href")!
      if (href.startsWith("/") && window.location.pathname !== "/") return
      const hash = href.slice(href.indexOf("#"))
      const el = hash === "#top" ? document.body : document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      const y =
        hash === "#top" ? 0 : el.getBoundingClientRect().top + window.scrollY
      scrollToY(y)
      clearHash()
    }

    // Keyboard / scrollbar input should cancel an in-flight glide.
    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)
      ) {
        stop()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    // Capture phase: runs before next/link, whose navigation stands down
    // when we have already handled the click (defaultPrevented).
    window.addEventListener("click", onClick, true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("pointerdown", stop)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("click", onClick, true)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointerdown", stop)
      stop()
    }
  }, [])

  return null
}
