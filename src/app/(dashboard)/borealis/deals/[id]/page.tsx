import Card from "@/components/Card"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import RulesList from "./RulesList"
import Contact from "@/components/Contact"
import { DealTransactionCharts } from "./DealTransactionsCharts"
import { FiltersCard } from "./FiltersCard"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealUpdatePage } from "./DealUpdatePage"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DealUpdateProvider dealId={Number(id)}>
      <DealUpdatePage>
        <section>
          <DealTransactionCharts />
        </section>

        <FiltersCard />

        <Card tag="section">
          <Card.Title>Rules</Card.Title>
          <Card.Subtitle>
            List of conditions applied to this plan.
          </Card.Subtitle>
          <Card.Actions>
            <Button>
              <PlusIcon className="w-5 h-5" />
              Add rule
            </Button>
          </Card.Actions>

          <RulesList />
        </Card>

        <Contact />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
