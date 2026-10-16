import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogPost } from "@/components/blog/BlogPost"
import { Cta } from "@/components/home/Cta"
import { getInsight, insights } from "@/lib/site-data"

// One page per entry in `insights`; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const post = getInsight(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Saramoz Homes`,
    description: post.summary,
  }
}

export default async function BlogPage(props: PageProps<"/blogs/[slug]">) {
  const { slug } = await props.params
  const post = getInsight(slug)
  if (!post) notFound()

  return (
    <>
      <BlogPost post={post} />
      <Cta />
    </>
  )
}
