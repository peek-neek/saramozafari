"use client"

import React, { useEffect, useId, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { brand, images, navLinks, services } from "@/lib/site-data"
import { LOW_QUALITY, SIZES } from "@/lib/image-sizes"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const
/** Collapsed bar width (px) — matches max-w-[65rem]. */
const CLOSED_WIDTH = 1040

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/#top"
      aria-label={`${brand.name} — home`}
      className={cn(
        "text-xl font-bold tracking-tight text-paper md:text-2xl",
        className
      )}
    >
      {brand.wordmark}
    </Link>
  )
}

/** Two left-aligned lines (long + short) that merge into one inside a grey tile. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <m.span
      aria-hidden
      className="relative grid h-11 w-16 place-items-center md:w-20"
      initial={false}
      animate={{ backgroundColor: open ? "#262626" : "rgba(38,38,38,0)" }}
      transition={{ duration: 0.4 }}
    >
      <span className="relative block h-3 w-10 md:w-12">
        <m.span
          className="absolute top-0 left-0 h-0.5 w-full bg-paper"
          initial={false}
          animate={{ y: open ? 5 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
        <m.span
          className="absolute top-2.5 left-0 h-0.5 bg-paper"
          initial={false}
          animate={{ y: open ? -5 : 0, width: open ? "100%" : "60%" }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </span>
    </m.span>
  )
}

function Card({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <m.div
      className={cn("bg-paper p-6 md:p-10", className)}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: 0.55 + index * 0.08, duration: 0.7, ease: EASE },
      }}
      exit={{ opacity: 0, y: 16, transition: { duration: 0.25 } }}
    >
      {children}
    </m.div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-2xl font-medium tracking-tight text-ink md:text-3xl">
      {children}
    </p>
  )
}

const linkClass =
  "text-lg text-neutral-500 transition-colors hover:text-ink md:text-xl"

const Header = () => {
  const [open, setOpen] = useState(false)
  const [openWidth, setOpenWidth] = useState(CLOSED_WIDTH)
  const panelId = useId()

  const toggle = () => {
    // Measure at click time so the bar grows exactly to the viewport edge.
    setOpenWidth(window.innerWidth)
    setOpen((v) => !v)
  }
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    // Lock page scroll (SmoothScroll also checks this attribute).
    root.setAttribute("data-scroll-locked", "")
    root.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onResize = () => setOpenWidth(window.innerWidth)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      root.removeAttribute("data-scroll-locked")
      root.style.overflow = ""
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <m.nav
        aria-label="Main"
        className="mx-auto w-full max-w-[65rem] bg-ink p-2"
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: 1,
          y: 0,
          maxWidth: open ? openWidth : CLOSED_WIDTH,
          transition: {
            opacity: { duration: 0.8, ease: EASE },
            y: { duration: 0.8, ease: EASE },
            // Open: widen first. Close: wait for the panel to fold, then narrow.
            maxWidth: { duration: 0.7, ease: EASE, delay: open ? 0 : 0.45 },
          },
        }}
      >
        {/* Bar: menu · logo · contact */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            className="justify-self-start focus-visible:ring-3 focus-visible:ring-white/40 focus-visible:outline-none"
          >
            <MenuIcon open={open} />
          </button>
          <Logo />
          <AnimatedButton
            href="#contact"
            onClick={close}
            tone="ghost"
            icon={false}
            className="justify-self-end px-3 py-2 md:px-5 md:text-lg"
          >
            Contact
          </AnimatedButton>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id={panelId}
              key="panel"
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{
                height: "auto",
                transition: { duration: 0.7, ease: EASE, delay: 0.2 },
              }}
              exit={{
                height: 0,
                transition: { duration: 0.55, ease: EASE, delay: 0.15 },
              }}
            >
              <div
                data-native-scroll
                className="mt-2 grid max-h-[calc(100svh-7rem)] gap-2 overflow-y-auto overscroll-contain md:h-[calc(100svh-7.5rem)] md:max-h-none md:grid-cols-3"
              >
                <Card index={0}>
                  <CardTitle>Explore</CardTitle>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
                    {navLinks.map((l, i) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={close}
                          className={cn(linkClass, i === 0 && "text-ink")}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card index={1} className="flex flex-col gap-10">
                  <div>
                    <CardTitle>Services</CardTitle>
                    <ul className="space-y-3">
                      {services.map((s) => (
                        <li key={s.name}>
                          <Link href="/#services" onClick={close} className={linkClass}>
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <CardTitle>Contact</CardTitle>
                    <ul className="space-y-3">
                      <li>
                        <a href={brand.phoneHref} className={linkClass}>
                          {brand.phone}
                        </a>
                      </li>
                      <li>
                        <a href={`mailto:${brand.email}`} className={linkClass}>
                          {brand.email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Card>

                <div className="grid gap-2 md:grid-rows-[auto_1fr]">
                  <Card index={2}>
                    <CardTitle>Follow Sara</CardTitle>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href={brand.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className={linkClass}
                        >
                          Instagram {brand.instagramHandle}
                        </a>
                      </li>
                      <li className={cn(linkClass, "hover:text-neutral-500")}>
                        {brand.region}
                      </li>
                    </ul>
                  </Card>

                  <m.div
                    className="relative min-h-64 overflow-hidden"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.7, duration: 0.9, ease: EASE },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  >
                    <Image
                      src={images.sara}
                      alt=""
                      fill
                      sizes={SIZES.menu}
                      quality={LOW_QUALITY}
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end gap-5 bg-linear-to-t from-black/80 via-black/25 to-transparent p-6 md:p-10">
                      <p className="text-2xl leading-tight font-medium text-paper md:text-3xl">
                        Patient guidance.
                        <br />
                        Precise results.
                      </p>
                      <AnimatedButton
                        href="#contact"
                        onClick={close}
                        className="self-start"
                      >
                        Book a Call
                      </AnimatedButton>
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.nav>
    </header>
  )
}

export default Header
