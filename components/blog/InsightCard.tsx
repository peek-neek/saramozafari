import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"

import { AnimatedButtonLabel } from "@/components/motion/AnimatedButton"
import { QUALITY, SIZES } from "@/lib/image-sizes"
import { insightHref, type Insight } from "@/lib/site-data"

/** Journal card, used on the homepage and under each article. */
export function InsightCard({ post }: { post: Insight }) {
  return (
    <Link href={insightHref(post)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={post.image}
          alt=""
          fill
          sizes={SIZES.blog}
          quality={QUALITY}
          placeholder="blur"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
        <span className="absolute inset-0 hidden items-center justify-center bg-white/10 opacity-0 backdrop-blur-[4px] transition-opacity duration-500 group-hover:opacity-100 md:flex">
          <span className="translate-y-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
            <AnimatedButtonLabel className="px-8">Read</AnimatedButtonLabel>
          </span>
        </span>
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-neutral-500">
        <CalendarDays className="size-4" /> {post.date}
      </p>
      <h3 className="mt-2 text-2xl leading-snug font-medium tracking-tight text-ink decoration-1 underline-offset-4 group-hover:underline">
        {post.title}
      </h3>
    </Link>
  )
}
