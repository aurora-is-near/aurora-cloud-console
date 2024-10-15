import { FiatOnrampPage } from "@/components/FiatOnrampPage/FiatOnrampPage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return <FiatOnrampPage teamKey={teamKey} siloId={Number(id)} />
}

export default Page
