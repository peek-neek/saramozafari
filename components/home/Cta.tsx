import { ImageTrail } from "@/components/motion/ImageTrail"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { trailImages } from "@/lib/site-data"

import { ContactForm } from "./ContactForm"

type CtaProps = {
  /** Heading, one string per line. */
  title?: string[]
  summary?: string
  /** On a listing page: its slug, so the enquiry email names the home. */
  listingSlug?: string
}

export function Cta({
  title = ["Ready to Find", "Your Place in the GTA?"],
  summary = "Buying, selling or just weighing your options — book a free, no-pressure consultation and leave with a clear plan.",
  listingSlug,
}: CtaProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink">
      <ImageTrail images={trailImages} className="relative">
        <div className="container-site relative z-10 flex min-h-[85svh] flex-col items-center justify-center gap-8 py-28 text-center">
          <SplitText
            lines={title}
            className="text-[clamp(2.75rem,7vw,6.5rem)] leading-[1] font-medium tracking-[-0.04em] text-paper"
          />
          {/* <Reveal delay={0.2} className="max-w-xl">
            <p className="text-lg leading-relaxed text-neutral-400">{summary}</p>
          </Reveal> */}
          <Reveal delay={0.35} className="flex w-full justify-center">
            <ContactForm listingSlug={listingSlug} />
          </Reveal>
        </div>
      </ImageTrail>
    </section>
  )
}
