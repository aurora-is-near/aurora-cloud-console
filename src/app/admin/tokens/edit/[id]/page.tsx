import { getToken } from "@/actions/admin/tokens/get-token"
import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { TokenForm } from "@/app/admin/tokens/TokenForm"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const token = await getToken(id)

  if (!token) {
    notFound()
  }

  return (
    <DashboardPage heading={token.name}>
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <div className="px-6 pb-7">
          <TokenForm token={token} />
        </div>
      </Card>
    </DashboardPage>
  )
}

export default Page
