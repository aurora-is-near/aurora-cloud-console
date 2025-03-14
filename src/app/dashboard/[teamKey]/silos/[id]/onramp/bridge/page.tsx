import { BridgePage } from "@/components/BridgePage/BridgePage"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return <BridgePage teamKey={teamKey} siloId={Number(id)} />
}

export default Page
