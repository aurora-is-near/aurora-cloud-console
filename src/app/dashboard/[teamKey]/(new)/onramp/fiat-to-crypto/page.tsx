import { FiatOnrampPage } from "@/components/FiatOnrampPage/FiatOnrampPage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  return <FiatOnrampPage teamKey={teamKey} />
}

export default Page
