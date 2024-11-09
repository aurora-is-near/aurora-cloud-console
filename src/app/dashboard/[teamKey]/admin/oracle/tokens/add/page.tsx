import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { TokenForm } from "../TokenForm"

const Page = async () => (
  <DashboardPage heading="Add token">
    <Card>
      <Card.Title tag="h3">Token details</Card.Title>
      <Card.Body>
        <TokenForm />
      </Card.Body>
    </Card>
  </DashboardPage>
)

export default Page
