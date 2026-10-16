import { Hero } from "@/components/home/Hero"
import { About } from "@/components/home/About"
import { Properties } from "@/components/home/Properties"
import { Process } from "@/components/home/Process"
import { Services } from "@/components/home/Services"
import { Showreel } from "@/components/home/Showreel"
import { MeetSara } from "@/components/home/MeetSara"
import { Testimonials } from "@/components/home/Testimonials"
import { Faq } from "@/components/home/Faq"
import { Insights } from "@/components/home/Insights"
import { Cta } from "@/components/home/Cta"

export default function Page() {
  return (
    <>
      <Hero />
      <MeetSara />
      <About />
      <Properties />
      <Process />
      <Services />
      <Showreel />
      <Testimonials />
      <Faq />
      <Insights />
      <Cta />
    </>
  )
}
