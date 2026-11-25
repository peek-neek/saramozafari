import { ListingsGrid } from "@/components/home/ListingsGrid"
import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { properties } from "@/lib/site-data"

export function Properties() {
  return (
    <section id="listings" className="relative bg-ink text-paper">
      <div className="container-site">
        <div className="relative">
          {/* Column guide lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden grid-cols-3 border-x border-white/10 lg:grid"
          >
            <span />
            <span className="border-x border-white/10" />
            <span />
          </div>

          {/* Pinned title — stays centred while the listings scroll over it */}
          <div className="sticky top-0 flex h-svh items-center">
            <div className="grid w-full gap-6 lg:grid-cols-3 lg:gap-0">
              <Reveal y={24} className="lg:self-start lg:text-center">
                <p className="text-[clamp(1rem,1.6vw,1.75rem)] font-medium text-neutral-300">
                  [ Listings ]
                </p>
              </Reveal>
              <SplitText
                lines={["Homes Worth", "Coming", "Home To"]}
                className="text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-paper lg:py-[clamp(6rem,14vh,10rem)] lg:pr-6 lg:pl-2"
              />
              <Reveal
                delay={0.2}
                className="max-w-md lg:self-end lg:pr-6 lg:pl-1"
              >
                <p className="text-lg leading-relaxed text-neutral-300">
                  Current listings and recent sales from across the GTA — from
                  family homes in York Region to renovated condos. Every listing
                  is one Sara would walk you through herself.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Listings scroll up over the pinned title */}
          <div className="relative z-10 pb-[clamp(4.5rem,9vw,7.5rem)]">
            <ListingsGrid properties={properties} />

            <div className="mt-[clamp(5rem,10vw,9rem)] flex justify-center">
              <AnimatedButton href="#contact" tone="light">
                Ask About a Listing
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
