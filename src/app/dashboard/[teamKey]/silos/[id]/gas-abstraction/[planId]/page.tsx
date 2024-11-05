import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { ContractsCard } from "./ContractsCard"
import { UsersCard } from "./UsersCard"
import { RulesCard } from "./RulesCard"
import { DealUpdatePage } from "./DealUpdatePage"

const Page = async ({
  params: { planId, teamKey },
}: {
  params: { planId: string; teamKey: string }
}) => {
  const dealId = Number(planId)
  const deal = await getTeamDealByKey(teamKey, dealId)

  if (!deal) {
    notFound()
  }

  return (
    <DealUpdateProvider dealId={dealId}>
      <DealUpdatePage deal={deal}>
        <UsersCard />
        <ContractsCard />
        <RulesCard />
        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
