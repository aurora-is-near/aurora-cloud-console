import { OnrampHomePage } from "@/components/OnrampHomePage/OnrampHomePage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => (
  <OnrampHomePage isNotAvailable teamKey={teamKey} />
)

export default Page
