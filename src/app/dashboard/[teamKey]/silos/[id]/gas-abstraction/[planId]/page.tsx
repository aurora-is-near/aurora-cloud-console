import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"
import { RuleProvider } from "@/providers/RuleProvider"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { RuleResourceDefinition } from "@/types/types"
import { getUiLimits } from "@/actions/limits/get-ui-limits"
import { createDefaultLimits } from "@/actions/limits/create-default-limits"
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
  const [deal, silo, rules, limits, team] = await Promise.all([
    getTeamDealByKey(teamKey, dealId),
    getTeamSiloByKey(teamKey, siloId),
    getRules({ dealId }),
    getUiLimits(dealId),
    getTeamByKey(teamKey),
  ])

  if (!deal || !silo) {
    notFound()
  }

  const userlistRuleDefinition: RuleResourceDefinition = {
    chains: silo.chain_id,
    contracts: [],
  }

  let userlistRule = rules?.data.find((r) => r.ui_enabled)

  if (!userlistRule) {
    userlistRule = await createRule({
      rule: {
        deal_id: dealId,
        resource_definition: userlistRuleDefinition,
      },
      team_id: team.id,
    })
  }

  let globalLimit = limits?.find((l) => l.limit_scope === "GLOBAL")
  let userLimit = limits?.find((l) => l.limit_scope === "USER")

  if (!globalLimit || !userLimit) {
    await createDefaultLimits(dealId)
    globalLimit = limits?.find((l) => l.limit_scope === "GLOBAL")
    userLimit = limits?.find((l) => l.limit_scope === "USER")
  }

  return (
    <DealUpdatePage deal={deal}>
      <RuleProvider team={team} initialRule={userlistRule}>
        <UsersConfigurationCard deal={deal} />
        <ContractsCard silo={silo} />
      </RuleProvider>
      <RulesCard deal={deal} />
      <Contact teamKey={teamKey} />
    </DealUpdatePage>
  )
}

export default Page
