import { DashboardPage } from "@/components/DashboardPage"
import OnrampHomePage from "@/components/OnrampPage/OnrampHomePage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  return (
    <DashboardPage>
      <OnrampHomePage teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
