import { DashboardPage } from "@/components/DashboardPage"
import { BridgeContent } from "./BridgeContent"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <BridgeContent siloId={Number(id)} />
    </DashboardPage>
  )
}

export default Page
