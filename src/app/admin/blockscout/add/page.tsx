import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { BlockscoutDatabaseForm } from "../BlockscoutDatabaseForm"

const Page = async () => (
  <DashboardPage heading="Add database">
    <Card>
      <Card.Title tag="h3">Database details</Card.Title>
      <Card.Body>
        <BlockscoutDatabaseForm />
      </Card.Body>
    </Card>
  </DashboardPage>
)

export default Page
