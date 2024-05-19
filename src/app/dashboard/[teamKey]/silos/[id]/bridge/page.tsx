import { BridgeContent } from "./BridgeContent"
import { SiloHeading } from "../../SiloHeading"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <SiloHeading heading="Bridge" siloId={Number(id)} />
      <BridgeContent siloId={Number(id)} />
    </DashboardPage>
  )
}

export default Page
