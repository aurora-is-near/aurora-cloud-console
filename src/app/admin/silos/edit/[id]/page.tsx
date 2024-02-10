import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { SiloForm } from "@/app/admin/silos/SiloForm"
import { getSilo } from "@/actions/admin/silos/get-silo"
import { DashboardPage } from "@/components/DashboardPage"
import { getTokens } from "@/actions/admin/tokens/get-tokens"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [silo, tokens] = await Promise.all([getSilo(id), getTokens()])

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage heading={silo.name}>
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <div className="px-6 pb-7">
          <SiloForm silo={silo} tokens={tokens} />
        </div>
      </Card>
    </DashboardPage>
  )
}

export default Page
