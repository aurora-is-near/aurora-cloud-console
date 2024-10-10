import { DashboardPage } from "@/components/DashboardPage"
import OnrampHomePage from "../../../../../../components/OnrampPage/OnrampHomePage"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DashboardPage>
      <OnrampHomePage siloId={id} teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
