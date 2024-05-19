"use client"

import { useSearchParams } from "next/navigation"
import { BridgeBanner } from "./BridgeBanner"
import { BridgeDeploymentSteps } from "./BridgeDeploymentSteps"
import { BridgeHighlightCards } from "./BridgeHighlightCards"
import Loader from "@/components/Loader"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

type BridgeContentProps = {
  siloId: number
}

export const BridgeContent = ({ siloId }: BridgeContentProps) => {
  const searchParams = useSearchParams()
  const { data: oracle } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
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
      <BridgeBanner siloId={siloId} isEnabled={isEnabled} />
      {isEnabled ? <BridgeDeploymentSteps /> : <BridgeHighlightCards />}
    </>
  )
}
