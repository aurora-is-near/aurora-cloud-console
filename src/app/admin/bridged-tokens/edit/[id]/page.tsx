import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { BridgedTokenForm } from "@/app/admin/bridged-tokens/BridgedTokenForm"
import { getBridgedToken } from "@/actions/bridged-tokens/get-bridged-token"
import { DeleteBridgedTokenButton } from "./DeleteBridgedTokenButton"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const token = await getBridgedToken(id)

  if (!token) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Bridged tokens", token.name]}
      actions={<DeleteBridgedTokenButton token={token} />}
    >
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <Card.Body>
          <BridgedTokenForm token={token} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
