"use client"

import { useSearchParams } from "next/navigation"
import { OracleBanner } from "./OracleBanner"
import { OracleDeploymentSteps } from "./OracleDeploymentSteps"
import { OracleHighlightCards } from "./OracleHighlightCards"
import Loader from "@/components/Loader"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

type OracleContentProps = {
  siloId: number
}

export const OracleContent = ({ siloId }: OracleContentProps) => {
  const searchParams = useSearchParams()
  const { data: oracle } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  if (!oracle) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  // The `intro` query param is to give us a way to view the initial intro
  // screen after the feature has been enabled.
  const isEnabled = oracle.enabled && !searchParams.has("intro")

  return (
    <>
      <OracleBanner siloId={siloId} isEnabled={isEnabled} />
      {isEnabled ? <OracleDeploymentSteps /> : <OracleHighlightCards />}
    </>
  )
}
