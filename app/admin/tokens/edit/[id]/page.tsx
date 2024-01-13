import { notFound } from "next/navigation"
import { getToken } from "@/actions/admin/tokens/get-token"
import Card from "@/components/Card"
import { TokenForm } from "@/app/admin/tokens/TokenForm"
import { AdminPage } from "@/components/AdminPage"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const token = await getToken(id)

  if (!token) {
    notFound()
  }

  return (
    <AdminPage title={token.name}>
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <div className="px-6 pb-7">
          <TokenForm token={token} />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
