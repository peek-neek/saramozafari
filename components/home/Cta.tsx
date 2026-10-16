import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { ImageTrail } from "@/components/motion/ImageTrail"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { brand, trailImages } from "@/lib/site-data"

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink">
      <ImageTrail images={trailImages} className="relative">
        <div className="relative z-10 container-site flex min-h-[85svh] flex-col items-center justify-center gap-8 py-28 text-center">
          <SplitText
            lines={["Ready to Find", "Your Place in the GTA?"]}
            className="text-[clamp(2.75rem,7vw,6.5rem)] leading-[1] font-medium tracking-[-0.04em] text-paper"
          />
          <Reveal delay={0.2} className="max-w-xl">
            <p className="text-lg leading-relaxed text-neutral-400">
              Buying, selling or just weighing your options — book a free, no-pressure
              consultation and leave with a clear plan.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="flex flex-wrap items-center justify-center gap-3">
            <AnimatedButton href={brand.phoneHref} tone="light">
              {`Call ${brand.phone}`}
            </AnimatedButton>
            <AnimatedButton href={brand.instagram} target="_blank" rel="noreferrer" tone="glass">
              Message on Instagram
            </AnimatedButton>
          </Reveal>
        </div>
      </ImageTrail>
    </section>
  )
}
