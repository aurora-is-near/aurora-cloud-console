import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import UsersConfigurationCard from "@/components/GasAbstraction/UsersConfigurationCard"
import { getFilters } from "@/actions/filters/get-filters"
import { FilterProvider } from "@/providers/FilterProvider"
import { createFilter } from "@/actions/filters/create-filter"
import { DealDurationModal } from "./DealDurationModal"
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
  const [deal, silo, filters] = await Promise.all([
    getTeamDealByKey(teamKey, dealId),
    getTeamSiloByKey(teamKey, siloId),
    getFilters(dealId),
  ])

  if (!deal || !silo) {
    notFound()
  }

  let eoaFilter = filters?.find((f) => f.filter_type === "EOA")
  let contractFilter = filters?.find((f) => f.filter_type === "CONTRACT")

  if (!eoaFilter) {
    eoaFilter = await createFilter(dealId, "EOA")
  }

  if (!contractFilter) {
    contractFilter = await createFilter(dealId, "CONTRACT")
  }

  return (
    <DealUpdateProvider dealId={dealId}>
      <DealUpdatePage deal={deal}>
        {eoaFilter && (
          <FilterProvider filterId={eoaFilter.id}>
            <UsersConfigurationCard />
            <AddFilterAddressModal />
          </FilterProvider>
        )}
        {contractFilter && (
          <FilterProvider filterId={contractFilter.id}>
            <ContractsCard silo={silo} />
            <AddFilterAddressModal />
          </FilterProvider>
        )}
        <RulesCard />
        <Contact teamKey={teamKey} />
        <DealDurationModal />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
