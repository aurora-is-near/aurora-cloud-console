import { GasAbstractionPage } from "@/components/GasAbstractionPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => <GasAbstractionPage teamKey={teamKey} />

export default Page
