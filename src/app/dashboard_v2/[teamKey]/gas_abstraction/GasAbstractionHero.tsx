"use client"

import Image from "next/image"
import Hero from "@/components/v2/dashboard/Hero"
import { useTeamContext } from "@/contexts/TeamContext"

const GasAbstractionHero = () => {
  const { team, deals } = useTeamContext()
  const buttonText = deals.length > 0 ? "New plan" : "Create plan"

  return (
    <Hero
      title="Gas Abstraction"
      description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
      button={{
        text: buttonText,
        path: `/dashboard_v2/${team.team_key}/gas_abstraction/new`,
      }}
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
