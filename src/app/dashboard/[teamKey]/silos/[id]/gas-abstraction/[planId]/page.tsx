import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { ContractsCard } from "./ContractsCard"
import { UsersCard } from "./UsersCard"
import { RulesCard } from "./RulesCard"
import { DealUpdatePage } from "./DealUpdatePage"

const Page = async ({
  params: { id, planId, teamKey },
}: {
  params: { id: string; planId: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const dealId = Number(planId)
  const [deal, silo] = await Promise.all([
    getTeamDealByKey(teamKey, dealId),
    getTeamSiloByKey(teamKey, siloId),
  ])

  if (!deal || !silo) {
    notFound()
  }

  return (
    <DealUpdateProvider dealId={dealId}>
      <DealUpdatePage deal={deal}>
        <UsersCard />
        <ContractsCard silo={silo} />
        <RulesCard />
        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
