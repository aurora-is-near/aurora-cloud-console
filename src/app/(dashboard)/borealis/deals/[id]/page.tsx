import Card from "@/components/Card"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import RulesList from "./RulesList"
import Contact from "@/components/Contact"
import { DealTransactionCharts } from "./DealTransactionsCharts"
import { FiltersForm } from "@/app/(dashboard)/borealis/deals/[id]/FiltersForm"
import { SaveChangesBar } from "@/app/(dashboard)/borealis/deals/[id]/SaveChangesBar"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-5">
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
      </div>

      <SaveChangesBar dealId={Number(id)} />
    </>
  )
}

export default Page
