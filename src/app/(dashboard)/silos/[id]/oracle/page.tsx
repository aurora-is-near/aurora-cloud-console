import { OracleContent } from "./OracleContent"
import { SiloHeading } from "../../SiloHeading"
import ContactModal from "@/components/ContactModal"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <SiloHeading heading="Oracle" siloId={Number(id)} />
      <OracleContent siloId={Number(id)} />
      <ContactModal />
    </DashboardPage>
  )
}

export default Page
