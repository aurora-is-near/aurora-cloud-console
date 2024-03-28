import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { SiloForm } from "@/app/[team]/admin/silos/SiloForm"
import { getSilo } from "@/actions/silos/get-silo"
import { DashboardPage } from "@/components/DashboardPage"
import { getTokens } from "@/actions/tokens/get-tokens"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [silo, tokens] = await Promise.all([getSilo(id), getTokens()])

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage heading={silo.name}>
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm silo={silo} tokens={tokens} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
