import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
import { FilterProvider } from "@/providers/FilterProvider"
import { getRules } from "@/actions/rules/get-rules"
import { AddFilterAddressModal } from "./AddFilterAddressModal"
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
  const [deal, silo, rules] = await Promise.all([
    getTeamDealByKey(teamKey, dealId),
    getTeamSiloByKey(teamKey, siloId),
    getRules({ dealId }),
  ])

  if (!deal || !silo) {
    notFound()
  }

  const userlistRule = rules?.find((r) => !!r.resource_definition)

  return (
    <DealUpdateProvider dealId={dealId}>
      <DealUpdatePage deal={deal}>
        {eoaFilter && (
          <FilterProvider dealId={dealId} filterId={eoaFilter.id}>
            <UsersConfigurationCard />
            <AddFilterAddressModal />
          </FilterProvider>
        )}
        {contractFilter && (
          <FilterProvider dealId={dealId} filterId={contractFilter.id}>
            <ContractsCard silo={silo} />
            <AddFilterAddressModal />
          </FilterProvider>
        )}
        <RulesCard />
        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
