import { InsightCard } from "@/components/blog/InsightCard"
import { Stagger } from "@/components/motion/Reveal"
import { insights } from "@/lib/site-data"

import { SectionHeader } from "./SectionHeader"

export function Insights() {
  return (
    <section id="insights" className="relative bg-paper">
      <div className="section-gap container-site">
        <SectionHeader
          eyebrow="Journal"
          title={["Market Notes", "& Home Advice"]}
          summary="Straight-talking guides on buying, selling and living in the GTA — the questions clients ask Sara most, answered in depth."
        />

        <Stagger
          className="mt-14 -mx-[clamp(1rem,3vw,2.5rem)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1rem,3vw,2.5rem)] pb-4 [scrollbar-width:none] md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
          itemClassName="w-[85vw] shrink-0 snap-start sm:w-[45vw] md:w-auto [&:nth-child(4)]:md:hidden"
        >
          {insights.map((post) => (
            <InsightCard key={post.slug} post={post} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
