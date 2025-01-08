import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
import { FilterProvider } from "@/providers/FilterProvider"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"
import { RuleProvider } from "@/providers/RuleProvider"
import { getRuleUserlists } from "@/actions/rule-userlists/get-rule-userlists"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { createRuleUserlist } from "@/actions/rule-userlists/create-rule-userlist"
import { AddFilterAddressModal } from "./AddFilterAddressModal"
import { ContractsCard } from "./ContractsCard"
import { RulesCard } from "./RulesCard"
import { DealUpdatePage } from "./DealUpdatePage"

const userlistRuleDefinition = { feature: "userlistRule" }

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

  let userlistRule = rules?.find((r) => {
    const def = r.resource_definition as { feature: string }

    return def?.feature === userlistRuleDefinition.feature
  })

  if (!userlistRule) {
    userlistRule = await createRule({
      deal_id: dealId,
      resource_definition: userlistRuleDefinition,
    })
    await createRuleUserlist({
      team_id: team.id,
      rule_id: userlistRule.id,
    })
  }

  // const userlistRule = rules?.find((r) => !!r.resource_definition)

  return (
    <DealUpdateProvider dealId={dealId}>
      <DealUpdatePage deal={deal}>
        <RuleProvider team={team} initialRule={userlistRule}>
          <UsersConfigurationCard />
          {/* <AddFilterAddressModal /> */}
        </RuleProvider>
        {/* {contractFilter && (
          <FilterProvider dealId={dealId} filterId={contractFilter.id}>
            <ContractsCard silo={silo} />
            <AddFilterAddressModal />
          </FilterProvider>
        )} */}
        <RulesCard />
        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
