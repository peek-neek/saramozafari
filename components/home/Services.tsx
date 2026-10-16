"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"

import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Reveal } from "@/components/motion/Reveal"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { services } from "@/lib/site-data"
import { cn } from "@/lib/utils"

import { SectionHeader } from "./SectionHeader"

const EASE = [0.16, 1, 0.3, 1] as const

export function Services() {
  // First service starts open; -1 means every row is collapsed.
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative bg-paper">
      <div className="section-gap container-site">
        <SectionHeader
          eyebrow="Services"
          title={["What Sara", "Can Do for You"]}
          summary="Whatever your next move looks like, you get one point of contact who knows the GTA market inside out."
        />

        <Reveal className="mt-14 border-t border-black/10 md:mt-20">
          {services.map((s, i) => {
            const open = i === active
            const num = `(${String(i + 1).padStart(2, "0")})`
            return (
              <div key={s.name} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : i)}
                  aria-expanded={open}
                  className={cn(
                    "flex w-full cursor-pointer items-baseline justify-between gap-6 py-5 text-left transition-colors duration-500 md:py-6",
                    open ? "text-ink" : "text-neutral-400 hover:text-ink"
                  )}
                >
                  <span className="text-[clamp(2rem,5vw,4.5rem)] leading-none font-medium tracking-[-0.03em]">
                    {s.name}
                  </span>
                  <span className="text-base">{num}</span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <m.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <m.div
                            className="absolute inset-0"
                            initial={{ scale: 1.15 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.2, ease: EASE }}
                          >
                            <Image
                              src={s.image}
                              alt=""
                              fill
                              sizes={SIZES.service}
                              quality={QUALITY}
                              placeholder="blur"
                              className="object-cover"
                            />
                          </m.div>
                        </div>
                        <div className="flex flex-col justify-between gap-6  p-6 md:p-8">
                          <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium tracking-tight">
                            {s.body}
                          </p>
                          <AnimatedButton
                            href="#contact"
                            className="self-start"
                          >
                            {s.cta}
                          </AnimatedButton>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
