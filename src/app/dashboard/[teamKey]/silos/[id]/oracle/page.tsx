import { DashboardPage } from "@/components/DashboardPage"
import OraclePage from "@/components/OraclePage/OraclePage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DashboardPage>
      <OraclePage siloId={Number(id)} teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
