import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"
import { RuleProvider } from "@/providers/RuleProvider"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { RuleResourceDefinition } from "@/types/types"
import { ContractsCard } from "./ContractsCard"
import { RulesCard } from "./RulesCard"
import { DealUpdatePage } from "./DealUpdatePage"

const Page = async ({
  params: { id, planId, teamKey },
}: {
  params: { id: string; planId: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const dealId = Number(planId)
  const [deal, silo, rules, team] = await Promise.all([
    getTeamDealByKey(teamKey, dealId),
    getTeamSiloByKey(teamKey, siloId),
    getRules({ dealId }),
    getTeamByKey(teamKey),
  ])

  if (!deal || !silo) {
    notFound()
  }

  const userlistRuleDefinition: RuleResourceDefinition = {
    chains: silo.chain_id,
    contracts: [],
  }

  let userlistRule = rules?.find((r) => r.ui_enabled)

  if (!userlistRule) {
    userlistRule = await createRule({
      rule: {
        deal_id: dealId,
        resource_definition: userlistRuleDefinition,
      },
      team_id: team.id,
    })
  }

  return (
    <DealUpdateProvider dealId={dealId}>
      <DealUpdatePage deal={deal}>
        <RuleProvider team={team} initialRule={userlistRule}>
          <UsersConfigurationCard />
          <ContractsCard silo={silo} />
        </RuleProvider>
        <RulesCard />
        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
