import { notFound } from "next/navigation"
import { DashboardPage } from "@/components/DashboardPage"
import { ConfigurationItemsCard } from "@/app/dashboard/[teamKey]/silos/[id]/configuration/ConfigurationItemsCard"
import { ResolveButton } from "@/app/admin/notifications/ResolveButton"
import { resolveBridgedTokenRequest } from "@/actions/bridged-tokens/resolve-bridged-token-request"
import { getBridgedTokenRequestWithSilo } from "@/actions/bridged-tokens/get-bridged-token-request-with-metadata"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const request = await getBridgedTokenRequestWithSilo(Number(id))

  if (!request) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Notifications", "Bridged tokens", String(id)]}
      actions={
        <ResolveButton
          id={request.id}
          onResolved={resolveBridgedTokenRequest}
        />
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
          {
            term: "Silo",
            description: request.silo.name,
          },
        ]}
      />
    </DashboardPage>
  )
}

export default Page
