import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { FiltersCard } from "./FiltersCard"
import { DealUpdatePage } from "./DealUpdatePage"
import { ControlCard } from "./ControlCard"

const Page = ({
  params: { planId, teamKey },
}: {
  params: { planId: string; teamKey: string }
}) => {
  return (
    <DealUpdateProvider dealId={Number(planId)}>
      <DealUpdatePage>
        <FiltersCard />
        <ControlCard />

        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
