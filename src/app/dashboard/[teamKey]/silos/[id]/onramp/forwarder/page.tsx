import { ForwarderPage } from "@/components/ForwarderPage/ForwarderPage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return <ForwarderPage teamKey={teamKey} siloId={Number(id)} />
}

export default Page
