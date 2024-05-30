import { OracleContent } from "./OracleContent"
import { SiloHeading } from "../../SiloHeading"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DashboardPage>
      <OracleContent siloId={Number(id)} />
    </DashboardPage>
  )
}

export default Page
