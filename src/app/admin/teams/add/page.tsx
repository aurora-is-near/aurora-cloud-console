import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { TeamForm } from "@/components/admin/TeamForm"

const Page = async () => {
  return (
    <DashboardPage heading="Add team">
      <Card>
        <Card.Title tag="h3">Team details</Card.Title>
        <Card.Body>
          <TeamForm />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
