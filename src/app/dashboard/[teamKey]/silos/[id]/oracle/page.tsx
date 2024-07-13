import { DashboardPage } from "@/components/DashboardPage"
import { OracleContent } from "./OracleContent"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <OracleContent siloId={Number(id)} />
    </DashboardPage>
  )
}

export default Page
