import { DashboardPage } from "@/components/DashboardPage"
import OraclePage from "@/components/OraclePage/OraclePage"

const Page = ({ params }: { params: { teamKey: string } }) => {
  return (
    <DashboardPage>
      <OraclePage teamKey={params.teamKey} />
    </DashboardPage>
  )
}

export default Page
