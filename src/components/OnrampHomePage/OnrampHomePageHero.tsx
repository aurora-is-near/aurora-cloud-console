import Image from "next/image"

import Hero from "@/components/Hero/Hero"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"
import type { Silo } from "@/types/types"

type Props = {
  silo?: Silo | null
}

export const OnrampHomePageHero = ({ silo }: Props) => {
  return (
    <Hero
      hasDivider
      title="Onramp"
      description="Whether you’re enabling fiat-to-crypto, transfers from exchanges, or bridging from other networks, Aurora Cloud helps onboard users seamlessly to your virtual chain."
      image={
        <Image
          width="180"
          height="180"
          src="/static/images/heroIcons/onramp.webp"
          alt="Aurora Cloud"
          className="mr-16 shadow-xl rounded-[2rem]"
        />
      }
    >
      {!silo && (
        <NotAvailableBadge>Available with your Virtual Chain</NotAvailableBadge>
      )}
    </Hero>
  )
}
