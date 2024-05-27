import { getToken } from "@/actions/tokens/get-token"
import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { TokenForm } from "../../TokenForm"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const token = await getToken(id)

  if (!token) {
    notFound()
  }

  return (
    <DashboardPage heading={token.symbol}>
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <Card.Body>
          <TokenForm token={token} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
