"use client"

import Image from "next/image"
import Hero from "@/components/v2/dashboard/Hero"

const OnrampHero = () => {
  return (
    <Hero
      title="Onramp"
      description="Whether you’re enabling fiat-to-crypto, transfers from exchanges, or bridging from other networks, Aurora Cloud helps onboard users seamlessly to your virtual chain."
      button={{
        text: "Coming soon",
      }}
      image={
        <Image
          width="180"
          height="180"
          src="/static/v2/images/heroIcons/gas.png"
          alt="Aurora Cloud"
        />
      }
    />
  )
}

export default OnrampHero
