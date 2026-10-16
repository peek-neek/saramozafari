"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check } from "lucide-react"

import { Input } from "@/components/ui/input"

/**
 * Front-end only for now — wire `onSubmit` to your email provider
 * (Mailchimp, ConvertKit, a Next.js route handler…) when ready.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle")

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("done")
  }

  if (status === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-lg text-paper">
        <Check className="size-5" /> Thanks — you&rsquo;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-stretch gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <Input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className="h-12 flex-1 rounded-none border-white/20 bg-white/5 px-4 text-base text-paper placeholder:text-neutral-500 focus-visible:border-white/50 focus-visible:ring-white/20"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid size-12 shrink-0 place-items-center bg-paper text-ink transition-colors hover:bg-sand-deep"
      >
        <ArrowRight className="size-5" />
      </button>
    </form>
  )
}
