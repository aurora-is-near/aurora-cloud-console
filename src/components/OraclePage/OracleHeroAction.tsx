"use client"

import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { OracleEnableButton } from "@/components/OraclePage/OracleEnableButton"

const OracleHeroActions = ({ siloId }: { siloId: number }) => {
  const { data: oracle, isPending } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  return oracle ?? isPending ? null : <OracleEnableButton siloId={siloId} />
}

export default OracleHeroActions
