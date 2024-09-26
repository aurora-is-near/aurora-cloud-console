import React from "react"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { getTokens } from "@/actions/tokens/get-tokens" // Import the getTokens function
import { TeamProvider } from "@/providers/TeamProvider"
import Header from "@/components/v2/dashboard/Header"
import LeftMenu from "@/components/v2/dashboard/LeftMenu/LeftMenu"

interface TeamLayoutProps {
  children: React.ReactNode
  params: { teamKey: string }
}

const TeamLayout = async ({ children, params }: TeamLayoutProps) => {
  const team = await getTeamByKey(params.teamKey)

  if (!team) {
    throw new Error("Team not found")
  }

  const [silos, deals, tokens] = await Promise.all([
    getTeamSilos(team.id),
    getTeamDeals(team.id),
    getTokens(), // Fetch tokens
  ])

  return (
    <TeamProvider
      initialTeam={team}
      initialSilos={silos}
      initialDeals={deals}
      initialTokens={tokens}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        <Header />
        <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
          <LeftMenu />
          <div className="flex justify-center w-full h-full overflow-x-hidden overflow-y-auto">
            <div className="w-full max-w-[980px] py-10">{children}</div>
          </div>
        </div>
      </div>
    </TeamProvider>
  )
}

export default TeamLayout
