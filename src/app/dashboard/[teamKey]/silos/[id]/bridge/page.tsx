import { BridgeContent } from "./BridgeContent"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <BridgeContent siloId={Number(id)} />
    </DashboardPage>
  )
}

export default Page
