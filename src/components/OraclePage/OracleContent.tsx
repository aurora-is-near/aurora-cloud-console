"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Loader from "@/components/Loader"
import { getQueryFnAndKey } from "@/utils/api/queries"
import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { OracleEnableButton } from "./OracleEnableButton"
import { OracleDeployment } from "./OracleDeployment"
import AboutTab from "./AboutTab"

type OracleContentProps = {
  siloId: number
  teamKey: string
}

export const OracleContent = ({ siloId, teamKey }: OracleContentProps) => {
  const { data: oracle, isPending } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  if (isPending) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  const tabs = [{ title: "About", content: <AboutTab /> }]

  const isEnabled = !!oracle

  if (isEnabled) {
    tabs.push({
      title: "Deployment",
      content: <OracleDeployment oracle={oracle} teamKey={teamKey} />,
    })
  }

  return (
    <div className="flex flex-col gap-10">
      <Hero
        title="Oracle"
        description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
        actions={isEnabled ? null : <OracleEnableButton siloId={siloId} />}
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/oracle.svg"
            alt="Oracle Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/oracle.png"
            alt="Oracle Preview"
          />
        }
      />

      <Tabs tabs={tabs} />
    </div>
  )
}
