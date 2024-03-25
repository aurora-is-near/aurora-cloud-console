"use client"

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
  const { data: oracle, isLoading } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  if (!oracle) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  return (
    <>
      <OracleBanner
        siloId={siloId}
        isEnabled={oracle.enabled}
        isDeployed={!!oracle.deployedAt}
      />
      {oracle.enabled ? <OracleDeploymentSteps /> : <OracleHighlightCards />}
    </>
  )
}
