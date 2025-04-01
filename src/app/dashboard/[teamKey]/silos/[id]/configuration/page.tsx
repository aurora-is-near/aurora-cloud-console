import { DashboardPage } from "@/components/DashboardPage"
import { Tabs } from "@/components/Tabs/Tabs"
import { ConfigurationTab } from "./ConfigurationTab"
import { BrandAssetsTab } from "./BrandAssetsTab"

const Page = () => {
  return (
    <DashboardPage heading="Chain settings">
      <Tabs
        tabs={[
          {
            title: "Configuration",
            content: <ConfigurationTab />,
          },
          {
            title: "Brand assets",
            content: <BrandAssetsTab />,
          },
        ]}
      />
    </DashboardPage>
  )
}

export default Page
