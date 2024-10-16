import { BridgePage } from "@/components/BridgePage/BridgePage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return <BridgePage teamKey={teamKey} siloId={Number(id)} />
}

export default Page
