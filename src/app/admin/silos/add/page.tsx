import Card from "@/components/Card"
import { SiloForm } from "@/app/admin/silos/SiloForm"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async () => {
  return (
    <DashboardPage heading="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <div className="px-6 pb-7">
          <SiloForm />
        </div>
      </Card>
    </DashboardPage>
  )
}

export default Page
