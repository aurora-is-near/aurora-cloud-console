import { IntegrationsPage } from "@/components/IntegrationsPage/IntegrationsPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => <IntegrationsPage teamKey={teamKey} />

export default Page
