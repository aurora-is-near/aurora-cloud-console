import Card from "@/components/Card"
import { SiloForm } from "@/app/admin/silos/SiloForm"
import { AdminPage } from "@/components/AdminPage"

const Page = async () => {
  return (
    <AdminPage title="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <div className="px-6 pb-7">
          <SiloForm />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
