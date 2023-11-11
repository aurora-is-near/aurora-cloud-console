import Card from "@/components/Card"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import ContractsList from "./ContractsList"
import AccessSelector from "./AccessSelector"
import AccessLists from "./AccessLists"
import RulesList from "./RulesList"
import Contact from "@/components/Contact"
import AddContractButton from "./AddContractButton"
import AddListButton from "./AddListButton"
import ListItemLoader from "@/components/ListItemLoader"
import TransactionsCharts from "../../../silos/TransactionsCharts"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-5">
        <section>
          <TransactionsCharts type="deal" id={id} />
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
