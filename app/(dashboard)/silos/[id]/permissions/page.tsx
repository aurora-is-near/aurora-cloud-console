import Card from "@/components/Card"
import Heading from "@/components/Heading"
import { getSiloById } from "@/mockApi"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { notFound } from "next/navigation"
import TransactionAccessList from "./TransactionAccessList"
import DeployAccessList from "./DeployAccessList"
import AddListButton from "./AddListButton"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return (
    <div className="space-y-5">
      <div className="flex gap-x-1.5 items-center">
        <Heading tag="h2" className="!text-gray-500">
          {silo.name}
        </Heading>
        <ChevronRightIcon className="w-5 h-5 text-gray-500" />
        <Heading tag="h3">Permissions</Heading>
      </div>

      <Card tag="section">
        <Card.Title tag="h4">Transactions access</Card.Title>
        <Card.Actions>
          <AddListButton />
        </Card.Actions>
        <TransactionAccessList />
      </Card>

      <Card tag="section">
        <Card.Title>Deploy contracts access</Card.Title>
        <Card.Actions>
          <AddListButton />
        </Card.Actions>
        <DeployAccessList />
      </Card>
    </div>
  )
}

export default Page
