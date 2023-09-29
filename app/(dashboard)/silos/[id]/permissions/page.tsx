import Card from "@/components/Card"
import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"
import TransactionAccessList from "./TransactionAccessList"
import DeployAccessList from "./DeployAccessList"
import AddListButton from "./AddListButton"
import BreadcrumbHeading from "@/components/BreadcrumbHeading"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return (
    <div className="space-y-5">
      <BreadcrumbHeading titles={[silo.name, "Permissions"]} />

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
