import { DashboardPage } from "@/components/DashboardPage"
import { MetaMaskNotInstalledModal } from "@/components/MetaMaskNotInstalledModal"
import { ConfigurationTabs } from "./ConfigurationTabs"

const Page = () => {
  return (
    <>
      <DashboardPage heading="Chain settings">
        <ConfigurationTabs />
      </DashboardPage>
      <MetaMaskNotInstalledModal />
    </>
  )
}

export default Page
