import Card from "@/components/Card"
import { TeamForm } from "@/app/admin/teams/TeamForm"
import { AdminPage } from "@/components/AdminPage"

const Page = async () => {
  return (
    <AdminPage title="Add team">
      <Card>
        <Card.Title tag="h3">Team details</Card.Title>
        <div className="px-6 pb-7">
          <TeamForm />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
