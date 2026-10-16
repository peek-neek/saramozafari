import React from "react"

import Header from "@/components/globals/Header"
import Footer from "@/components/globals/Footer"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { ImagePrefetcher } from "@/components/motion/ImagePrefetcher"

const HomepageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SmoothScroll />
      <ImagePrefetcher />
      <Header />
      <main id="top">{children}</main>
      <Footer />
    </>
  )
}

export default HomepageLayout
