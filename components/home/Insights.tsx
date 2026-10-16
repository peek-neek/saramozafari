import { insights } from "@/lib/site-data"

import { InsightsCarousel } from "./InsightsCarousel"
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

        <InsightsCarousel posts={insights} />
      </div>
    </section>
  )
}
