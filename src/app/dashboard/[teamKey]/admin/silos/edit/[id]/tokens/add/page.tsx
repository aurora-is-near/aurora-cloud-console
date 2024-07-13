import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getSilo } from "@/actions/silos/get-silo"
import { TokenForm } from "../TokenForm"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const silo = await getSilo(id)

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage heading={["Silos", silo.name, "Add token"]}>
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <Card.Body>
          <TokenForm siloId={id} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
