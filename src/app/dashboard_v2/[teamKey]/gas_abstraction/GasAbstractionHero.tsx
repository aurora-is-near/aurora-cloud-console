"use client"

import Image from "next/image"
import Hero from "@/components/dashboard/Hero"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"

const GasAbstractionHero = () => {
  const { team, deals } = useRequiredContext(TeamContext)
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
