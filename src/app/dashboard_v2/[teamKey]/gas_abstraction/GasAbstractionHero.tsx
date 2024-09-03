import Image from "next/image"
import { Deal, Team } from "@/types/types"
import Hero from "@/components/v2/dashboard/Hero"

interface GasAbstractionHeroProps {
  team: Team
  deals: Deal[]
}

const GasAbstractionHero = ({ team, deals }: GasAbstractionHeroProps) => {
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
          src="/static/v2/images/heroIcons/gas.png"
          alt="Aurora Cloud"
        />
      }
    />
  )
}

export default GasAbstractionHero
