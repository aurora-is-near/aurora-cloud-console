import { DashboardPage } from "@/components/DashboardPage"
import { OracleContent } from "@/components/OraclePage/OracleContent"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DashboardPage>
      <OracleContent siloId={Number(id)} teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
