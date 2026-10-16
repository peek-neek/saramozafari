import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { InsightCard } from "@/components/blog/InsightCard"
import { AnimatedButton } from "@/components/motion/AnimatedButton"
import { Reveal, Stagger } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { brand, insights, readingTime, type Insight } from "@/lib/site-data"

export function BlogPost({ post }: { post: Insight }) {
  const meta = [
    { label: "Category", value: post.category },
    { label: "Author", value: brand.agent },
    { label: "Reading Time", value: `${readingTime(post)} min read` },
    { label: "Published", value: post.date },
  ]
  const more = insights.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="bg-paper text-ink">
        <div className="container-site pt-[clamp(7.5rem,12vw,10rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
          <Reveal y={24}>
            <Link
              href="/#insights"
              className="inline-flex items-center gap-2 text-neutral-500 transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" />
              All Insights
            </Link>
          </Reveal>

          {/* Title block */}
          <div className="mx-auto mt-10 flex max-w-212 flex-col items-center gap-6 text-center md:mt-6">
            <Reveal y={24}>
              <p className="text-neutral-500">[ {post.category} ]</p>
            </Reveal>
            <SplitText
              as="h1"
              trigger="load"
              delay={0.1}
              staggerEach={0.02}
              lines={[post.title]}
              className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] font-medium tracking-[-0.03em]"
            />
            <Reveal delay={0.2} className="max-w-xl">
              <p className="text-lg leading-relaxed text-neutral-600">{post.summary}</p>
            </Reveal>
          </div>

          {/* Category, author, reading time, date */}
          <Stagger
            className="mx-auto mt-12 grid max-w-212 grid-cols-2 gap-x-6 gap-y-6 md:mt-14 md:grid-cols-4"
            each={0.08}
          >
            {meta.map((m) => (
              <div key={m.label} className="border-t border-neutral-300 pt-3">
                <p className="text-sm text-neutral-500">[ {m.label} ]</p>
                <p className="mt-1 font-medium">{m.value}</p>
              </div>
            ))}
          </Stagger>

          {/* Banner */}
          <Reveal delay={0.3} className="mt-12 md:mt-16">
            <div className="relative aspect-4/3 overflow-hidden bg-neutral-200 md:aspect-21/9">
              <Image
                src={post.image}
                alt=""
                fill
                preload
                sizes={SIZES.listingHero}
                quality={QUALITY}
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Body: one readable column */}
          <div className="mx-auto mt-[clamp(4rem,8vw,6.5rem)] flex max-w-180 flex-col gap-12 md:gap-16">
            {post.sections.map((s) => (
              <Reveal key={s.heading} y={40}>
                <section>
                  <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-medium tracking-tight">
                    {s.heading}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-neutral-600">
                    {s.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                  {s.image && (
                    <div className="relative mt-10 aspect-3/2 overflow-hidden bg-neutral-200">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes={SIZES.blogBody}
                        quality={QUALITY}
                        placeholder="blur"
                        className="object-cover"
                      />
                    </div>
                  )}
                </section>
              </Reveal>
            ))}

            <Reveal y={40}>
              <div className="flex flex-col items-start gap-6 border-t border-neutral-300 pt-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xl leading-snug font-medium">
                  Questions about your own move?
                  <span className="block text-neutral-500">Sara is happy to talk it through.</span>
                </p>
                <AnimatedButton href="#contact" className="shrink-0">
                  Talk to Sara
                </AnimatedButton>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <section aria-label="More Insights" className="bg-paper">
        <div className="container-site border-t border-neutral-200 pt-[clamp(4rem,8vw,6.5rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
          <SplitText
            lines={["More Insights"]}
            className="text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-tight text-ink"
          />
          <Stagger className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-5" each={0.12}>
            {more.map((p) => (
              <InsightCard key={p.slug} post={p} />
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
