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
import property4 from "@/assets/images/property-4.jpg"
import property5 from "@/assets/images/property-5.jpg"
import property6 from "@/assets/images/property-6.jpg"
import property7 from "@/assets/images/property-7.jpg"
import property8 from "@/assets/images/property-8.jpg"
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
import reel3 from "@/assets/images/reel-3.jpg"
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
  wordmark: "SARA MOZAFARI",
  agent: "Sara Mozafari",
  role: "Real Estate Agent · GTA",
  region: "Greater Toronto Area, Ontario",
  phone: "416-844-1380",
  phoneHref: "tel:+14168441380",
  // Placeholder — replace with Sara's real address.
  email: "hello@saramoz.homes",
  instagram: "https://www.instagram.com/saramoz.homes/",
  instagramHandle: "@saramoz.homes",
  tagline: "Patient guidance. Precise results. Relationships built on trust.",
}

export const images = {
  // Depth hero: full photo + transparent skyline/foreground cut-out of the same frame.
  heroSky,
  heroSkyline,
  sara,
  footer: reel1,
}

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Listings", href: "/#listings" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "Meet Sara", href: "/#meet-sara" },
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
/* Listings — dummy data until real listings are connected                     */
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
  price: string
  beds: number
  baths: number
  image: StaticImageData
  type: string
  sqft: string
  lot: string
  summary: string
  overview: string[]
  features: string[]
  nearby?: { place: string; time: string }[]
  gallery?: StaticImageData[]
}

export const properties: Property[] = [
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
  {
    slug: "cedar-lane-cottage-home",
    title: "Cedar Lane Cottage Home",
    area: "Oakville",
    price: "$1,640,000",
    beds: 4,
    baths: 3,
    image: property3,
    type: "Detached",
    sqft: "2,900 sq ft",
    lot: "55 × 125 ft",
    summary:
      "A storybook cottage-style home a short walk from downtown Oakville and the lake.",
    overview: [
      "Twin dormers, a red metal roof and a welcoming front stoop make this one of the most recognisable homes on the street. Inside, the main floor flows from a formal living room to a sunny eat-in kitchen overlooking the garden.",
      "Four bedrooms upstairs include a primary with vaulted ceilings. It is a rare chance to get character and a walkable location without giving up space.",
    ],
    features: [
      "Metal roof and updated windows",
      "Eat-in kitchen with garden views",
      "Vaulted primary bedroom",
      "Hardwood throughout the main floor",
      "Detached single garage",
      "Walk to the lake and downtown",
    ],
    nearby: [
      { place: "Downtown Oakville", time: "4 min" },
      { place: "Lake Ontario waterfront", time: "6 min" },
      { place: "Oakville GO", time: "8 min" },
      { place: "QEW", time: "7 min" },
    ],
    gallery: [service3, reel4, reel5, blog4],
  },
  {
    slug: "maple-row-family-home",
    title: "Maple Row Family Home",
    area: "Vaughan",
    price: "$1,385,000",
    beds: 4,
    baths: 3,
    image: property4,
    type: "Detached",
    sqft: "2,750 sq ft",
    lot: "40 × 110 ft",
    summary:
      "A move-in-ready family home on a quiet, kid-friendly street in Vaughan.",
    overview: [
      "This three-storey home has been looked after by the same family for years and it shows: a refreshed kitchen, newer furnace and roof, and freshly finished hardwood. The main floor has separate living and dining rooms plus a family room off the kitchen.",
      "Four bedrooms are spread across the upper floors, giving teenagers or guests a little extra privacy. Schools, parks and transit are all within a short walk.",
    ],
    features: [
      "Newer roof and furnace",
      "Refreshed kitchen with breakfast area",
      "Separate living and dining rooms",
      "Third-floor bedroom retreat",
      "Fenced backyard with deck",
      "Walk to schools and parks",
    ],
    nearby: [
      { place: "Vaughan Mills", time: "9 min" },
      { place: "Local elementary school", time: "4 min" },
      { place: "Vaughan Metropolitan Centre subway", time: "12 min" },
      { place: "Highway 400", time: "7 min" },
    ],
    gallery: [reel6, reel5, blog4, reel7],
  },
  {
    slug: "lakeshore-porch-house",
    title: "Lakeshore Porch House",
    area: "Mississauga",
    price: "$1,975,000",
    beds: 5,
    baths: 4,
    image: property5,
    type: "Detached",
    sqft: "3,400 sq ft",
    lot: "70 × 160 ft",
    summary:
      "A wraparound-porch home on a large lot close to the Port Credit waterfront.",
    overview: [
      "The wraparound porch is the first thing you notice and the place you will spend summer evenings. Inside, a centre-hall plan leads to a large kitchen and family room across the back of the house, with walk-outs to the garden.",
      "Five bedrooms and four bathrooms give a growing family plenty of space, and the 70-foot frontage leaves room to extend later if you ever want to.",
    ],
    features: [
      "Wraparound covered porch",
      "Centre-hall plan",
      "Kitchen and family room across the back",
      "Five bedrooms, four bathrooms",
      "Wide 70 ft frontage",
      "Minutes to the waterfront",
    ],
    nearby: [
      { place: "Port Credit village", time: "6 min" },
      { place: "Lake Ontario trails", time: "5 min" },
      { place: "Port Credit GO", time: "7 min" },
      { place: "QEW", time: "8 min" },
    ],
    gallery: [reel4, service3, reel5, reel6],
  },
  {
    slug: "kleinburg-timber-lodge",
    title: "Kleinburg Timber Lodge",
    area: "Vaughan",
    price: "$3,450,000",
    beds: 6,
    baths: 5,
    image: property6,
    type: "Detached",
    sqft: "5,200 sq ft",
    lot: "1.1 acres",
    summary:
      "A timber-and-stone retreat on more than an acre, minutes from Kleinburg village.",
    overview: [
      "Steep gables, exposed timber and walls of glass give this home the feel of a mountain lodge, yet it sits within an easy drive of the city. The great room has soaring ceilings and a floor-to-ceiling stone fireplace.",
      "Six bedrooms, a walk-out lower level and over an acre of grounds make it equally suited to big family gatherings and quiet weekends in.",
    ],
    features: [
      "Great room with stone fireplace",
      "Exposed timber beams",
      "Walk-out lower level",
      "Six bedrooms, five bathrooms",
      "Triple-car garage",
      "Over an acre of private grounds",
    ],
    nearby: [
      { place: "Kleinburg village", time: "5 min" },
      { place: "McMichael Canadian Art Collection", time: "7 min" },
      { place: "Boyd Conservation Area", time: "10 min" },
      { place: "Highway 427", time: "8 min" },
    ],
    gallery: [reel3, reel4, reel5, reel7],
  },
  {
    slug: "rosedale-modern-infill",
    title: "Rosedale Modern Infill",
    area: "Toronto",
    price: "$4,200,000",
    beds: 4,
    baths: 5,
    image: property7,
    type: "Detached",
    sqft: "3,900 sq ft",
    lot: "30 × 140 ft",
    summary:
      "A custom-built modern home with warm wood details, tucked into a Rosedale side street.",
    overview: [
      "Clean lines, cedar cladding and black steel make this infill stand out without shouting. Inside, an open main floor runs from a chef's kitchen to a living room with a wall of glass onto the garden.",
      "Four bedrooms each have their own ensuite, and the lower level adds a media room and a wine cellar. Every finish was chosen by the architect, not a builder's catalogue.",
    ],
    features: [
      "Architect-designed custom build",
      "Wall of glass to the garden",
      "Every bedroom with an ensuite",
      "Lower-level media room",
      "Temperature-controlled wine cellar",
      "Heated floors throughout",
    ],
    nearby: [
      { place: "Rosedale subway station", time: "5 min" },
      { place: "Yorkville", time: "8 min" },
      { place: "Rosedale Ravine trails", time: "3 min" },
      { place: "Don Valley Parkway", time: "6 min" },
    ],
    gallery: [reel3, reel5, reel6, reel7],
  },
  {
    slug: "unionville-glass-house",
    title: "Unionville Glass House",
    area: "Markham",
    price: "$2,780,000",
    beds: 5,
    baths: 5,
    image: property8,
    type: "Detached",
    sqft: "4,100 sq ft",
    lot: "65 × 145 ft",
    summary:
      "A light-filled modern home with a pool, close to historic Main Street Unionville.",
    overview: [
      "Floor-to-ceiling glass wraps the main floor, so the kitchen, dining and living areas all look out over the pool and garden. Polished concrete floors and a floating staircase keep the look calm and minimal.",
      "Five bedrooms upstairs share a skylit hallway, and the primary suite has a private balcony over the backyard. It is resort-style living within walking distance of Unionville's shops and trails.",
    ],
    features: [
      "Floor-to-ceiling glass on the main floor",
      "In-ground saltwater pool",
      "Floating staircase with skylight",
      "Primary suite with private balcony",
      "Polished concrete floors",
      "Walk to Main Street Unionville",
    ],
    nearby: [
      { place: "Main Street Unionville", time: "4 min" },
      { place: "Toogood Pond Park", time: "5 min" },
      { place: "Unionville GO", time: "6 min" },
      { place: "Highway 407", time: "7 min" },
    ],
    gallery: [reel3, blog4, reel5, reel7],
  },
]

export const getProperty = (slug: string) =>
  properties.find((p) => p.slug === slug)

export const listingHref = (p: Property) => `/listings/${p.slug}`

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
    name: "Buy",
    cta: "Start Buying",
    body: "Find the right home without the guesswork. Sara narrows the search, flags red flags early and helps you write an offer you feel good about.",
    image: service1,
  },
  {
    name: "Sell",
    cta: "Plan Your Sale",
    body: "A pricing strategy backed by local data, polished marketing and steady negotiation - so your home sells for what it is worth.",
    image: service2,
  },
  {
    name: "Lease",
    cta: "Find a Lease",
    body: "For tenants and landlords alike: well-matched rentals, careful screening and leases that protect both sides.",
    image: service3,
  },
  {
    name: "Pre-Construction",
    cta: "Explore Pre-Construction",
    body: "Navigate GTA condo and townhome launches with clear guidance on builders, deposit structures and assignment options.",
    image: service4,
  },
  {
    name: "Invest",
    cta: "Talk Investing",
    body: "Income properties chosen on the numbers. Cash-flow analysis, rental demand and long-term value, explained simply.",
    image: service5,
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
      body: "First condos, family homes, downsizing and investment.",
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
        image: { src: process3, alt: "Model house and piggy bank resting on floor plans" },
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
        heading: "What \"on the rise\" really means",
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
        image: { src: about5, alt: "Modern two-storey home with a wood-panel facade" },
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
        image: { src: service5, alt: "Modern home with every window lit at dusk" },
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
        image: { src: process1, alt: "Agent and client celebrating a deal at a desk" },
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
        image: { src: service3, alt: "Bright living room with a grey sofa and hanging plants" },
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
        image: { src: story3, alt: "Staged living room with a leather sofa and a gallery wall" },
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

/** Whole minutes at a relaxed ~220 words a minute, never less than one. */
export const readingTime = (p: Insight) => {
  const text = [p.summary, ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs])].join(" ")
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
