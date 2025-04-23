import { Tabs } from "@/components/Tabs/Tabs"
import { ConfigurationTab } from "./ConfigurationTab"
import { BrandAssetsTab } from "./BrandAssetsTab"

export const ConfigurationTabs = () => {
  return (
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
  )
}
