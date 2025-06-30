import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getIntegrationRequest } from "@/actions/integration-requests/get-integration-request"
import { IntegrationRequestForm } from "./IntegrationRequestForm"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const integrationRequest = await getIntegrationRequest(id)

  if (!integrationRequest) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Integration Requests", integrationRequest.id.toString()]}
    >
      <Card>
        <Card.Title tag="h3">Database details</Card.Title>
        <Card.Body>
          <IntegrationRequestForm integrationRequest={integrationRequest} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
