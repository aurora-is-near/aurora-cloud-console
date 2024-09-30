import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import TransactionAccessList from "./TransactionAccessList"
import DeployAccessList from "./DeployAccessList"
import AddListButton from "./AddListButton"
import { SiloHeading } from "../../SiloHeading"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <SiloHeading heading="Permissions" siloId={Number(id)} />

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
    </DashboardPage>
  )
}

export default Page
