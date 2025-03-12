import { BridgePage } from "@/components/BridgePage/BridgePage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  return <BridgePage teamKey={teamKey} />
}

export default Page
