"use client"

import { useActionState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter"

const initialState: NewsletterState = { status: "idle" }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState)

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-lg text-paper">
        <Check className="size-5" /> Thanks — you&rsquo;re on the list.
      </p>
    )
  }

  return (
    <div className="w-full max-w-md">
      <form action={formAction} className="flex w-full items-stretch gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          disabled={pending}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
          className="h-12 flex-1 rounded-none border-white/20 bg-white/5 px-4 text-base text-paper placeholder:text-neutral-500 focus-visible:border-white/50 focus-visible:ring-white/20"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={pending}
          className="grid size-12 shrink-0 place-items-center bg-paper text-ink transition-colors hover:bg-sand-deep disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-5 animate-spin" /> : <ArrowRight className="size-5" />}
        </button>
      </form>
      {state.status === "error" && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-300">
          {state.message}
        </p>
      )}
    </div>
  )
}
