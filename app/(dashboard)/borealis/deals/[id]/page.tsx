import Heading from "@/components/Heading"
import Charts from "../Charts"
import ToggleDeal from "../ToggleDeal"
import Card from "@/components/Card"
import { getDealById } from "@/mockApi"
import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"
import ContractsList from "./ContractsList"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const deal = await getDealById(id)

  if (!deal) throw `Deal with id ${id} not found.`

  return (
    <div className="space-y-12">
      <section>
        <Charts>
          <div className="space-x-4 flex items-center">
            <ToggleDeal dealId={id} />
            <Heading tag="h2">{deal.name}</Heading>
          </div>
        </Charts>
      </section>

      <Card tag="section">
        <header className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg leading-none text-gray-900 font-medium">
              Contracts
            </h2>
            <p className="mt-2 text-gray-500 text-sm leading-5">
              List of target contracts to benefit from this deal.
            </p>
          </div>
          <Button>
            <PlusIcon className="h-5 w-5" />
            Add contract
          </Button>
        </header>

        <ContractsList dealId={id} />
      </Card>
    </div>
  )
}

export default Page
