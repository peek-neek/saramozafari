"use server"

import { Resend } from "resend"

import {
  digitsOnly,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact"
import { renderBrandedEmail } from "@/lib/email"
import { brand, closedLabel, getProperty } from "@/lib/site-data"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: ContactErrors
  /** Echoed back on error so the visitor doesn't lose what they typed. */
  values?: Partial<ContactValues>
  /** Changes on every submit; the form remounts on it to pick up `values`. */
  attempt?: number
}

/** 4165551234 → 416-555-1234; 14165551234 → +1 416-555-1234; others as typed. */
const formatPhone = (digits: string) => {
  const m = digits.match(/^(1?)(\d{3})(\d{3})(\d{4})$/)
  if (!m) return `+${digits}`
  return `${m[1] ? "+1 " : ""}${m[2]}-${m[3]}-${m[4]}`
}

const GENERIC_ERROR =
  "Something went wrong. Please try again, or call Sara directly."

/**
 * Sends the homepage contact form to CONTACT_TO_EMAIL (falls back to
 * NEWSLETTER_TO_EMAIL). Swap the recipient in .env.local at handover.
 */
export async function sendContactMessage(
  prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const attempt = (prev.attempt ?? 0) + 1
  const get = (key: string) => String(formData.get(key) ?? "").trim()

  // Honeypot: real visitors never see or fill this field.
  if (get("company")) return { status: "success", attempt }

  const values: ContactValues = {
    name: get("name"),
    phone: get("phone"),
    email: get("email").toLowerCase(),
    message: get("message"),
  }

  const errors = validateContact(values)
  if (Object.keys(errors).length) {
    return { status: "error", errors, values, attempt }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.NEWSLETTER_TO_EMAIL
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Saramoz Homes <onboarding@resend.dev>"

  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL")
    return { status: "error", message: GENERIC_ERROR, values, attempt }
  }

  // Sent from a listing page? The form only carries the slug; the name comes
  // from our own data, so nothing the visitor types can change it.
  const listing = getProperty(get("listing"))

  const digits = digitsOnly(values.phone)
  const e164 = `+${digits.length === 10 ? `1${digits}` : digits}`
  const firstName = values.name.split(/\s+/)[0]

  // Pre-filled reply for the "Send a Text" button — Sara can edit before sending.
  // "?&body=" is read correctly by both iOS and Android.
  const textStarter = listing?.closed
    ? `Hi ${firstName}, this is ${brand.agent} from ${brand.name}. Thank you for reaching out about ${listing.title}! I'd be happy to talk about what homes like yours are going for. When would be a good time for a quick call?`
    : listing
      ? `Hi ${firstName}, this is ${brand.agent} from ${brand.name}. Thank you for your interest in ${listing.title}! I'd be happy to answer any questions or set up a private showing. When would be a good time for you?`
      : `Hi ${firstName}, this is ${brand.agent} from ${brand.name}. Thank you for reaching out through my website! I'd love to learn a little more about what you're looking for. When would be a good time for a quick call?`

  // Pre-filled draft for the "Reply by Email" button. CRLF line breaks are the
  // mailto: standard and keep paragraphs intact across mail apps.
  const emailSubject = listing
    ? `Re: Your enquiry about ${listing.title}`
    : `Re: Your enquiry with ${brand.name}`
  const emailBody = [
    `Hi ${firstName},`,
    "",
    listing?.closed
      ? `Thank you for reaching out about ${listing.title} in ${listing.area}. That home has ${listing.closed.status === "leased" ? "been leased" : "sold"}, but I'd be glad to walk you through what similar homes are ${listing.closed.status === "leased" ? "renting" : "selling"} for, or help you find one like it.`
      : listing
        ? `Thank you for your interest in ${listing.title} in ${listing.area}. I'd be happy to answer any questions you have about the home, the neighbourhood or next steps, and I can set up a private showing at a time that suits you.`
        : `Thank you for reaching out through my website. I'd love to learn a little more about what you're looking for — whether you're buying, selling or just exploring your options — so I can point you in the right direction.`,
    "",
    "When would be a good time for a quick call?",
    // No sign-off: Sara's mail app adds her own signature below the draft.
  ].join("\r\n")
  const mailtoHref = `mailto:${values.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  const { html, text, attachments } = renderBrandedEmail({
    preheader: `${values.name} · ${formatPhone(digits)} — ${values.message.slice(0, 90)}`,
    eyebrow: listing ? "Listing Enquiry" : "New Enquiry",
    heading: listing
      ? `${values.name} is asking about ${listing.title}`
      : `New enquiry from ${values.name}`,
    intro: listing
      ? `Someone just reached out from the ${listing.title} listing page on ${brand.name}. Their details are below.`
      : `Someone just reached out through the contact form on ${brand.name}. Their details are below.`,
    details: [
      ...(listing
        ? [
            {
              label: "Listing",
              value: `${listing.title}, ${listing.area} · ${listing.closed ? `${closedLabel(listing)} ${listing.price}` : listing.price}`,
            },
          ]
        : []),
      { label: "Name", value: values.name },
      { label: "Mobile", value: formatPhone(digits), href: `tel:${e164}` },
      {
        label: "Email",
        value: values.email,
        href: values.email && `mailto:${values.email}`,
      },
    ],
    message: { label: "Message", body: values.message },
    actions: [
      {
        label: `Call ${firstName}`,
        href: `tel:${e164}`,
        primary: true,
        icon: "phone",
      },
      {
        label: "Send a Text",
        href: `sms:${e164}?&body=${encodeURIComponent(textStarter)}`,
        icon: "text",
      },
      ...(values.email
        ? [{ label: "Reply by Email", href: mailtoHref, icon: "mail" as const }]
        : []),
    ],
    note: values.email
      ? "You can also just hit reply — it goes straight to them."
      : "No email given — call or text them back on the number above.",
  })

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((addr) => addr.trim()),
    // No email given: Sara replies by phone/text, so leave Reply-To unset.
    ...(values.email && { replyTo: values.email }),
    subject: listing
      ? `Enquiry about ${listing.title} from ${values.name}`
      : `New enquiry from ${values.name}`,
    html,
    text,
    attachments,
  })

  if (error) {
    console.error("[contact] Resend error:", error)
    return { status: "error", message: GENERIC_ERROR, values, attempt }
  }

  return { status: "success", attempt }
}
