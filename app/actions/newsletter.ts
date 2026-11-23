"use server"

import { Resend } from "resend"

import { EMAIL_RE, renderBrandedEmail } from "@/lib/email"
import { brand } from "@/lib/site-data"

export type NewsletterState = {
  status: "idle" | "success" | "error"
  message?: string
}

/**
 * Notifies the site owner (NEWSLETTER_TO_EMAIL) whenever a visitor subscribes
 * via the footer newsletter form. Swap the recipient in .env.local at handover.
 */
export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NEWSLETTER_TO_EMAIL
  const from = process.env.RESEND_FROM_EMAIL ?? "Saramoz Homes <onboarding@resend.dev>"

  if (!apiKey || !to) {
    console.error("[newsletter] Missing RESEND_API_KEY or NEWSLETTER_TO_EMAIL")
    return { status: "error", message: "Something went wrong. Please try again later." }
  }

  const { html, text, attachments } = renderBrandedEmail({
    preheader: `${email} just joined your newsletter list.`,
    eyebrow: "Newsletter",
    heading: "New newsletter sign-up",
    intro: `Someone just subscribed through the newsletter form on ${brand.name}.`,
    details: [
      { label: "Email", value: email, href: `mailto:${email}` },
      { label: "Source", value: "Newsletter sign-up form" },
    ],
    actions: [{ label: "Email Them", href: `mailto:${email}`, primary: true, icon: "mail" }],
    note: "You can also just hit reply — it goes straight to them.",
  })

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((addr) => addr.trim()),
    replyTo: email,
    subject: `New newsletter sign-up: ${email}`,
    html,
    text,
    attachments,
  })

  if (error) {
    console.error("[newsletter] Resend error:", error)
    return { status: "error", message: "Something went wrong. Please try again later." }
  }

  return { status: "success" }
}
