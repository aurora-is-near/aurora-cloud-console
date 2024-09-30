"use client"

import Image from "next/image"
import Hero from "@/components/dashboard/Hero"

const GasAbstractionHero = () => {
  return (
    <Hero
      title="Gas Abstraction"
      description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
      image={
        <Image
          width="180"
          height="180"
          src="/static/v2/images/heroIcons/onramp.png"
          alt="Aurora Cloud"
        />
      }
    />
  )
}

export default GasAbstractionHero
