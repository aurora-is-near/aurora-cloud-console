import { IntegrationsPage } from "@/components/IntegrationsPage/IntegrationsPage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => (
  <IntegrationsPage teamKey={teamKey} />
)

export default Page
