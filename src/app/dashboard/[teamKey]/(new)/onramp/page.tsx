import { OnrampHomePage } from "@/components/OnrampHomePage/OnrampHomePage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => (
  <OnrampHomePage teamKey={teamKey} />
)

export default Page
