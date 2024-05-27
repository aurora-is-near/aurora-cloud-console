import { getToken } from "@/actions/tokens/get-token"
import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { TokenForm } from "../../TokenForm"
import { DashboardPage } from "@/components/DashboardPage"
import { getSilo } from "@/actions/silos/get-silo"
import { DeleteTokenButton } from "@/app/dashboard/[teamKey]/admin/silos/edit/[id]/tokens/edit/[tokenId]/DeleteTokenButton"

const Page = async ({
  params: { id, tokenId, teamKey },
}: {
  params: { id: number; tokenId: number; teamKey: string }
}) => {
  const [token, silo] = await Promise.all([getToken(tokenId), getSilo(id)])

  if (!token || !silo) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Silos", silo.name, token.symbol]}
      actions={
        <DeleteTokenButton token={token} siloId={silo.id} teamKey={teamKey} />
      }
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
