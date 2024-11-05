import { IntegrationsPage } from "@/components/IntegrationsPage/IntegrationsPage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => <IntegrationsPage teamKey={teamKey} siloId={Number(id)} />

export default Page
