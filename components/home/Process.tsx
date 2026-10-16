import Image from "next/image"

import { QUALITY, SIZES } from "@/lib/image-sizes"
import { processSteps } from "@/lib/site-data"

import { SectionHeader } from "./SectionHeader"

type Step = (typeof processSteps)[number]

/**
 * One step, flush with the section background. Each step pins at the same
 * offset and the next one slides up over it, so every step shares one
 * viewport-sized height. Phones: summary beside a portrait photo, points
 * full-width below. md+: summary, photo and points in three columns.
 */
function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <div className="sticky top-4 h-[min(46rem,calc(100svh-2rem))] bg-sand md:top-24 md:h-[min(46rem,calc(100svh-7rem))]">
      <article className="flex h-full flex-col">
        <div className="flex items-baseline justify-between border-b border-black/15 pb-5 md:pb-7">
          <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-neutral-500">
            {step.title}
          </h3>
          <span className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-tight text-neutral-500">
            ({String(index + 1).padStart(2, "0")})
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 md:mt-10 md:min-h-0 md:flex-1 md:grid-cols-3 md:gap-10">
          <p className="text-lg leading-snug font-medium tracking-tight text-ink md:text-[clamp(1.375rem,2.2vw,2rem)]">
            {step.summary}
          </p>
          <div className="relative aspect-[7/10] overflow-hidden bg-sand-deep md:aspect-auto md:h-full">
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
          <ul className="col-span-2 grid list-disc content-start gap-1.5 pl-5 text-base text-neutral-600 marker:text-neutral-500 md:col-span-1 md:gap-3 md:pl-12 md:text-lg">
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
