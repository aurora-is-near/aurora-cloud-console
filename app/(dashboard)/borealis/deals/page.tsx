import Button from "@/components/Button"
import Contact from "@/app/(dashboard)/borealis/deals/Contact"
import DealItem from "@/app/(dashboard)/borealis/deals/DealItem"
import Heading from "@/components/Heading"
import { Deal } from "@/types/types"
import Charts from "./Charts"

const deals: Deal[] = [
  {
    id: 1,
    name: "A very big deal",
    created_at: "2023-06-03T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Another deal",
    created_at: "2023-05-23T12:00:00.000Z",
  },
]

const Page = () => {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between">
          <Heading tag="h2">Summary</Heading>

          <div className="flex space-x-2.5">
            <Button style="secondary">All time</Button>
            <Button style="transparent">1w</Button>
            <Button style="transparent">1m</Button>
            <Button style="transparent">3m</Button>
          </div>
        </div>

        <Charts />
      </section>

      <section>
        <Heading tag="h2">Deals</Heading>
        <div className="mt-7 overflow-hidden rounded-md bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {deals.map((deal) => (
              <DealItem key={deal.id} {...deal} />
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </div>
  )
}

export default Page
