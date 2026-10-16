import Image from "next/image"

import { QUALITY, SIZES } from "@/lib/image-sizes"
import { processSteps } from "@/lib/site-data"

import { SectionHeader } from "./SectionHeader"

type Step = (typeof processSteps)[number]

/**
 * One step, flush with the section background. On md+ each step pins at the
 * same offset and the next one slides up over it.
 */
function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <div className="bg-sand md:sticky md:top-24 md:h-[min(46rem,calc(100svh-7rem))]">
      <article className="flex h-full flex-col">
        <div className="flex items-baseline justify-between border-b border-black/15 pb-5 md:pb-7">
          <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-neutral-500">
            {step.title}
          </h3>
          <span className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-neutral-500">
            ({String(index + 1).padStart(2, "0")})
          </span>
        </div>

        <div className="mt-8 grid min-h-0 flex-1 gap-8 md:mt-10 md:grid-cols-3 md:gap-10">
          <p className="text-[clamp(1.375rem,2.2vw,2rem)] leading-snug font-medium tracking-tight text-ink">
            {step.summary}
          </p>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand-deep md:aspect-auto md:h-full">
            <Image
              src={step.image}
              alt=""
              fill
              sizes={SIZES.process}
              quality={QUALITY}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <ul className="grid list-disc content-start gap-3 pl-5 text-lg text-neutral-600 marker:text-neutral-500 md:pl-12">
            {step.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  )
}

export function Process() {
  return (
    <section id="process" className="relative z-[1] bg-sand">
      <div className="section-gap container-site">
        <SectionHeader
          eyebrow="Process"
          title={["How Sara Works"]}
          summary="Five clear steps from first coffee to the day you get your keys - the same calm, organised approach whether you are buying, selling or both."
        />
        <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-24">
          {processSteps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
