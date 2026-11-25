import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Cta } from "@/components/home/Cta"
import { ListingDetail } from "@/components/listing/ListingDetail"
import { closedLabel, getProperty, properties } from "@/lib/site-data"

// One page per entry in `properties`; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<"/listings/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const p = getProperty(slug)
  if (!p) return {}
  return {
    title: `${p.closed ? `${closedLabel(p)}: ` : ""}${p.title}, ${p.area} — Saramoz Homes`,
    description: p.summary,
  }
}

export default async function ListingPage(
  props: PageProps<"/listings/[slug]">
) {
  const { slug } = await props.params
  const p = getProperty(slug)
  if (!p) notFound()

  return (
    <>
      <ListingDetail p={p} />
      {p.closed?.status === "leased" ? (
        <Cta
          title={["Have a Home", "to Rent Out?"]}
          listingSlug={p.slug}
          summary={`${p.title} leased in ${p.closed.daysOnMarket} days. Ask Sara about finding a reliable tenant for your property.`}
        />
      ) : p.closed?.side === "buyer" ? (
        <Cta
          title={["Looking for a Home", "Like This One?"]}
          listingSlug={p.slug}
          summary={`Sara represented the buyers of ${p.title}. Tell her what you are looking for and she will get back to you personally.`}
        />
      ) : p.closed ? (
        <Cta
          title={["Thinking of Selling", "in the Neighbourhood?"]}
          listingSlug={p.slug}
          summary={`${p.title} sold for ${p.closed.percentOfList}% of asking. Ask Sara what your home could sell for — she will get back to you personally.`}
        />
      ) : (
        <Cta
          title={["Ready to Talk", "About This Home?"]}
          listingSlug={p.slug}
          summary={`Book a private showing of ${p.title} or ask Sara anything about it — price, neighbourhood, next steps. She will get back to you personally.`}
        />
      )}
    </>
  )
}
