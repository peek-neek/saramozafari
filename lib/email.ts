/** Helpers and the branded template shared by the notification emails. */

import { EMAIL_ICONS, type EmailIconName } from "@/lib/email-icons"
import { brand } from "@/lib/site-data"

/**
 * Practical email check: a local part, an @, one or more domain labels (no
 * leading/trailing hyphen, no empty labels) and a letters-only TLD of 2+.
 */
export const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

export const torontoTimestamp = () =>
  new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  })

/* -------------------------------------------------------------------------- */
/* Branded template                                                            */
/* -------------------------------------------------------------------------- */

// The site's palette (app/globals.css). Email clients ignore CSS variables,
// so the values are inlined.
const C = {
  ink: "#0a0a0a",
  inkSoft: "#171717",
  paper: "#fafafa",
  sand: "#f2efe9",
  sandDeep: "#e8e5df",
  rule: "#d4d4d4",
  muted: "#737373",
  body: "#525252",
  faint: "#a3a3a3",
} as const

// Dark-mode palette, borrowed from the site's ink sections (CTA, footer).
// Applied by the <style> block for clients that honour prefers-color-scheme.
const D = {
  page: "#0a0a0a",
  card: "#171717",
  header: "#0a0a0a",
  edge: "#262626",
  text: "#fafafa",
  body: "#a3a3a3",
  muted: "#a3a3a3",
  faint: "#737373",
  rule: "#333333",
  msgBg: "#262626",
  msgText: "#e5e5e5",
} as const

// Geist where the client loads web fonts (Apple Mail, iOS), close system
// fallbacks everywhere else (Gmail, Outlook).
const FONT = "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif"

export type EmailDetail = {
  label: string
  /** Plain text; escaped for you. Empty → shown as "Not provided". */
  value: string
  href?: string
}

export type EmailAction = {
  label: string
  href: string
  /** Solid ink button; otherwise an outlined one. */
  primary?: boolean
  /** Icon before the label; without one the button shows the site's ↗ arrow. */
  icon?: EmailIconName
}

/** Inline image parts for Resend; the HTML points at them with `cid:`. */
export type EmailAttachment = { filename: string; content: string; contentType: string; contentId: string }

// "light" = paper-coloured glyph, "dark" = ink-coloured glyph.
const iconId = (icon: EmailIconName, tone: "light" | "dark") => `icon-${icon}-${tone}` as const

export type BrandedEmail = {
  /** Inbox preview line shown after the subject. */
  preheader: string
  /** Small bracketed label above the heading, e.g. "Contact Form". */
  eyebrow: string
  heading: string
  intro: string
  details: EmailDetail[]
  /** Optional free-text block (the visitor's message), escaped for you. */
  message?: { label: string; body: string }
  actions?: EmailAction[]
  /** Small grey line under the actions. */
  note?: string
}

const detailRow = ({ label, value, href }: EmailDetail, last: boolean) => {
  const shown = value
    ? href
      ? `<a href="${escapeHtml(href)}" class="t" style="color:${C.ink};text-decoration:none;font-weight:500">${escapeHtml(value)}</a>`
      : `<span class="t" style="color:${C.ink};font-weight:500">${escapeHtml(value)}</span>`
    : `<span class="tf" style="color:${C.faint}">Not provided</span>`
  const border = `border-top:1px solid ${C.rule};${last ? `border-bottom:1px solid ${C.rule};` : ""}`
  return `
              <tr>
                <td class="rule tm" style="${border}padding:14px 0;font-size:14px;color:${C.muted};white-space:nowrap;vertical-align:top">[ ${escapeHtml(label)} ]</td>
                <td align="right" class="rule" style="${border}padding:14px 0 14px 16px;font-size:15px;word-break:break-word">${shown}</td>
              </tr>`
}

const ICON_STYLE = "width:16px;height:16px;border:0;vertical-align:-3px;margin-right:8px"

/**
 * Images don't recolour in dark mode, so each icon ships in both tones: the
 * "day" one shows by default, the "night" one is hidden until the dark-mode
 * styles swap them — always matching the button's text colour.
 */
const buttonIcon = (icon: EmailIconName, primary?: boolean) => {
  const day = iconId(icon, primary ? "light" : "dark")
  const night = iconId(icon, primary ? "dark" : "light")
  return (
    `<img src="cid:${day}" width="16" height="16" alt="" class="ico-day" style="display:inline-block;${ICON_STYLE}">` +
    `<!--[if !mso]><!--><img src="cid:${night}" width="16" height="16" alt="" class="ico-night" style="display:none;${ICON_STYLE}"><!--<![endif]-->`
  )
}

// Inline-blocks (not table cells) so the buttons wrap onto new lines on phones.
const actionButton = ({ label, href, primary, icon }: EmailAction) =>
  `<a href="${escapeHtml(href)}" class="${primary ? "btn-p" : "btn-o"}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;font-family:${FONT};font-size:14px;font-weight:500;line-height:16px;white-space:nowrap;text-decoration:none;${
    primary
      ? `background:${C.ink};color:${C.paper};border:1px solid ${C.ink}`
      : `background:transparent;color:${C.ink};border:1px solid ${C.ink}`
  }">${
    icon ? `${buttonIcon(icon, primary)}${escapeHtml(label)}` : `${escapeHtml(label)}&nbsp;&nbsp;&#8599;`
  }</a>`

/**
 * Dark mode. Rules are repeated under Outlook.com's [data-ogsc]/[data-ogsb]
 * hooks, which it uses in place of the media query.
 */
const darkRules = (prefix: { text: string; bg: string }) => `
      ${prefix.bg}.bg { background: ${D.page} !important; }
      ${prefix.bg}.card { background: ${D.card} !important; border-color: ${D.edge} !important; }
      ${prefix.bg}.hdr { background: ${D.header} !important; }
      ${prefix.text}.t, ${prefix.text}.t a { color: ${D.text} !important; }
      ${prefix.text}.tb { color: ${D.body} !important; }
      ${prefix.text}.tm { color: ${D.muted} !important; }
      ${prefix.text}.tf, ${prefix.text}.tf a { color: ${D.faint} !important; }
      ${prefix.text}.rule { border-color: ${D.rule} !important; }
      ${prefix.bg}.msg { background: ${D.msgBg} !important; color: ${D.msgText} !important; }
      ${prefix.bg}.divider { background: ${D.edge} !important; }
      ${prefix.bg}.btn-p { background: ${C.paper} !important; color: ${C.ink} !important; border-color: ${C.paper} !important; }
      ${prefix.text}.btn-o { color: ${C.paper} !important; border-color: ${C.paper} !important; }
      ${prefix.text}.ico-day { display: none !important; }
      ${prefix.text}.ico-night { display: inline-block !important; }`

/**
 * Renders the site-styled notification email as HTML plus a plain-text twin.
 * Pass `attachments` straight to Resend so the button icons show.
 */
export function renderBrandedEmail(email: BrandedEmail): {
  html: string
  text: string
  attachments: EmailAttachment[]
} {
  const sentAt = torontoTimestamp()

  const message = email.message
    ? `
          <tr>
            <td class="px" style="padding:28px 40px 0">
              <p class="tm" style="margin:0 0 10px;font-size:14px;color:${C.muted}">[ ${escapeHtml(email.message.label)} ]</p>
              <div class="msg" style="background:${C.sand};padding:20px 22px;font-size:16px;line-height:1.6;color:${C.inkSoft}">${escapeHtml(
                email.message.body
              ).replace(/\n/g, "<br>")}</div>
            </td>
          </tr>`
    : ""

  const actions = email.actions?.length
    ? `
          <tr>
            <td class="px" style="padding:32px 40px 0">${email.actions.map(actionButton).join("")}</td>
          </tr>`
    : ""

  const note = email.note
    ? `
          <tr>
            <td class="px tm" style="padding:${email.actions?.length ? "6px" : "28px"} 40px 0;font-size:13px;line-height:1.5;color:${C.muted}">${escapeHtml(email.note)}</td>
          </tr>`
    : ""

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- We ship our own dark design, so clients shouldn't auto-invert it. -->
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeHtml(email.heading)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    @media (prefers-color-scheme: dark) {${darkRules({ text: "", bg: "" })}
    }${darkRules({ text: "[data-ogsc] ", bg: "[data-ogsb] " })}
    @media (max-width: 600px) {
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 26px !important; }
    }
  </style>
</head>
<body class="bg" style="margin:0;padding:0;background:${C.sand};-webkit-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(email.preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background:${C.sand}">
    <tr>
      <td align="center" style="padding:40px 16px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="max-width:600px;background:${C.paper};border:1px solid ${C.paper};font-family:${FONT};color:${C.ink}">

          <!-- Header -->
          <tr>
            <td class="px hdr" style="background:${C.ink};padding:24px 40px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td style="font-size:13px;font-weight:500;letter-spacing:4px;color:${C.paper}">${escapeHtml(brand.wordmark)}</td>
                <td align="right" style="font-size:12px;color:${C.faint}">[ ${escapeHtml(email.eyebrow)} ]</td>
              </tr></table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td class="px" style="padding:44px 40px 0">
              <h1 class="h1 t" style="margin:0;font-size:32px;line-height:1.1;font-weight:500;letter-spacing:-0.8px;color:${C.ink}">${escapeHtml(email.heading)}</h1>
              <p class="tb" style="margin:14px 0 0;font-size:16px;line-height:1.6;color:${C.body}">${escapeHtml(email.intro)}</p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td class="px" style="padding:32px 40px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${email.details
                .map((d, i) => detailRow(d, i === email.details.length - 1))
                .join("")}
              </table>
            </td>
          </tr>
${message}${actions}${note}

          <!-- Footer -->
          <tr>
            <td class="px" style="padding:44px 40px 0">
              <div class="divider" style="height:1px;line-height:1px;font-size:0;background:${C.sandDeep}">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="px tf" style="padding:20px 40px 32px;font-size:12px;line-height:1.6;color:${C.faint}">
              Sent from the ${escapeHtml(brand.name)} website &middot; ${escapeHtml(sentAt)} (Toronto)<br>
              <a href="${escapeHtml(brand.phoneHref)}" class="tm" style="color:${C.muted};text-decoration:none">${escapeHtml(brand.phone)}</a>
              &nbsp;&middot;&nbsp;
              <a href="${escapeHtml(brand.instagram)}" class="tm" style="color:${C.muted};text-decoration:none">${escapeHtml(brand.instagramHandle)}</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = [
    email.heading,
    "",
    email.intro,
    "",
    ...email.details.map((d) => `${d.label}: ${d.value || "Not provided"}`),
    ...(email.message ? ["", `${email.message.label}:`, email.message.body] : []),
    ...(email.actions?.length
      ? ["", ...email.actions.map((a) => `${a.label}: ${a.href.replace(/^mailto:|^tel:|^sms:/, "").replace(/\?.*$/, "")}`)]
      : []),
    ...(email.note ? ["", email.note] : []),
    "",
    "—",
    `Sent from the ${brand.name} website · ${sentAt} (Toronto)`,
  ].join("\n")

  // Both tones of every icon used, so the dark-mode swap has its image.
  const attachments = [
    ...new Set(
      (email.actions ?? [])
        .filter((a) => a.icon)
        .flatMap((a) => [iconId(a.icon!, "light"), iconId(a.icon!, "dark")])
    ),
  ].map((id) => ({
    filename: `${id}.png`,
    content: EMAIL_ICONS[id.replace(/^icon-/, "") as keyof typeof EMAIL_ICONS],
    contentType: "image/png",
    contentId: id,
  }))

  return { html, text, attachments }
}
