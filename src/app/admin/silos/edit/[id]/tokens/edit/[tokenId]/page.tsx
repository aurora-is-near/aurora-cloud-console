import { notFound } from "next/navigation"
import { getToken } from "@/actions/tokens/get-token"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getSilo } from "@/actions/silos/get-silo"
import { DeleteTokenButton } from "@/app/admin/silos/edit/[id]/tokens/edit/[tokenId]/DeleteTokenButton"
import { TokenForm } from "../../TokenForm"

const Page = async ({
  params: { id, tokenId },
}: {
  params: { id: number; tokenId: number }
}) => {
  const [token, silo] = await Promise.all([getToken(tokenId), getSilo(id)])

  if (!token || !silo) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Silos", silo.name, token.symbol]}
      actions={<DeleteTokenButton token={token} siloId={silo.id} />}
    >
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <Card.Body>
          <TokenForm siloId={id} token={token} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
