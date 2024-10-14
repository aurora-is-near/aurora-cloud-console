"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { getQueryFnAndKey } from "@/utils/api/queries"
import Loader from "@/components/Loader"
import BridgeConfigurationTab from "@/components/BridgePage/BridgeConfigurationTab"
import { BridgeEnableButton } from "@/components/BridgePage/BridgeEnableButton"
import { BridgeEmbedCodeCard } from "@/components/BridgePage/BridgeEmbedCodeCard"

interface UniversalWidgetPageProps {
  siloId: number
}

export const UniversalWidgetPage: React.FC<UniversalWidgetPageProps> = ({
  siloId,
}) => {
  const { data: bridge } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  if (!bridge) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  const isEnabled = bridge.enabled

  return (
    <DashboardPage>
      <Hero
        title="Universal Widget"
        description="Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/universal-widget.svg"
            alt="Universal Widget Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/universal_widget.png"
            alt="Universal Widget Preview"
          />
        }
        actions={isEnabled ? null : <BridgeEnableButton siloId={siloId} />}
      />

      <Tabs
        tabs={[
          {
            title: "Configuration",
            content: <BridgeConfigurationTab siloId={siloId} />,
          },
          {
            title: "Embed Code",
            content: <BridgeEmbedCodeCard />,
          },
        ]}
      />
    </DashboardPage>
  )
}
