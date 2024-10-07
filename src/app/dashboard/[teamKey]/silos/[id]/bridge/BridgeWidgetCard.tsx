"use client"

import { useQuery } from "@tanstack/react-query"
import BridgeNetworkModal from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeNetworkModal"
import { BridgeOpenButton } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeOpenButton"
import BridgeTokensModal from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeTokensModal"
import Card from "@/components/Card"
import { CardConfigGrid } from "@/components/CardConfigGrid"
import { useBridgeNetworks } from "@/hooks/useBridgeNetworks"
import { useBridgeTokens } from "@/hooks/useBridgeTokens"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { formatDateAndTime } from "@/utils/helpers"

type BridgeWidgetCardProps = {
  siloId: number
}

export const BridgeWidgetCard = ({ siloId }: BridgeWidgetCardProps) => {
  const { data: bridge } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  const { deployedTokens, activeTokens } = useBridgeTokens(siloId)
  const { toNetworks, fromNetworks, availableNetworks } =
    useBridgeNetworks(siloId)

  const toNetworkLabels = Object.values(toNetworks).map(
    (network) => network.label,
  )

  const fromNetworkLabels = Object.values(fromNetworks).map(
    (network) => network.label,
  )

  return (
    <>
      <Card tag="section">
        <Card.Title>Widget</Card.Title>
        <Card.Subtitle>
          Last update:{" "}
          {bridge?.updatedAt ? formatDateAndTime(bridge.updatedAt) : ""}
        </Card.Subtitle>
        <Card.Actions>
          <BridgeOpenButton siloId={siloId} />
        </Card.Actions>
        <CardConfigGrid>
          <CardConfigGrid.Row
            title="Origin networks"
            modalKey="BridgeFromNetwork"
            content={
              fromNetworkLabels.length
                ? {
                    type: "labels",
                    value: fromNetworkLabels,
                  }
                : {
                    type: "text",
                    value: "No networks selected",
                  }
            }
          />
          <CardConfigGrid.Row
            title="Destination networks"
            modalKey="BridgeToNetwork"
            content={
              toNetworkLabels.length
                ? {
                    type: "labels",
                    value: toNetworkLabels,
                  }
                : {
                    type: "text",
                    value: "No networks selected",
                  }
            }
          />
          <CardConfigGrid.Row
            title="Supported assets"
            modalKey="BridgeTokens"
            content={
              activeTokens.length
                ? {
                    type: "labels",
                    value: activeTokens.map((token) => token.symbol),
                  }
                : {
                    type: "text",
                    value: "No token contracts deployed",
                  }
            }
          />
        </CardConfigGrid>
      </Card>
      <BridgeNetworkModal
        siloId={siloId}
        type="from"
        networks={fromNetworks}
        availableNetworks={availableNetworks}
      />
      <BridgeNetworkModal
        siloId={siloId}
        type="to"
        networks={toNetworks}
        availableNetworks={availableNetworks}
      />
      <BridgeTokensModal
        siloId={siloId}
        deployedTokens={deployedTokens}
        activeTokens={activeTokens}
      />
    </>
  )
}
