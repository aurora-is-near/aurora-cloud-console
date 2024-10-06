"use client"

import { useQuery } from "@tanstack/react-query"
import Loader from "@/components/Loader"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { BridgeBanner } from "./BridgeBanner"
import { BridgeConfiguration } from "./BridgeConfiguration"
import { BridgeHighlightCards } from "./BridgeHighlightCards"
import { SiloHeading } from "../../SiloHeading"

type BridgeContentProps = {
  siloId: number
}

export const BridgeContent = ({ siloId }: BridgeContentProps) => {
  const { data: bridge } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  if (!bridge) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  // The `intro` query param is to give us a way to view the initial intro
  // screen after the feature has been enabled.
  const isEnabled = bridge.enabled

  return (
    <>
      <SiloHeading
        heading="Bridge"
        siloId={siloId}
        showActivatedTag={bridge.enabled}
      />
      <BridgeBanner siloId={siloId} isEnabled={isEnabled} />
      {isEnabled ? (
        <BridgeConfiguration siloId={siloId} />
      ) : (
        <BridgeHighlightCards />
      )}
    </>
  )
}
