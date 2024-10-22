"use client"

import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Fragment } from "react"
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
    <Card tag="section">
      <Card.Title>Deployed tokens</Card.Title>
      {isPending ? (
        <Card.Row>
          <Loader>
            <div className="h-[42.5px]" />
          </Loader>
        </Card.Row>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {!bridgedTokens?.length ? (
            <Card.Row>
              <span className="text-gray-400 text-sm">No tokens deployed</span>
            </Card.Row>
          ) : (
            <div className="grid grid-cols-3">
              {bridgedTokens.map((token) => {
                const isDeployed = token.bridge?.deploymentStatus === "DEPLOYED"

                return (
                  <Fragment key={token.id}>
                    <Card.Cell className="text-sm font-medium">
                      {token.symbol}
                    </Card.Cell>
                    <Card.Cell
                      className={clsx(
                        "text-sm",
                        isDeployed ? "" : "text-gray-400",
                      )}
                    >
                      {isDeployed ? "" : "Not deployed yet"}
                    </Card.Cell>
                    <Card.Cell className="flex justify-end">
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
                    </Card.Cell>
                  </Fragment>
                )
              })}
            </div>
          )}
        </>
      )}
    </Card>
  )
}
