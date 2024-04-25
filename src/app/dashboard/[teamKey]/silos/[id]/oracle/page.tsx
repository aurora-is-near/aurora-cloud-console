import { OracleContent } from "./OracleContent"
import { SiloHeading } from "../../SiloHeading"
import ContactModal from "@/components/ContactModal"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DashboardPage>
      <SiloHeading heading="Oracle" siloId={Number(id)} />
      <OracleContent siloId={Number(id)} />
      <ContactModal teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
