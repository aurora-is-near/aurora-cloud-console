import { notFound } from "next/navigation"
import { DashboardPage } from "@/components/DashboardPage"
import { getBridgedTokenRequest } from "@/actions/bridged-tokens/get-bridged-token-request"
import { ConfigurationItemsCard } from "@/app/dashboard/[teamKey]/silos/[id]/configuration/ConfigurationItemsCard"
import { ResolveButton } from "@/app/admin/requests/ResolveButton"
import { deleteBridgedTokenRequest } from "@/actions/bridged-tokens/delete-bridged-token-request"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [request] = await Promise.all([getBridgedTokenRequest(Number(id))])

  if (!request) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Requests", "Bridged tokens", String(id)]}
      actions={
        <ResolveButton id={request.id} onResolved={deleteBridgedTokenRequest} />
      }
    >
      <ConfigurationItemsCard
        title="Request details"
        description="The details provided in the request."
        items={[
          {
            term: "Symbol",
            description: request.symbol,
          },
          {
            term: "Address",
            description: request.address,
          },
        ]}
      />
    </DashboardPage>
  )
}

export default Page
