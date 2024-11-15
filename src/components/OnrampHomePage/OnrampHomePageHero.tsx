import Image from "next/image"
import Hero from "@/components/Hero/Hero"

export const OnrampHomePageHero = () => {
  return (
    <Hero
      hasDivider
      title="Onramp"
      description="Whether you’re enabling fiat-to-crypto, transfers from exchanges, or bridging from other networks, Aurora Cloud helps onboard users seamlessly to your virtual chain."
      image={
        <Image
          width="180"
          height="180"
          src="/static/v2/images/heroIcons/onramp.webp"
          alt="Aurora Cloud"
          className="mr-16 shadow-xl rounded-[2rem]"
        />
      }
    />
  )
}
