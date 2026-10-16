import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

import { brand, images, navLinks } from "@/lib/site-data"
import { LOW_QUALITY, SIZES } from "@/lib/image-sizes"

import { NewsletterForm } from "./NewsletterForm"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-sm text-neutral-500">{title}</p>
      <ul className="space-y-2 text-paper">{children}</ul>
    </div>
  )
}

const linkClass = "transition-colors hover:text-neutral-400"

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-site pt-20 pb-8 md:pt-28">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-medium tracking-tight">
              Stay in the loop
            </h2>
            <p className="mt-3 text-neutral-400">
              New listings, market updates and home tips for the GTA — once a month, never spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <Column title="Contact">
            <li>
              <a href={brand.phoneHref} className={linkClass}>
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className={linkClass}>
                {brand.email}
              </a>
            </li>
          </Column>
          <Column title="Service Area">
            <li>Greater Toronto Area</li>
            <li className="text-neutral-400">Toronto · York · Peel · Halton · Durham</li>
          </Column>
          <Column title="Follow">
            <li>
              <a href={brand.instagram} target="_blank" rel="noreferrer" className={linkClass}>
                Instagram {brand.instagramHandle}
              </a>
            </li>
          </Column>
          <Column title="Explore">
            {navLinks.slice(1, 6).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>
        </div>

        {/* Giant wordmark with the skyline photo showing through the letters:
            white text on an ink layer, multiplied over the photo. */}
        <div aria-hidden className="relative overflow-hidden select-none">
          <Image
            src={images.footer}
            alt=""
            fill
            sizes={SIZES.footer}
            quality={LOW_QUALITY}
            className="object-cover object-[50%_40%]"
          />
          <p className="relative bg-ink text-center text-[clamp(3rem,11.5vw,11rem)] leading-[0.85] font-bold tracking-[-0.05em] whitespace-nowrap text-paper mix-blend-multiply">
            {brand.wordmark}
          </p>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. {brand.agent}, {brand.role}.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className={linkClass}>
              Privacy Policy
            </a>
            <a href="#" className={linkClass}>
              Terms
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="grid size-11 place-items-center bg-paper text-ink transition-transform duration-500 hover:-translate-y-1"
            >
              <ArrowUp className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
