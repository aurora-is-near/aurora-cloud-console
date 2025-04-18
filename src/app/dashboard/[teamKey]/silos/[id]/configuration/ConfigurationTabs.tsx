"use client"

import { Tabs } from "@/components/Tabs/Tabs"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { SiloContext } from "@/providers/SiloProvider"
import { AddSiloToMetaMaskButton } from "./AddSiloToMetaMaskButton"
import { ConfigurationTab } from "./ConfigurationTab"
import { BrandAssetsTab } from "./BrandAssetsTab"

export const ConfigurationTabs = () => {
  const { silo } = useRequiredContext(SiloContext)

  return (
    <Tabs
      action={<AddSiloToMetaMaskButton silo={silo} />}
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
