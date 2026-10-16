/**
 * `sizes` strings shared by the sections and the idle-time prefetcher, so the
 * prefetched srcset entries are byte-for-byte the URLs the page will request.
 */
export const SIZES = {
  // The 3:2 hero stage covers the viewport: full width on landscape screens,
  // 1.5× the height (wider than the screen) on portrait ones.
  hero: "(max-aspect-ratio: 3/2) 150vh, 100vw",
  heroCard: "320px",
  menu: "(min-width: 768px) 33vw, 100vw",
  about: "(min-width: 1024px) 30vw, 100vw",
  property: "(min-width: 768px) 50vw, 100vw",
  // Listing page: full-width banner inside the 90rem container, then a 2-up gallery.
  listingHero: "(min-width: 1440px) 1360px, 100vw",
  listingGallery: "(min-width: 768px) 55vw, 100vw",
  process: "(min-width: 768px) 33vw, 100vw",
  service: "(min-width: 1024px) 36vw, 100vw",
  reelCenter: "100vw",
  meetSara:"(min-width: 768px) 45vw, 100vw",
  avatar: "48px",
  blog: "(min-width: 768px) 33vw, 90vw",
  // Article pages: images inside the 45rem (max-w-180) reading column.
  blogBody: "(min-width: 768px) 720px, 100vw",
  trail: "208px",
  footer: "100vw",
} as const

/** Default quality for content photos. */
export const QUALITY = 75
/** The LCP hero gets a little extra. */
export const HERO_QUALITY = 80
/** Decorative / small images (menu card, cursor trail, footer wordmark). */
export const LOW_QUALITY = 70
