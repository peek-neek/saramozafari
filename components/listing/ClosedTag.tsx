import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/** Inverted twin of the area chip: solid ink with a paper square, like the site's bullets. */
export function ClosedTag({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <Badge
      className={cn(
        "h-auto gap-2 rounded-none bg-ink px-2.5 py-1 text-sm font-medium tracking-[0.18em] text-paper uppercase",
        className
      )}
    >
      <span aria-hidden className="size-1.5 bg-paper" />
      {label}
    </Badge>
  )
}
