import Heading from "@/components/Heading"
import Charts from "../Charts"
import ToggleDeal from "../ToggleDeal"
import Card from "@/components/Card"
import { getDealById } from "@/mockApi"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import ContractsList from "./ContractsList"
import AccessSelector from "./AccessSelector"
import AccessLists from "./AccessLists"
import RulesList from "./RulesList"
import { CheckIcon, LifebuoyIcon } from "@heroicons/react/24/outline"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const deal = await getDealById(id)

  if (!deal) throw `Deal with id ${id} not found.`

  return (
    <>
      <div className="space-y-5">
        <section>
          <Charts>
            <div className="space-x-4 flex items-center">
              <ToggleDeal dealId={id} />
              <Heading tag="h2">{deal.name}</Heading>
            </div>
          </Charts>
        </section>

        <Card tag="section">
          <Card.Title>Contracts</Card.Title>
          <Card.Subtitle>
            List of target contracts to benefit from this deal.
          </Card.Subtitle>
          <Card.Actions>
            <Button>
              <PlusIcon className="h-5 w-5" />
              Add contract
            </Button>
          </Card.Actions>

          <ContractsList dealId={id} />
        </Card>

        <Card tag="section">
          <Card.Title>User Access</Card.Title>
          <Card.Subtitle>
            Select which users should benefit from this plan.
          </Card.Subtitle>
          <Card.Actions>
            <Button>
              <PlusIcon className="h-5 w-5" />
              Add list
            </Button>
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
              <PlusIcon className="h-5 w-5" />
              Add rule
            </Button>
          </Card.Actions>

          <RulesList />
        </Card>

        <Card
          tag="section"
          bgClassName="bg-gray-100"
          className="border flex justify-between items-center p-6"
        >
          <div className="flex items-center space-x-5">
            <LifebuoyIcon className="w-11 h-11 text-gray-500" />
            <div>
              <h3 className="text-base leading-none text-gray-900 font-medium">
                Need help setting up a plan?
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Reach out to our support team to get assistance.
              </p>
            </div>
          </div>
          <Button style="border">Contact Us</Button>
        </Card>
      </div>

      <div className="fixed lg:ml-[368px] inset-x-0 bottom-0 bg-white px-8 py-5 flex items-center justify-between border-t">
        <Button style="secondary">Reset</Button>
        <div className="text-sm text-gray-500">
          Last update: Jun 16, 2023 at 11:25
        </div>
        <Button>
          <CheckIcon className="w-5 h-5" />
          Save changes
        </Button>
      </div>
    </>
  )
}

export default Page
