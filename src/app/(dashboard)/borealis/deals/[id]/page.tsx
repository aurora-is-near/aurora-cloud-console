import Card from "@/components/Card"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import RulesList from "./RulesList"
import Contact from "@/components/Contact"
import { DealTransactionCharts } from "./DealTransactionsCharts"
import { FiltersForm } from "@/app/(dashboard)/borealis/deals/[id]/FiltersForm"
import { SaveChangesBar } from "@/app/(dashboard)/borealis/deals/[id]/SaveChangesBar"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DashboardPage } from "@/components/DashboardPage"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DealUpdateProvider dealId={Number(id)}>
      <DashboardPage footer={<SaveChangesBar />}>
        <section>
          <DealTransactionCharts />
        </section>

        <Card tag="section">
          <Card.Title>Filters</Card.Title>
          <Card.Subtitle>
            Select which users should benefit from this plan.
          </Card.Subtitle>
          <FiltersForm />
        </Card>

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
      </DashboardPage>
    </DealUpdateProvider>
  )
}

export default Page
