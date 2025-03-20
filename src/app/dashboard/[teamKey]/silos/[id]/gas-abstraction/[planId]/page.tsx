import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"
import { RuleProvider } from "@/providers/RuleProvider"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getUiLimits } from "@/actions/limits/get-ui-limits"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
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

  let userlistRule = rules?.data.find((r) => r.ui_enabled)

  if (!userlistRule) {
    userlistRule = await createRule({
      rule: {
        deal_id: dealId,
        chains: [silo.chain_id],
        except_chains: [],
        contracts: [],
        except_contracts: [],
      },
      team_id: team.id,
    })
  }

  return (
    <DealUpdatePage deal={deal} siloId={siloId}>
      <RuleProvider team={team} initialRule={userlistRule}>
        <UsersConfigurationCard deal={deal} />
        <ContractsCard silo={silo} />
      </RuleProvider>
      <RulesCard limitScopes={["GLOBAL", "USER"]} limits={limits} deal={deal} />
      <Contact />
    </DealUpdatePage>
  )
}

export default Page
