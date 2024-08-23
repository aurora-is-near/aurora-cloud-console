"use client"

import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Loader from "@/components/Loader"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { SiloHeading } from "@/app/dashboard_v1/[teamKey]/silos/SiloHeading"
import { OracleBanner } from "./OracleBanner"
import { OracleDeployment } from "./OracleDeployment"
import { OracleHighlightCards } from "./OracleHighlightCards"

type OracleContentProps = {
  siloId: number
  teamKey: string
}

export const OracleContent = ({ siloId, teamKey }: OracleContentProps) => {
  const searchParams = useSearchParams()
  const { data: oracle, isPending } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  if (isPending) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  // The `intro` query param is to give us a way to view the initial intro
  // screen after the feature has been enabled.
  const isEnabled = !!oracle && !searchParams.has("intro")

  return (
    <>
      <SiloHeading
        heading="Oracle"
        siloId={siloId}
        showActivatedTag={!!oracle}
      />
      <OracleBanner siloId={siloId} isEnabled={isEnabled} />
      {isEnabled ? (
        <OracleDeployment oracle={oracle} teamKey={teamKey} />
      ) : (
        <OracleHighlightCards />
      )}
    </>
  )
}
