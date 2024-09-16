import React from "react"
import { TeamProvider } from "@/contexts/TeamContext"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { getTokens } from "@/actions/tokens/get-tokens" // Import the getTokens function

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
      <Layout>{children}</Layout>
    </TeamProvider>
  )
}

export default TeamLayout
