import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { BridgedTokenForm } from "../BridgedTokenForm"

const Page = async () => {
  return (
    <DashboardPage heading="Add token">
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <Card.Body>
          <BridgedTokenForm />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
