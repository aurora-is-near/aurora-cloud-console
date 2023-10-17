import Heading from "@/components/Heading"
import ToggleDeal from "../ToggleDeal"
import Card from "@/components/Card"
import { getDealById } from "@/mockApi"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import ContractsList from "./ContractsList"
import AccessSelector from "./AccessSelector"
import AccessLists from "./AccessLists"
import RulesList from "./RulesList"
import { CheckIcon } from "@heroicons/react/24/outline"
import { notFound } from "next/navigation"
import Contact from "@/components/Contact"
import TabCharts from "@/components/TabCharts"
import AddContractButton from "./AddContractButton"
import AddListButton from "./AddListButton"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const deal = await getDealById(id)

  if (!deal) notFound()

  return (
    <>
      <div className="space-y-5">
        <section>
          <TabCharts
            tabs={[
              {
                title: "Transactions volume",
                value: "24,083",
                chart: <></>,
                legend: ["A very big deal", "Another deal"],
              },
              {
                title: "Total wallets",
                value: "3,932",
                chart: <></>,
                legend: ["A very big deal", "Another deal"],
              },
              {
                title: "Avg transactions per wallet",
                value: "1.03",
                chart: <></>,
                legend: ["A very big deal", "Another deal"],
              },
            ]}
          >
            <div className="flex items-center space-x-4">
              <ToggleDeal dealId={id} />
              <Heading tag="h2">{deal.name}</Heading>
            </div>
          </TabCharts>
        </section>

        <Card tag="section">
          <Card.Title>Contracts</Card.Title>
          <Card.Subtitle>
            List of target contracts to benefit from this deal.
          </Card.Subtitle>
          <Card.Actions>
            <AddContractButton />
          </Card.Actions>

          <ContractsList dealId={id} />
        </Card>

        <Card tag="section">
          <Card.Title>User Access</Card.Title>
          <Card.Subtitle>
            Select which users should benefit from this plan.
          </Card.Subtitle>
          <Card.Actions>
            <AddListButton />
          </Card.Actions>

          <AccessSelector />
          <AccessLists />
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

      {/* <div className="fixed lg:ml-[368px] inset-x-0 bottom-0 bg-white px-8 py-5 flex items-center justify-between border-t">
        <Button style="secondary">Reset</Button>
        <div className="text-sm text-gray-500">
          Last update: Jun 16, 2023 at 11:25
        </div>
        <Button>
          <CheckIcon className="w-5 h-5" />
          Save changes
        </Button>
      </div> */}
    </>
  )
}

export default Page
