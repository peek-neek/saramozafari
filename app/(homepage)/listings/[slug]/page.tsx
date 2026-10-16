import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Cta } from "@/components/home/Cta"
import { ListingDetail } from "@/components/listing/ListingDetail"
import { getProperty, properties } from "@/lib/site-data"

// One page per entry in `properties`; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const p = getProperty(slug)
  if (!p) return {}
  return {
    title: `${p.title}, ${p.area} — Saramoz Homes`,
    description: p.summary,
  }
}

export default async function ListingPage(props: PageProps<"/listings/[slug]">) {
  const { slug } = await props.params
  const p = getProperty(slug)
  if (!p) notFound()

  return (
    <>
      <ListingDetail p={p} />
      <Cta />
    </>
  )
}
