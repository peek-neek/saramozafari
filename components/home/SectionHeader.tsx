import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow?: string
  title: string[]
  summary?: string
  tone?: "light" | "dark"
  className?: string
  align?: "split" | "center"
}

/** Title on the left, summary on the right — the rhythm every section shares. */
export function SectionHeader({
  eyebrow,
  title,
  summary,
  tone = "light",
  className,
  align = "split",
}: SectionHeaderProps) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "split"
          ? "md:flex-row md:items-end md:justify-between md:gap-16"
          : "items-center text-center",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <Reveal y={24}>
            <p className={cn("mb-4 text-base", dark ? "text-neutral-400" : "text-neutral-500")}>
              [ {eyebrow} ]
            </p>
          </Reveal>
        )}
        <SplitText
          lines={title}
          className={cn(
            "text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.03em]",
            dark ? "text-paper" : "text-ink"
          )}
        />
      </div>
      {summary && (
        <Reveal delay={0.2} className="max-w-md">
          <p className={cn("text-lg leading-relaxed", dark ? "text-neutral-400" : "text-neutral-600")}>
            {summary}
          </p>
        </Reveal>
      )}
    </div>
  )
}
