import { OracleContent } from "./OracleContent"
import { SiloHeading } from "../../SiloHeading"
import ContactModal from "@/components/ContactModal"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <SiloHeading heading="Oracle" siloId={Number(id)} />
      <div className="space-y-6">
        <OracleContent siloId={Number(id)} />
      </div>
      <ContactModal />
    </DashboardPage>
  )
}

export default Page
