import Card from "@/components/Card"
import { TokenForm } from "../TokenForm"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async () => {
  return (
    <DashboardPage heading="Add token">
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <Card.Body>
          <TokenForm />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
