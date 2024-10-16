"use client"

import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Card from "@/components/Card"
import Loader from "@/components/Loader"
import { Tag } from "@/components/Tag"
import { useBridgeTokens } from "@/hooks/useBridgeTokens"

type DeployedTokensCardProps = {
  siloId: number
}

export const DeployedTokensCard = ({ siloId }: DeployedTokensCardProps) => {
  const { pendingTokens, deployedTokens, isPending } = useBridgeTokens(siloId)
  const bridgedTokens = [...deployedTokens, ...pendingTokens]

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
                <Card
                  key={token.id}
                  className={clsx(
                    "p-3 md:p-3",
                    isDeployed ? "ring-1 ring-green-600 md:bg-green-50" : "",
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
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
