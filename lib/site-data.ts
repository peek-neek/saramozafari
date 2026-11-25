import type { StaticImageData } from "next/image"

import heroSky from "@/assets/images/hero-sky.jpg"
import heroSkyline from "@/assets/images/hero-skyline.webp"
import sara from "@/assets/images/sara.jpg"
import about1 from "@/assets/images/about-1.jpg"
import about2 from "@/assets/images/about-2.jpg"
import about3 from "@/assets/images/about-3.jpg"
import about4 from "@/assets/images/about-4.jpg"
import about5 from "@/assets/images/about-5.jpg"
import property1 from "@/assets/images/property-1.jpg"
import property2 from "@/assets/images/property-2.jpg"
import property3 from "@/assets/images/property-3.jpg"
import property5 from "@/assets/images/property-5.jpg"
import property7 from "@/assets/images/property-7.jpg"
import property8 from "@/assets/images/property-8.jpg"
import flintridgeKitchen from "@/assets/images/flintridge-53-kitchen.jpg"
import flintridgeLiving from "@/assets/images/flintridge-53-living.jpg"
import stillwaterExterior from "@/assets/images/stillwater-54-exterior.jpg"
import stillwaterLiving from "@/assets/images/stillwater-54-living.jpg"
import stillwaterDining from "@/assets/images/stillwater-54-dining.jpg"
import stillwaterBedroom from "@/assets/images/stillwater-54-bedroom.jpg"
import stillwaterBathroom from "@/assets/images/stillwater-54-bathroom.jpg"
import bayviewLiving from "@/assets/images/bayview-8501-living.jpg"
import bayviewKitchen from "@/assets/images/bayview-8501-kitchen.jpg"
import bayviewDining from "@/assets/images/bayview-8501-dining.jpg"
import bayviewBathroom from "@/assets/images/bayview-8501-bathroom.jpg"
import bayviewEntrance from "@/assets/images/bayview-8501-entrance.jpg"
import process1 from "@/assets/images/process-1.jpg"
import process2 from "@/assets/images/process-2.jpg"
import process3 from "@/assets/images/process-3.jpg"
import process4 from "@/assets/images/process-4.jpg"
import process5 from "@/assets/images/process-5.jpg"
import service1 from "@/assets/images/service-1.jpg"
import service2 from "@/assets/images/service-2.jpg"
import service3 from "@/assets/images/service-3.jpg"
import service4 from "@/assets/images/service-4.jpg"
import service5 from "@/assets/images/service-5.jpg"
import reel1 from "@/assets/images/reel-1.jpg"
import reel4 from "@/assets/images/reel-4.jpg"
import reel5 from "@/assets/images/reel-5.jpg"
import reel6 from "@/assets/images/reel-6.jpg"
import reel7 from "@/assets/images/reel-7.jpg"
import story1 from "@/assets/images/story-1.jpg"
import story2 from "@/assets/images/story-2.jpg"
import story3 from "@/assets/images/story-3.jpg"
import story4 from "@/assets/images/story-4.jpg"
import story5 from "@/assets/images/story-5.jpg"
import story6 from "@/assets/images/story-6.jpg"
import story7 from "@/assets/images/story-7.jpg"
import story8 from "@/assets/images/story-8.jpg"
import avatar1 from "@/assets/images/avatar-1.jpg"
import avatar2 from "@/assets/images/avatar-2.jpg"
import avatar3 from "@/assets/images/avatar-3.jpg"
import avatar4 from "@/assets/images/avatar-4.jpg"
import avatar5 from "@/assets/images/avatar-5.jpg"
import avatar6 from "@/assets/images/avatar-6.jpg"
import avatar7 from "@/assets/images/avatar-7.jpg"
import avatar8 from "@/assets/images/avatar-8.jpg"
import blog1 from "@/assets/images/blog-1.jpg"
import blog2 from "@/assets/images/blog-2.jpg"
import blog3 from "@/assets/images/blog-3.jpg"
import blog4 from "@/assets/images/blog-4.jpg"

/* -------------------------------------------------------------------------- */
/* Brand — real details from instagram.com/saramoz.homes                       */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Saramoz Homes",
  wordmark: "SARAMOZ HOMES",
  agent: "Sara Mozafari",
  role: "Real Estate Agent",
  region: "Greater Toronto Area, Ontario",
  phone: "416-844-1380",
  phoneHref: "tel:+14168441380",
  // Opens the visitor's own Messages app with Sara's number and a starter
  // message filled in. "?&body=" is read correctly by both iOS and Android.
  smsHref: `sms:+14168441380?&body=${encodeURIComponent(
    "Hi Sara, I'd like to book a consultation."
  )}`,
  // Placeholder — replace with Sara's real address.
  email: "saramozhomes@gmail.com",
  instagram: "https://www.instagram.com/saramoz.homes/",
  instagramHandle: "@saramoz.homes",
  tagline: "Patient guidance. Precise results. Relationships built on trust.",
}

export const images = {
  // Depth hero: full photo + transparent skyline/foreground cut-out of the same frame.
  heroSky,
  heroSkyline,
  sara,
  footer: heroSky,
}

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Meet Sara", href: "/#meet-sara" },
  { label: "About", href: "/#about" },
  { label: "Listings", href: "/#listings" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "#contact" },
]

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About Sara Mozafari",
  lines: [
    "Guiding GTA buyers",
    "& sellers home with",
    "patience and precision",
  ],
  paragraphs: [
    "Buying or selling a home is one of the biggest decisions you will make. Sara slows the process down where it matters, explains every option in plain language, and makes sure you never feel rushed into a choice.",
    "From a first condo downtown to a family home in the suburbs, every client gets the same thing: honest advice, sharp negotiation, and someone who picks up the phone.",
  ],
  images: [about1, about2, about3, about4, about5],
  // Placeholder figures — swap for Sara's real numbers.
  stats: [
    {
      label: "Homes Guided",
      value: 120,
      suffix: "+",
      body: "Condos, townhomes and detached houses across the Greater Toronto Area.",
    },
    {
      label: "Client Satisfaction",
      value: 98,
      suffix: "%",
      body: "Most new clients come from referrals by past buyers and sellers.",
    },
    {
      label: "Neighbourhoods Covered",
      value: 25,
      suffix: "+",
      body: "Local insight from Toronto core to York, Peel and Halton regions.",
    },
  ],
  areas: [
    "Toronto",
    "North York",
    "Vaughan",
    "Richmond Hill",
    "Markham",
    "Mississauga",
    "Oakville",
    "Etobicoke",
    "Brampton",
    "Scarborough",
  ],
}

/* -------------------------------------------------------------------------- */
/* Listings — recent sales & leases first, then dummy placeholders             */
/* -------------------------------------------------------------------------- */

/**
 * One entry per listing. `slug` is the URL (/listings/<slug>) — every entry
 * here gets a detail page, so adding or removing a listing is just editing
 * this array. `nearby` and `gallery` are optional.
 */
export type Property = {
  slug: string
  title: string
  area: string
  /** Asking price, or the final sale price / monthly rent once `closed` is set. */
  price: string
  /** Set once the home has sold or leased: the card and page switch to a closed layout. */
  closed?: {
    status: "sold" | "leased"
    /** Leases only, e.g. "1-year lease". */
    term?: string
    listPrice: string
    percentOfList: number
    daysOnMarket: number
    /** Whose side Sara was on: she listed it ("seller", incl. landlords) or brought the buyer/tenant ("buyer"). */
    side: "seller" | "buyer"
  }
  beds: number | string
  baths: number
  image: StaticImageData
  type: string
  /** Optional facts; the listing page shows the first two that are set. */
  sqft?: string
  lot?: string
  parking?: string
  rooms?: string
  summary: string
  overview: string[]
  features: string[]
  nearby?: { place: string; time: string }[]
  gallery?: StaticImageData[]
}

export const properties: Property[] = [
  {
    slug: "53-flintridge-road",
    title: "53 Flintridge Road",
    area: "Scarborough",
    price: "$2,850",
    closed: {
      status: "leased",
      listPrice: "$2,850",
      percentOfList: 100,
      daysOnMarket: 10,
      side: "seller",
      term: "1-year lease",
    },
    beds: 3,
    baths: 1,
    image: flintridgeKitchen,
    type: "Detached Backsplit",
    sqft: "1,100–1,500 sq ft",
    parking: "2 spaces",
    rooms: "6",
    summary:
      "A renovated three-bedroom backsplit in Dorset Park, leased at asking in 10 days.",
    overview: [
      "The main floor of this backsplit was opened up and redone: hardwood floors, pot lights and crown moulding run through a living and dining space anchored by a dark panelled feature wall. The kitchen pairs sage-green lower cabinets with white uppers, gold hardware, quartz counters, a farmhouse sink and an island with pendant lights.",
      "Sara listed the home for the landlord at $2,850 a month and found a tenant on a one-year lease within 10 days, at the full asking rent.",
    ],
    features: [
      "Leased at asking in 10 days",
      "Renovated kitchen with island and farmhouse sink",
      "Open living and dining with feature wall",
      "Hardwood floors and pot lights",
      "Three bedrooms, one bathroom",
      "Two parking spaces",
    ],
    gallery: [flintridgeLiving],
  },
  {
    slug: "54-stillwater-crescent",
    title: "54 Stillwater Crescent",
    area: "North York",
    price: "$1,250,000",
    closed: {
      status: "sold",
      listPrice: "$1,250,000",
      percentOfList: 100,
      daysOnMarket: 6,
      side: "buyer",
    },
    beds: 3,
    baths: 4,
    image: stillwaterExterior,
    type: "Semi-Detached",
    parking: "4 spaces",
    rooms: "6 + 2",
    summary:
      "A two-storey brick semi in Westminster-Branson, where Sara represented the buyers.",
    overview: [
      "A two-storey brick semi-detached home on a quiet crescent in Westminster-Branson, with a built-in double garage and room for four cars in total. The main floor has a formal living room with a fireplace between two tall windows, and a separate dining room that opens through French doors toward the kitchen.",
      "Upstairs are three bedrooms, and the home has four bathrooms in all, including one with a double vanity and granite counter. Sara represented the buyers and helped them secure the home six days after it was listed.",
    ],
    features: [
      "Sara represented the buyers",
      "Two-storey brick semi-detached",
      "Built-in double garage, four parking spaces",
      "Living room with fireplace",
      "Separate dining room with French doors",
      "Three bedrooms, four bathrooms",
    ],
    gallery: [
      stillwaterBedroom,
      stillwaterLiving,
      stillwaterDining,
      stillwaterBathroom,
    ],
  },
  {
    slug: "8501-bayview-avenue",
    title: "8501 Bayview Avenue",
    area: "Richmond Hill",
    price: "$725,000",
    closed: {
      status: "sold",
      listPrice: "$699,800",
      percentOfList: 104,
      daysOnMarket: 27,
      side: "seller",
    },
    beds: "2 + 1",
    baths: 2,
    image: bayviewLiving,
    type: "Condo Apartment",
    sqft: "1,200–1,399 sq ft",
    parking: "1 space",
    summary:
      "A fully renovated two-bedroom-plus-den suite in Doncrest, sold above asking.",
    overview: [
      "This suite was renovated from end to end before it came to market: wide-plank flooring throughout, pot lights in the living room, and a long, bright layout that runs from the dining area to a sun-filled den by the windows.",
      "The kitchen has grey shaker cabinetry, quartz counters, under-cabinet lighting and stainless appliances, and the bathroom was redone with a glass-enclosed shower, hexagon tile and matte-black fixtures. Sara priced it at $699,800 and it sold for $725,000, 104% of the asking price.",
    ],
    features: [
      "Sold for 104% of the asking price",
      "Two bedrooms plus a den",
      "Renovated kitchen with quartz counters",
      "Glass-enclosed shower with hexagon tile",
      "Wide-plank flooring throughout",
      "One parking space included",
    ],
    gallery: [bayviewKitchen, bayviewDining, bayviewEntrance, bayviewBathroom],
  },
  {
    slug: "lawrence-park-residence",
    title: "The Lawrence Park Residence",
    area: "Toronto",
    price: "$2,890,000",
    beds: 5,
    baths: 4,
    image: property1,
    type: "Detached",
    sqft: "4,350 sq ft",
    lot: "50 × 135 ft",
    summary:
      "A stone-and-brick family home on one of Lawrence Park's quiet, tree-lined crescents.",
    overview: [
      "Built with a classic stone facade and a double garage, this home pairs generous principal rooms with a layout that actually works for a busy family: a main-floor office, a mudroom off the garage and a kitchen that opens straight onto the family room.",
      "Upstairs, five bedrooms include a primary suite with a walk-in closet and a five-piece ensuite. The finished lower level adds a recreation room, a gym corner and a sixth sleeping space for guests.",
    ],
    features: [
      "Double attached garage with mudroom entry",
      "Chef's kitchen with oversized island",
      "Main-floor home office",
      "Primary suite with five-piece ensuite",
      "Finished lower level with walk-out",
      "Mature private backyard",
    ],
    nearby: [
      { place: "Lawrence subway station", time: "6 min" },
      { place: "Yonge & Lawrence shops", time: "5 min" },
      { place: "Sunnybrook Park", time: "8 min" },
      { place: "Highway 401", time: "10 min" },
    ],
    gallery: [reel4, reel5, reel6, reel7],
  },
  {
    slug: "bayview-ridge-estate",
    title: "Bayview Ridge Estate",
    area: "Richmond Hill",
    price: "$2,150,000",
    beds: 4,
    baths: 4,
    image: property2,
    type: "Detached",
    sqft: "3,600 sq ft",
    lot: "60 × 150 ft",
    summary:
      "A bright farmhouse-style home with a full-width porch on a wide Richmond Hill lot.",
    overview: [
      "Board-and-batten siding, a deep front porch and big windows give this home its relaxed, countryside feel, while the inside is fully updated: wide-plank floors, a white kitchen with a walk-in pantry and an open family room with a gas fireplace.",
      "Four large bedrooms sit upstairs, each with direct bathroom access. The 150-foot lot leaves room for a pool, a garden or simply a lot of lawn.",
    ],
    features: [
      "Full-width covered front porch",
      "Kitchen with walk-in pantry",
      "Gas fireplace in the family room",
      "Every bedroom with bathroom access",
      "Main-floor laundry",
      "Deep 150 ft lot",
    ],
    nearby: [
      { place: "Bayview Secondary School", time: "5 min" },
      { place: "Hillcrest Mall", time: "8 min" },
      { place: "Richmond Hill GO", time: "10 min" },
      { place: "Highway 404", time: "9 min" },
    ],
    gallery: [blog4, reel5, service3, reel7],
  },
]

/** "Sold" or "Leased": how a closed listing ended. */
export const closedLabel = (p: Property) =>
  p.closed?.status === "leased" ? "Leased" : "Sold"

/** One-line result for a closed listing, e.g. "Sold at 104% of asking in 27 days". */
export const closedNote = (p: Property) => {
  if (!p.closed) return ""
  const { percentOfList, daysOnMarket, side, term } = p.closed
  const verb = closedLabel(p)
  if (side === "buyer")
    return `Represented the ${p.closed.status === "leased" ? "tenant" : "buyer"} · ${verb.toLowerCase()} in ${daysOnMarket} days`
  const atPrice =
    percentOfList === 100 ? "at asking" : `at ${percentOfList}% of asking`
  return [`${verb} ${atPrice} in ${daysOnMarket} days`, term]
    .filter(Boolean)
    .join(" · ")
}

export const getProperty = (slug: string) =>
  properties.find((p) => p.slug === slug)

export const listingHref = (p: Property) => `/listings/${p.slug}`
/** Element id of a listing's card in the homepage Listings section. */
export const listingAnchor = (p: Property) => `listing-${p.slug}`

/* -------------------------------------------------------------------------- */
/* Process                                                                      */
/* -------------------------------------------------------------------------- */

export const processSteps = [
  {
    title: "Listen",
    summary:
      "We start with a conversation, not a sales pitch. Your goals, budget, timing and the kind of life you want the next home to support.",
    image: process1,
    points: [
      "Free one-on-one consultation",
      "Budget and mortgage pre-approval check",
      "Must-haves vs. nice-to-haves",
      "Commute, school and lifestyle priorities",
      "A realistic timeline",
    ],
  },
  {
    title: "Search",
    summary:
      "A short, focused list of homes that actually fit and for sellers, a launch plan built around what buyers in your area respond to.",
    image: process2,
    points: [
      "Hand-picked MLS® and exclusive listings",
      "Neighbourhood and comparable sales reports",
      "Private showings on your schedule",
      "Staging and photography for sellers",
      "Honest feedback on every home",
    ],
  },
  {
    title: "Negotiate",
    summary:
      "Clear numbers and a calm strategy, whether you are competing in a bidding war or weighing multiple offers on your own home.",
    image: process3,
    points: [
      "Offer strategy and pricing guidance",
      "Conditions explained clearly",
      "Bidding-war preparation",
      "Inspection coordination",
      "Firm, respectful negotiation",
    ],
  },
  {
    title: "Close",
    summary:
      "Paperwork, lawyers, lenders and deadlines handled in the background, with a plain-language update at every step.",
    image: process4,
    points: [
      "Lawyer and lender coordination",
      "Document and deadline tracking",
      "Final walkthrough",
      "Closing-day support",
      "No surprise costs",
    ],
  },
  {
    title: "Settle In",
    summary:
      "The keys are just the start. Sara stays on call for trusted trades, market check-ins and whatever comes next.",
    image: process5,
    points: [
      "Moving-day checklist",
      "Trusted contractor referrals",
      "Utility and address-change reminders",
      "Annual home value updates",
      "A relationship for life",
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* Services                                                                     */
/* -------------------------------------------------------------------------- */

export const services = [
  {
    name: "Service for Buyers",
    cta: "Start Buying",
    body: "From a first consultation to closing day: a realistic budget with every hidden cost uncovered, neighbourhood research, focused showings and firm negotiation for the best price and terms.",
    image: service1,
  },
  {
    name: "Service for Sellers",
    cta: "Plan Your Sale",
    body: "A price grounded in comparable sales, professional photos, video and virtual tours, and marketing that reaches agents and buyers across every channel - backed by open houses and steady negotiation.",
    image: service2,
  },
  {
    name: "Service for Landlords",
    cta: "List Your Rental",
    body: "Get your property rent-ready, show it at its best with quality photos and wide advertising, then place a reliable tenant after careful checks on documents, income and rental history.",
    image: service3,
  },
  {
    name: "Service for Tenants",
    cta: "Find a Rental",
    body: "One conversation to understand what you need, then Sara does the searching and viewing alongside you and negotiates on your behalf for the best rent and lease terms.",
    image: service4,
  },
]

/* -------------------------------------------------------------------------- */
/* Showreel                                                                     */
/* -------------------------------------------------------------------------- */

export const reel = {
  title: "Life in the GTA",
  subtitle: "with Sara Mozafari",
  // Left column, middle top / centre / bottom, right column. Strings are clips
  // in public/assets. The centre tile (index 2) fills the screen at the start
  // of the effect.
  tiles: [
    "/assets/908ea0746d014ff4900e6fd562d4044d.mp4",
    "/assets/c9206df8625a41a58c85bd7967c9aafa.mp4",
    reel1,
    "/assets/e459149bd73e403e89c1b1cbaf0da40d.mp4",
    "/assets/5fd690592cc24a6aa32bb51c9016879d.mp4",
  ] as (StaticImageData | string)[],
}

/* -------------------------------------------------------------------------- */
/* Meet Sara — she works solo; copy is placeholder until Sara supplies her own */
/* -------------------------------------------------------------------------- */

export const meetSara = {
  name: "Sara Mozafari",
  role: "Real Estate Agent",
  image: sara,
  quote:
    "I would rather take an extra week and get it right than rush you into the wrong home.",
  lead: "Sara works with every client herself, from the first call to the day you get the keys.",
  paragraphs: [
    "There is no hand-off to a junior agent or an assistant you have never met. When you call, Sara picks up. When an offer lands at 10pm, she is the one walking you through it.",
    "She keeps her client list small on purpose, so she can prepare properly for every showing, study every comparable sale, and negotiate as if it were her own home on the line.",
  ],
  highlights: [
    {
      title: "One point of contact",
      body: "Your file stays with Sara, start to finish.",
    },
    {
      title: "Across the GTA",
      body: "Toronto, York, Peel, Halton and Durham.",
    },
    {
      title: "Buyers & sellers",
      body: "Family homes, condos, commercial properties, and investment properties. ",
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* Testimonials — placeholders                                                  */
/* -------------------------------------------------------------------------- */

export const testimonials = [
  {
    name: "Leila A.",
    city: "North York",
    image: story1,
    avatar: avatar1,
    quote:
      "We had lost three bidding wars before we met Sara. She changed our whole approach, and we won the fourth house without overpaying.",
  },
  {
    name: "Mark T.",
    city: "Oakville",
    image: story2,
    avatar: avatar2,
    quote:
      "Selling our family home was emotional. Sara was patient with us, and the result was better than we hoped.",
  },
  {
    name: "Priya S.",
    city: "Markham",
    image: story3,
    avatar: avatar3,
    quote:
      "As first-time buyers we had a hundred questions. Sara answered every one, usually within the hour.",
  },
  {
    name: "Arman K.",
    city: "Vaughan",
    image: story4,
    avatar: avatar4,
    quote:
      "She spotted a foundation issue the listing photos hid. That alone saved us a fortune.",
  },
  {
    name: "Daniel R.",
    city: "Mississauga",
    image: story5,
    avatar: avatar5,
    quote:
      "Clear numbers, no pressure, and a closing that went exactly to plan. Highly recommend.",
  },
  {
    name: "James W.",
    city: "Toronto",
    image: story6,
    avatar: avatar6,
    quote:
      "I relocated from Calgary and bought sight-unseen on video calls. Sara made it feel easy.",
  },
  {
    name: "Amara O.",
    city: "Brampton",
    image: story7,
    avatar: avatar7,
    quote:
      "Our condo sold in six days, over asking. The staging advice made all the difference.",
  },
  {
    name: "Nadia F.",
    city: "Richmond Hill",
    image: story8,
    avatar: avatar8,
    quote:
      "Sara still checks in a year later. That tells you everything about how she works.",
  },
]

/* -------------------------------------------------------------------------- */
/* FAQ                                                                          */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "How do I know what I can afford in the GTA right now?",
    a: "Start with a mortgage pre-approval, then add closing costs such as land transfer tax, legal fees and moving. Sara can introduce you to trusted mortgage professionals and walk through a full budget before you start viewing homes.",
  },
  {
    q: "Do you work with first-time buyers?",
    a: "Absolutely - they are some of Sara's favourite clients. You will get a step-by-step plan, help understanding first-time buyer programs, and plenty of time for questions.",
  },
  {
    q: "What does it cost to sell my home with you?",
    a: "Commission is discussed openly at your first meeting, with no hidden fees. You will see exactly what is included - pricing analysis, staging advice, photography and marketing.",
  },
  {
    q: "Can you help with pre-construction purchases?",
    a: "Yes. Sara reviews builder track records, deposit schedules and agreement terms with you so you know what you are signing before you commit.",
  },
  {
    q: "Which areas do you cover?",
    a: "The whole Greater Toronto Area - Toronto, York, Peel, Halton and Durham regions. If you are moving from further away, Sara can run virtual tours and video consultations.",
  },
]

/* -------------------------------------------------------------------------- */
/* Insights — placeholder articles                                              */
/* -------------------------------------------------------------------------- */

/**
 * One entry per article. `slug` is the URL (/blogs/<slug>) — every entry gets
 * a page, so adding or removing a post is just editing this array. Sara is the
 * author of every post. A section's `image` sits below its paragraphs.
 */
export type Insight = {
  slug: string
  title: string
  date: string
  category: string
  summary: string
  image: StaticImageData
  sections: {
    heading: string
    paragraphs: string[]
    image?: { src: StaticImageData; alt: string }
  }[]
}

export const insights: Insight[] = [
  {
    slug: "first-time-buyers-roadmap-gta",
    title: "The First-Time Buyer's Roadmap to the GTA",
    date: "Sep 18, 2026",
    category: "Buy",
    summary:
      "From pre-approval to closing day: the order of operations that keeps first-time buyers calm, prepared and in control.",
    image: blog1,
    sections: [
      {
        heading: "Start with the number, not the listings",
        paragraphs: [
          "It is tempting to open the listing apps first. Resist it for a week. Sit down with a mortgage professional, get pre-approved, and work out the monthly payment you are actually comfortable with, which is often lower than the most a lender will offer.",
          "That number becomes your filter. Every home you look at after that is one you can genuinely buy, which makes the search faster and far less emotional.",
        ],
        image: {
          src: process3,
          alt: "Model house and piggy bank resting on floor plans",
        },
      },
      {
        heading: "Budget for the costs nobody puts in the listing",
        paragraphs: [
          "The price is only part of the cheque. Land transfer tax, legal fees, title insurance, a home inspection, moving costs and a cushion for the first repairs all land in the same few weeks.",
          "Buying in Toronto means paying both the provincial and the municipal land transfer tax, though first-time buyers may qualify for a rebate on each. Ask your lawyer to confirm the figures before you firm up an offer, not after.",
        ],
      },
      {
        heading: "Use the tools made for first-time buyers",
        paragraphs: [
          "A First Home Savings Account lets you save for a down payment with tax advantages on the way in and the way out, and the RRSP Home Buyers' Plan can be used alongside it. If you have either, check the withdrawal rules early, because both take paperwork.",
          "None of this is complicated, but all of it has timing. Building it into your plan from the start means no scramble in the week before closing.",
        ],
      },
      {
        heading: "Know your must-haves before the first showing",
        paragraphs: [
          "Write down three things your next home has to have and three you could live without. Commute time, a second bedroom, outdoor space, a school catchment: whatever matters to your life, not to the listing photos.",
          "When a beautiful kitchen tries to talk you out of your list, the list wins. It is the best defence against buying the wrong home for the right-looking reasons.",
        ],
      },
      {
        heading: "Make an offer with conditions you understand",
        paragraphs: [
          "In a calm market, an offer conditional on financing and a home inspection is standard and sensible. In a competitive one you may be asked to go firm. Either way, you should know exactly what each condition protects and what you give up by removing it.",
          "This is where a good agent earns their keep: explaining the trade-offs in plain language and helping you decide how much risk you are genuinely comfortable carrying.",
        ],
        image: { src: process2, alt: "House keys beside a small model home" },
      },
      {
        heading: "Closing day is a handover, not a finish line",
        paragraphs: [
          "Your lawyer handles the funds and the title transfer. You handle insurance, utilities and the change of address. Then the keys are yours.",
          "Sara stays in touch long after that, for trusted trades, a quick market check-in, or the next move when it comes.",
        ],
      },
    ],
  },
  {
    slug: "toronto-area-neighbourhoods-on-the-rise",
    title: "Five Toronto-Area Neighbourhoods on the Rise",
    date: "Aug 30, 2026",
    category: "Market",
    summary:
      "Transit, new investment and relative value are reshaping where GTA buyers look. Five areas worth a closer look this year.",
    image: blog2,
    sections: [
      {
        heading: 'What "on the rise" really means',
        paragraphs: [
          "A neighbourhood on the rise is not one where prices have already jumped. It is one where something lasting is changing, like a new transit line, a growing employer or fresh public investment, while homes are still priced below the areas around them.",
          "None of the places below is a sure thing, and none of this is investment advice. They are simply areas Sara is watching closely, for buyers who want room to grow into their neighbourhood.",
        ],
      },
      {
        heading: "1. Mount Dennis, Toronto",
        paragraphs: [
          "At the western end of the Eglinton Crosstown, Mount Dennis pairs older detached and semi-detached homes with a transit connection that changes how far downtown really is. Many streets still have the feel of a quiet residential pocket.",
        ],
      },
      {
        heading: "2. Weston, Toronto",
        paragraphs: [
          "Weston has a UP Express stop, which puts Union Station and Pearson airport within easy reach. Character homes near the Humber River sit alongside newer rental buildings, and the main street is slowly filling back in.",
        ],
      },
      {
        heading: "3. Downtown Brampton",
        paragraphs: [
          "A new medical school campus and ongoing downtown renewal are bringing students, staff and new businesses into the core. Detached homes on nearby streets still cost noticeably less than comparable ones closer to Toronto.",
        ],
        image: {
          src: about5,
          alt: "Modern two-storey home with a wood-panel facade",
        },
      },
      {
        heading: "4. Oshawa",
        paragraphs: [
          "Oshawa offers more house for the money than almost anywhere else in the GTA, along with GO train service and a university and college presence. For buyers whose work is partly remote, the trade-off is increasingly easy to make.",
        ],
      },
      {
        heading: "5. Richmond Hill around Yonge and Highway 7",
        paragraphs: [
          "The Yonge North Subway Extension is set to bring the subway into Richmond Hill, and the land around the future stations is already planned for growth. Condos and townhomes nearby are where early buyers are looking.",
        ],
        image: { src: service4, alt: "Glass condo towers against a blue sky" },
      },
      {
        heading: "How to use a list like this",
        paragraphs: [
          "Visit at different times of day, walk to the nearest transit stop, and look at what is planned for the empty lots, not just what is there today. The best neighbourhood for you is the one that fits your next ten years.",
          "If one of these areas is on your shortlist, Sara can pull recent sales and walk the streets with you before you decide.",
        ],
      },
    ],
  },
  {
    slug: "pricing-your-home-to-sell",
    title: "Pricing Your Home to Sell in a Shifting Market",
    date: "Aug 12, 2026",
    category: "Sell",
    summary:
      "When the market moves, the list price does more work than ever. How to set one that buyers respond to in the first two weeks.",
    image: blog3,
    sections: [
      {
        heading: "The first two weeks set the tone",
        paragraphs: [
          "A new listing gets the most attention it will ever get in its first days on the market. Active buyers and their agents see it immediately, and they decide quickly whether it is worth a visit.",
          "Price too high and that attention passes you by. By the time the price comes down, the listing is no longer new, and buyers start asking what is wrong with it.",
        ],
      },
      {
        heading: "Price from the sales, not the asking prices",
        paragraphs: [
          "What other sellers are asking tells you very little. What buyers actually paid tells you a lot. A good pricing analysis starts with recent sold prices for similar homes nearby, then adjusts for size, condition, lot and timing.",
        ],
        image: {
          src: service5,
          alt: "Modern home with every window lit at dusk",
        },
      },
      {
        heading: "Watch the direction, not just the level",
        paragraphs: [
          "In a shifting market, a sale from three months ago may already be out of date. Days on market, the number of price reductions and how many similar homes are listed right now all show which way things are moving.",
          "If inventory is climbing, buyers have choice, and your price needs to reflect it. If it is tight, you may have room to be more ambitious.",
        ],
      },
      {
        heading: "Pick a strategy and commit to it",
        paragraphs: [
          "Some homes are best priced right at market value for steady showings and clean offers. Others suit a slightly lower price with a set offer date, inviting competition. Both can work well. A price that sits awkwardly between the two rarely does.",
        ],
      },
      {
        heading: "Presentation is part of the price",
        paragraphs: [
          "Small repairs, a deep clean, fresh paint and good photography cost very little next to the price of the home, and buyers pay for homes that feel cared for. Most of this can be done in a couple of weeks.",
        ],
      },
      {
        heading: "Know when to adjust",
        paragraphs: [
          "If showings are steady but offers are not coming, listen to the feedback. A timely, modest adjustment almost always beats a large one made weeks later.",
          "Sara reviews every listing's activity with her sellers each week, so decisions are made on evidence, not on nerves.",
        ],
        image: {
          src: process1,
          alt: "Agent and client celebrating a deal at a desk",
        },
      },
    ],
  },
  {
    slug: "small-space-condo-staging",
    title: "Small-Space Staging: The Condo Edition",
    date: "Jul 27, 2026",
    category: "Staging",
    summary:
      "Simple, low-cost changes that make a condo feel bigger and brighter, and easier for buyers to picture themselves in.",
    image: blog4,
    sections: [
      {
        heading: "Edit before you decorate",
        paragraphs: [
          "The fastest way to make a condo feel bigger is to take things out of it. Aim to remove about a third of what is on display: extra chairs, side tables, books, kitchen gadgets, and everything on the fridge.",
          "Buyers open closets and cupboards too, so give those the same treatment. Half-empty storage tells buyers there is room for their things.",
        ],
      },
      {
        heading: "Give every area one job",
        paragraphs: [
          "In an open-plan space, buyers need help seeing where each room starts and ends. A rug can mark out the living area and a pendant light can anchor the dining table. A desk wedged into the bedroom just makes it look cramped.",
        ],
        image: {
          src: service3,
          alt: "Bright living room with a grey sofa and hanging plants",
        },
      },
      {
        heading: "Choose furniture that shows the floor",
        paragraphs: [
          "Pieces on slim legs, glass or acrylic tables and a sofa without a skirt all let the eye travel further across the floor, which reads as space. A few well-sized pieces look better than many small ones.",
        ],
      },
      {
        heading: "Make the most of the light",
        paragraphs: [
          "Open every blind, clean the windows and add a large mirror opposite the brightest wall. Replace mismatched bulbs with one warm white and turn every light on for showings and photos.",
        ],
      },
      {
        heading: "Treat the balcony as a room",
        paragraphs: [
          "A small table, two chairs and a plant turn a balcony from storage into extra living space. In a condo, that can be the feature buyers remember most.",
          "Remember that the listing photos are the first showing. Every staging decision should look good in a wide-angle photo as well as in person.",
        ],
        image: {
          src: story3,
          alt: "Staged living room with a leather sofa and a gallery wall",
        },
      },
      {
        heading: "Small spend, real return",
        paragraphs: [
          "Most condo staging comes down to a weekend of editing, a few new cushions and bulbs, and perhaps a rented piece or two. Sara can walk through your unit and give you a short, prioritised list, so you spend only where it shows.",
        ],
      },
    ],
  },
]

export const getInsight = (slug: string) =>
  insights.find((p) => p.slug === slug)

export const insightHref = (p: Insight) => `/blogs/${p.slug}`
/** Element id of an article's card in the homepage Insights section. */
export const insightAnchor = (p: Insight) => `insight-${p.slug}`

/** Whole minutes at a relaxed ~220 words a minute, never less than one. */
export const readingTime = (p: Insight) => {
  const text = [
    p.summary,
    ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
  ].join(" ")
  return Math.max(1, Math.round(text.split(/\s+/).length / 220))
}

/* -------------------------------------------------------------------------- */
/* CTA image trail                                                              */
/* -------------------------------------------------------------------------- */

export const trailImages = [
  property1,
  service2,
  property3,
  story3,
  property5,
  service1,
  property7,
  story1,
  property8,
  about1,
]
