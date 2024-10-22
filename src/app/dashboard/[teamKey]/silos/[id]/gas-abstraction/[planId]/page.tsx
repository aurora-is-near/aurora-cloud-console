import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"
import { FiltersCard } from "./FiltersCard"
import { DealUpdatePage } from "./DealUpdatePage"
import { ControlCard } from "./ControlCard"

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
        <FiltersCard />
        <ControlCard />

        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
