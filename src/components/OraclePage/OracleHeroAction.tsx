"use client"

import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { OracleRequestDeploymentButton } from "@/components/OraclePage/OracleRequestDeploymentButton"

const OracleHeroActions = ({ siloId }: { siloId: number }) => {
  const { data: oracle, isPending } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  return oracle ?? isPending ? null : (
    <OracleRequestDeploymentButton siloId={siloId} />
  )
}

export default OracleHeroActions
