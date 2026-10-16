import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type Tone = "dark" | "light" | "glass" | "ghost"

// `hoverText` sits on the <a> itself, which *is* the group — so it must use
// `hover:`; `group-hover/btn:` only matches descendants and would never fire.
const tones: Record<Tone, { base: string; fill: string; hoverText: string }> = {
  dark: { base: "bg-ink text-paper", fill: "bg-neutral-700", hoverText: "" },
  light: {
    base: "bg-paper text-ink",
    // Same grey wipe as the header's Contact button.
    fill: "bg-neutral-700",
    hoverText: "hover:text-paper",
  },
  glass: {
    base: "bg-white/15 text-white backdrop-blur-md",
    fill: "bg-white",
    hoverText: "hover:text-ink",
  },
  // For dark surfaces (the header): no box until hover, then a grey wipe.
  ghost: { base: "bg-transparent text-paper", fill: "bg-neutral-700", hoverText: "" },
}

// A transition applies when its state is *entered*, so each row needs a
// different timing per direction: whichever row is leaving fades out fast
// (gone before it slides past the other), the arriving row fades in over the
// whole slide. `--d` is the per-letter stagger. Kept as full literals so
// Tailwind can see them.
const ENTER = "[transition:transform_700ms_var(--ease-out-expo)_var(--d),opacity_700ms_ease-out_var(--d)]"
const LEAVE = "[transition:transform_700ms_var(--ease-out-expo)_var(--d),opacity_250ms_ease-out_var(--d)]"
const HOVER_ENTER = "group-hover/btn:[transition:transform_700ms_var(--ease-out-expo)_var(--d),opacity_700ms_ease-out_var(--d)]"
const HOVER_LEAVE = "group-hover/btn:[transition:transform_700ms_var(--ease-out-expo)_var(--d),opacity_250ms_ease-out_var(--d)]"

/** Text that rolls up letter-by-letter on hover (pure CSS, compositor-only). */
function RollingText({ children }: { children: string }) {
  const chars = Array.from(children)
  const row = (hidden?: boolean) => (
    <span
      aria-hidden={hidden}
      className={cn("flex", hidden && "absolute inset-0")}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          className={cn(
            "inline-block whitespace-pre",
            hidden
              ? cn(LEAVE, HOVER_ENTER, "translate-y-full opacity-0 group-hover/btn:translate-y-0 group-hover/btn:opacity-100")
              : cn(ENTER, HOVER_LEAVE, "group-hover/btn:-translate-y-full group-hover/btn:opacity-0")
          )}
          style={{ "--d": `${i * 25}ms` } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  )
  return (
    <span className="relative block overflow-hidden">
      {row()}
      {row(true)}
    </span>
  )
}

type ButtonLookProps = {
  children: string
  tone?: Tone
  icon?: ReactNode | false
  className?: string
}

type AnimatedButtonProps = ButtonLookProps & Omit<ComponentProps<"a">, "children">

const buttonClass = (tone: Tone, className?: string) =>
  cn(
    "group/btn relative inline-flex items-center gap-3 overflow-hidden px-5 py-3 text-base font-medium transition-colors duration-700 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
    tones[tone].base,
    tones[tone].hoverText,
    className
  )

function ButtonBody({ children, tone, icon }: Required<Pick<ButtonLookProps, "children" | "tone">> & Pick<ButtonLookProps, "icon">) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute -inset-px origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover/btn:scale-x-100",
          tones[tone].fill
        )}
      />
      <span className="relative">
        <RollingText>{children}</RollingText>
      </span>
      {icon !== false && (
        <span className="relative transition-transform duration-700 ease-out-expo group-hover/btn:rotate-45">
          {icon ?? <ArrowUpRight className="size-4" />}
        </span>
      )}
    </>
  )
}

/**
 * Primary CTA: a colour layer wipes in from the left while the label rolls.
 * Rendered as an <a> so it works for anchors, tel:, mailto: and external links.
 */
export function AnimatedButton({
  children,
  tone = "dark",
  icon,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <a {...props} className={buttonClass(tone, className)}>
      <ButtonBody tone={tone} icon={icon}>
        {children}
      </ButtonBody>
    </a>
  )
}

/**
 * The same look as a plain <span>, for use inside a link that already covers
 * a larger area (a card) — links can't nest.
 */
export function AnimatedButtonLabel({ children, tone = "dark", icon, className }: ButtonLookProps) {
  return (
    <span className={buttonClass(tone, className)}>
      <ButtonBody tone={tone} icon={icon}>
        {children}
      </ButtonBody>
    </span>
  )
}
