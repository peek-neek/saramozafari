"use client"

import { useActionState, useState, type FormEvent } from "react"
import { ArrowRight, Check, Loader2, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactMessage, type ContactState } from "@/app/actions/contact"
import {
  CONTACT_LIMITS,
  OPTIONAL_FIELDS,
  digitsOnly,
  validateContact,
  validateContactField,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact"
import { cn } from "@/lib/utils"
import { brand } from "@/lib/site-data"

const initialState: ContactState = { status: "idle" }
const FIELDS: ContactField[] = ["name", "phone", "email", "message"]

// Dark, near-opaque fields so the image trail behind the form never hurts legibility.
const fieldClass =
  "rounded-none border-white/20 bg-ink/80 px-4 text-base text-paper backdrop-blur-sm placeholder:text-neutral-500 focus-visible:border-white/50 focus-visible:ring-white/20 md:text-base dark:bg-ink/80"
const labelClass = "text-sm font-normal text-neutral-300"
/** Visual marker only; the input's `required` is what screen readers announce. */
const RequiredMark = () => (
  <span aria-hidden className="text-red-300">
    *
  </span>
)
const altLinkClass =
  "inline-flex items-center gap-1.5 text-paper underline-offset-4 transition-colors hover:underline"

type ContactFormProps = {
  /** Slug of the listing this form sits under, so the email names the home. */
  listingSlug?: string
}

export function ContactForm({ listingSlug }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState)
  // Lets the visitor send a second message after a successful one.
  const [dismissedAttempt, setDismissedAttempt] = useState<number>()
  // Instant feedback in the browser. A key that's present (even as undefined)
  // means the field has been checked here and overrides the server's verdict.
  const [clientErrors, setClientErrors] = useState<ContactErrors>({})
  const [messageLength, setMessageLength] = useState(0)

  if (state.status === "success" && dismissedAttempt !== state.attempt) {
    return (
      <div role="status" data-no-trail className="flex flex-col items-center gap-4 text-paper">
        <p className="flex items-center gap-2 text-lg">
          <Check className="size-5" /> Thanks &mdash; Sara will be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setDismissedAttempt(state.attempt)
            setClientErrors({})
            setMessageLength(0)
          }}
          className="text-sm text-neutral-400 underline-offset-4 hover:text-paper hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  const serverErrors = state.status === "error" ? (state.errors ?? {}) : {}
  const values = state.status === "error" ? (state.values ?? {}) : {}
  const errorFor = (field: ContactField) =>
    field in clientErrors ? clientErrors[field] : serverErrors[field]

  const check = (field: ContactField, value: string) =>
    setClientErrors((prev) => ({ ...prev, [field]: validateContactField(field, value) }))

  /** Validate on blur; once a field has shown an error, re-check as they type. */
  const fieldProps = (field: ContactField) => {
    const error = errorFor(field)
    return {
      id: `contact-${field}`,
      name: field,
      required: !OPTIONAL_FIELDS.includes(field),
      disabled: pending,
      maxLength: CONTACT_LIMITS[field],
      defaultValue: values[field],
      onBlur: (e: { currentTarget: { value: string } }) => check(field, e.currentTarget.value),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
    }
  }
  const recheckIfShowingError = (field: ContactField, value: string) => {
    if (errorFor(field)) check(field, value)
  }

  // Block the request if anything is invalid, and send focus to the first problem.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget)
    const current = Object.fromEntries(
      FIELDS.map((f) => [f, String(data.get(f) ?? "")])
    ) as ContactValues
    const errors = validateContact(current)
    setClientErrors(Object.fromEntries(FIELDS.map((f) => [f, errors[f]])))
    const first = FIELDS.find((f) => errors[f])
    if (first) {
      e.preventDefault()
      e.currentTarget.querySelector<HTMLElement>(`#contact-${first}`)?.focus()
    }
  }

  return (
    <form
      data-no-trail
      // Remount per attempt so `defaultValue`s refill after a failed submit.
      key={state.attempt ?? 0}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="grid w-full max-w-xl gap-5 text-left sm:grid-cols-2"
    >
      <Field className="sm:col-span-2" data-disabled={pending || undefined}>
        <FieldLabel htmlFor="contact-name" className={labelClass}>
          Full name <RequiredMark />
        </FieldLabel>
        <Input
          {...fieldProps("name")}
          autoComplete="name"
          onChange={(e) => recheckIfShowingError("name", e.currentTarget.value)}
          className={`h-12 ${fieldClass}`}
        />
        <FieldError id="contact-name-error" className="text-red-300">
          {errorFor("name")}
        </FieldError>
      </Field>

      <Field data-disabled={pending || undefined}>
        <FieldLabel htmlFor="contact-phone" className={labelClass}>
          Mobile number <RequiredMark />
        </FieldLabel>
        <Input
          {...fieldProps("phone")}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="4165551234"
          // Numbers only: anything else typed or pasted is stripped as it lands.
          onChange={(e) => {
            const el = e.currentTarget
            const clean = digitsOnly(el.value).slice(0, CONTACT_LIMITS.phone)
            if (clean !== el.value) el.value = clean
            recheckIfShowingError("phone", clean)
          }}
          className={`h-12 ${fieldClass}`}
        />
        <FieldError id="contact-phone-error" className="text-red-300">
          {errorFor("phone")}
        </FieldError>
      </Field>

      <Field data-disabled={pending || undefined}>
        <FieldLabel htmlFor="contact-email" className={labelClass}>
          Email <span className="text-neutral-500">(optional)</span>
        </FieldLabel>
        <Input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          onChange={(e) => recheckIfShowingError("email", e.currentTarget.value)}
          className={`h-12 ${fieldClass}`}
        />
        <FieldError id="contact-email-error" className="text-red-300">
          {errorFor("email")}
        </FieldError>
      </Field>

      <Field className="sm:col-span-2" data-disabled={pending || undefined}>
        <div className="flex items-baseline justify-between gap-4">
          <FieldLabel htmlFor="contact-message" className={labelClass}>
            Message <RequiredMark />
          </FieldLabel>
          <span
            aria-live="polite"
            className={cn(
              "text-xs tabular-nums",
              messageLength >= CONTACT_LIMITS.message ? "text-red-300" : "text-neutral-500"
            )}
          >
            {messageLength}/{CONTACT_LIMITS.message}
          </span>
        </div>
        <Textarea
          {...fieldProps("message")}
          rows={5}
          placeholder="Tell Sara a little about what you're looking for."
          onChange={(e) => {
            setMessageLength(e.currentTarget.value.length)
            recheckIfShowingError("message", e.currentTarget.value)
          }}
          // Fixed height, no drag handle; long messages scroll inside.
          className={`h-36 resize-none py-3 field-sizing-fixed ${fieldClass}`}
        />
        <FieldError id="contact-message-error" className="text-red-300">
          {errorFor("message")}
        </FieldError>
      </Field>

      {listingSlug && <input type="hidden" name="listing" value={listingSlug} />}

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-center gap-3 sm:col-span-2">
        <Button
          type="submit"
          disabled={pending}
          className="h-12 w-full rounded-none bg-paper px-6 text-base font-medium text-ink hover:bg-sand-deep disabled:opacity-60 sm:w-auto"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending&hellip;
            </>
          ) : (
            <>
              Send <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        {state.status === "error" && state.message && (
          <p role="alert" className="text-sm text-red-300">
            {state.message}
          </p>
        )}
        <p className="text-sm text-neutral-400">or</p>
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <a href={brand.phoneHref} className={altLinkClass}>
            <Phone className="size-4" /> Call {brand.phone}
          </a>
          <span aria-hidden className="text-neutral-600">
            /
          </span>
          <a href={brand.smsHref} className={altLinkClass}>
            <MessageCircle className="size-4" /> Send a Text
          </a>
        </p>
      </div>
    </form>
  )
}
