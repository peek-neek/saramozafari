"use client"

import { Plus } from "lucide-react"
import * as m from "motion/react-m"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { useIsMobile } from "@/hooks/use-mobile"
import { faqs } from "@/lib/site-data"

// Desktop: questions fan out into a staircase as they enter the viewport.
const STAIR = ["0%", "12%", "22%", "32%", "44%"]

export function Faq() {
  const isMobile = useIsMobile()

  return (
    <section id="faq" className="relative bg-sand">
      <div className="section-gap container-site">
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-sm">
            <p className="text-2xl font-medium">Still have questions?</p>
            <p className="mt-2 text-neutral-600">
              Every move is different. Send Sara a message and get a straight
              answer, usually the same day.
            </p>
            <AnimatedButton href="#contact" className="mt-6">
              Ask Sara
            </AnimatedButton>
          </Reveal>
          <SplitText
            lines={["FAQs"]}
            className="text-[clamp(4rem,14vw,12rem)] leading-[0.85] font-medium tracking-[-0.05em]"
          />
        </div>

        <m.div
          className="mt-14 md:mt-20"
          initial="stacked"
          whileInView="stairs"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        >
          <Accordion className="gap-2">
            {faqs.map((f, i) => (
              <m.div
                key={f.q}
                className="md:max-w-[53rem]"
                variants={{
                  stacked: { x: "0%" },
                  stairs: {
                    x: isMobile ? "0%" : STAIR[i],
                    transition: {
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                <AccordionItem
                  value={f.q}
                  className="bg-paper transition-colors not-last:border-b-0 hover:bg-white"
                >
                  <AccordionTrigger className="group/faq items-center gap-6 rounded-none px-5 py-5 text-lg font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden md:px-6 md:text-xl">
                    <span className="flex-1">{f.q}</span>
                    <span className="grid size-10 shrink-0 place-items-center text-black transition-transform duration-500 group-aria-expanded/faq:rotate-45">
                      <Plus className="size-5" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 text-base leading-relaxed text-neutral-600 md:px-6">
                    <p className="max-w-2xl pb-3">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              </m.div>
            ))}
          </Accordion>
        </m.div>
      </div>
    </section>
  )
}
