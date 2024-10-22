"use client"

import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useState } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"
import Card from "@/components/Card"
import Loader from "@/components/Loader"
import { Tag } from "@/components/Tag"
import { useBridgeTokens } from "@/hooks/useBridgeTokens"
import { Button } from "@/components/Button"
import { TokensCard } from "@/components/UniversalWidgetPage/TokensCard"
import { AddButton } from "@/components/AddButton"

type DeployedTokensCardProps = {
  siloId: number
}

export const DeployedTokensCard = ({ siloId }: DeployedTokensCardProps) => {
  const { pendingTokens, deployedTokens, isPending } = useBridgeTokens(siloId)
  const bridgedTokens = [...deployedTokens, ...pendingTokens]
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
          <Loader>
            <div className="h-[42.5px]" />
          </Loader>
        ) : (
          <div className="flex flex-col gap-2">
            {bridgedTokens.map((token) => {
              const isDeployed = token.bridge?.deploymentStatus === "DEPLOYED"

              return (
                <div
                  key={token.id}
                  className={clsx(
                    "rounded-md ring-1 p-3",
                    isDeployed
                      ? "ring-green-600 bg-green-50"
                      : "ring-slate-200",
                  )}
                >
                  <div className="flex flex-row justify-between">
                    <span className="text-sm font-medium">{token.symbol}</span>
                    <span className="flex justify-end">
                      {isDeployed ? (
                        <Tag
                          size="sm"
                          color="green"
                          text="Deployed"
                          Icon={CheckIcon}
                        />
                      ) : (
                        <Tag
                          size="sm"
                          color="orange"
                          text="Pending"
                          Icon={ClockIcon}
                        />
                      )}
                    </span>
                  </div>
                </div>
              )
            })}

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
