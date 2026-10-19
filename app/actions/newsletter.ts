"use server"

import { Resend } from "resend"

import { brand } from "@/lib/site-data"

export type NewsletterState = {
  status: "idle" | "success" | "error"
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

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

  const submittedAt = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  })
  const safeEmail = escapeHtml(email)

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((addr) => addr.trim()),
    replyTo: email,
    subject: `New email from your website: ${email}`,
    text: [
      "New email came from your website",
      "",
      `Email: ${email}`,
      `Submitted: ${submittedAt} (Toronto time)`,
      "Source: Newsletter sign-up form",
      "",
      "Reply to this email to respond to them directly.",
    ].join("\n"),
    html: `
<div style="background:#f5f2ec;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;color:#1a1a1a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d8">
    <tr>
      <td style="background:#1a1a1a;padding:20px 28px;color:#f5f2ec;font-size:13px;letter-spacing:3px">
        ${escapeHtml(brand.wordmark)}
      </td>
    </tr>
    <tr>
      <td style="padding:28px">
        <h1 style="margin:0 0 8px;font-size:22px;font-weight:600">New email came from your website</h1>
        <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.5">
          Someone just signed up through the newsletter form on ${escapeHtml(brand.name)}.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
          <tr>
            <td style="padding:10px 0;border-top:1px solid #eee;color:#777;width:110px">Email</td>
            <td style="padding:10px 0;border-top:1px solid #eee"><a href="mailto:${safeEmail}" style="color:#1a1a1a">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #eee;color:#777">Submitted</td>
            <td style="padding:10px 0;border-top:1px solid #eee">${escapeHtml(submittedAt)} (Toronto)</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;color:#777">Source</td>
            <td style="padding:10px 0;border-top:1px solid #eee;border-bottom:1px solid #eee">Newsletter sign-up form</td>
          </tr>
        </table>
        <p style="margin:24px 0 0;color:#777;font-size:13px">Hit reply to respond to them directly.</p>
      </td>
    </tr>
  </table>
</div>`,
  })

  if (error) {
    console.error("[newsletter] Resend error:", error)
    return { status: "error", message: "Something went wrong. Please try again later." }
  }

  return { status: "success" }
}
