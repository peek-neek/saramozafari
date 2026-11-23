/**
 * Contact-form rules shared by the browser (instant feedback) and the server
 * action (the real gate), so both always agree.
 */

import { EMAIL_RE } from "@/lib/email"

export type ContactField = "name" | "phone" | "email" | "message"
export type ContactValues = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

/** Fields a visitor may leave blank. */
export const OPTIONAL_FIELDS: readonly ContactField[] = ["email"]

export const CONTACT_LIMITS = {
  name: 80,
  phone: 15,
  email: 254,
  message: 1000,
} as const satisfies Record<ContactField, number>

const MESSAGE_MIN = 10

/** Keep digits only — the phone field accepts numbers and nothing else. */
export const digitsOnly = (value: string) => value.replace(/\D/g, "")

/**
 * North American numbers: 10 digits, or 11 with a leading 1, where the area
 * code and exchange can't start with 0 or 1. International: 12–15 digits
 * including the country code.
 */
export function isValidPhone(value: string) {
  const d = digitsOnly(value)
  if (/^1?[2-9]\d{2}[2-9]\d{6}$/.test(d)) return true
  return d.length >= 12 && d.length <= 15 && !d.startsWith("0")
}

export function validateContactField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case "name":
      if (!value) return "Please enter your full name."
      if (value.length < 2) return "Please enter your full name."
      if (value.length > CONTACT_LIMITS.name)
        return `Please keep your name under ${CONTACT_LIMITS.name} characters.`
      if (!/\p{L}/u.test(value)) return "Please enter your full name."
      return
    case "phone":
      if (!value) return "Please enter your mobile number."
      if (/\D/.test(value)) return "Please use numbers only."
      if (!isValidPhone(value)) return "Please enter a valid mobile number, e.g. 4165551234."
      return
    case "email":
      if (!value) return // optional
      if (value.length > CONTACT_LIMITS.email || !EMAIL_RE.test(value))
        return "Please enter a valid email address, e.g. name@example.com."
      return
    case "message":
      if (!value) return "Please write a short message."
      if (value.length < MESSAGE_MIN) return "Please write a little more so Sara can help."
      if (value.length > CONTACT_LIMITS.message)
        return `Please keep your message under ${CONTACT_LIMITS.message.toLocaleString("en-CA")} characters.`
      return
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of Object.keys(values) as ContactField[]) {
    const error = validateContactField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}
