"use client"

import Card from "@/components/Card"
import { AddButton } from "@/components/AddButton"
import { useBridgedTokens } from "@/hooks/useBridgedTokens"
import DeployedTokensForm from "@/components/BridgeWidgetPage/DeployedTokensForm"
import { Skeleton } from "@/uikit"
import { useWidget } from "@/hooks/useWidget"
import { BridgedTokensModal } from "@/components/BridgeWidgetPage/BridgedTokensModal"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

type DeployedTokensCardProps = {
  siloId: number
}

export const DeployedTokensCard = ({ siloId }: DeployedTokensCardProps) => {
  const { bridgedSiloTokens, bridgedSiloTokenRequests, isPending } =
    useBridgedTokens(siloId)

  const widget = useWidget(siloId)
  const { openModal } = useModals()

  return (
    <>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Supported assets
            </h3>
            <p className="text-slate-500 text-sm">
              Choose the assets that will be supported in your widget.
            </p>
            <p className="text-slate-500 text-sm">
              To be available in the widget, the token must be deployed on your
              virtual chain. If a token isn’t deployed yet, simply request
              deployment through the “Add asset” button, and our team will
              handle it for you.
            </p>
          </div>
          {isPending ? (
            <Skeleton className="h-[42.5px]" />
          ) : (
            <div className="flex flex-col gap-2">
              <DeployedTokensForm
                siloId={siloId}
                bridgedSiloTokens={bridgedSiloTokens}
                bridgedSiloTokenRequests={bridgedSiloTokenRequests}
                activeTokenIds={widget?.tokens ?? []}
              />

              <AddButton
                text="Add asset"
                onClick={() => {
                  openModal(Modals.BridgedTokens)
                }}
              />
            </div>
          )}
        </div>
      </Card>
      <BridgedTokensModal siloId={siloId} />
    </>
  )
}
