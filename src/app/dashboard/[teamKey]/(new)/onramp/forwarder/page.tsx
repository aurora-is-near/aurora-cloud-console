import { ForwarderPage } from "@/components/ForwarderPage/ForwarderPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  return <ForwarderPage teamKey={teamKey} />
}

export default Page
