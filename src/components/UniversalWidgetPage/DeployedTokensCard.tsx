"use client"

import { useState } from "react"
import Card from "@/components/Card"
import { TokensCard } from "@/components/UniversalWidgetPage/TokensCard"
import { AddButton } from "@/components/AddButton"
import { useBridgedTokens } from "@/hooks/useBridgedTokens"
import DeployedTokensForm from "@/components/UniversalWidgetPage/DeployedTokensForm"
import { Skeleton } from "@/uikit"
import { useWidgetTokens } from "@/hooks/useWidgetTokens"

type DeployedTokensCardProps = {
  siloId: number
}

export const DeployedTokensCard = ({ siloId }: DeployedTokensCardProps) => {
  const { bridgedSiloTokens, isPending } = useBridgedTokens(siloId)
  const activeTokenIds = useWidgetTokens(siloId)
  const [isAddingNewAsset, setIsAddingNewAsset] = useState(false)

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-900">Supported assets</h3>
          <p className="text-slate-500 text-sm">
            Choose the assets that will be supported in your widget.
          </p>
          <p className="text-slate-500 text-sm">
            To be available in the widget, the token must be deployed on your
            virtual chain. If a token isn’t deployed yet, simply request
            deployment through the “Add asset” button, and our team will handle
            it for you.
          </p>
        </div>
        {isPending ? (
          <Skeleton className="h-[42.5px]" />
        ) : (
          <div className="flex flex-col gap-2">
            <DeployedTokensForm
              siloId={siloId}
              bridgedSiloTokens={bridgedSiloTokens}
              activeTokenIds={activeTokenIds}
            />

            <AddButton
              hideIcon={isAddingNewAsset}
              text={isAddingNewAsset ? "Cancel" : "Add asset"}
              onClick={() => {
                setIsAddingNewAsset(!isAddingNewAsset)
              }}
            />
          </div>
        )}
      </div>
      {isAddingNewAsset && (
        <div className="mt-5">
          <TokensCard siloId={siloId} />
        </div>
      )}
    </Card>
  )
}
