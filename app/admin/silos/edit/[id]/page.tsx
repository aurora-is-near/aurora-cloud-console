import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { SiloForm } from "@/app/admin/silos/SiloForm"
import { getSilo } from "@/actions/admin/silos/get-silo"
import { AdminPage } from "@/components/AdminPage"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const silo = await getSilo(id)

  if (!silo) {
    notFound()
  }

  return (
    <AdminPage title={silo.name}>
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <div className="px-6 pb-7">
          <SiloForm silo={silo} />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
