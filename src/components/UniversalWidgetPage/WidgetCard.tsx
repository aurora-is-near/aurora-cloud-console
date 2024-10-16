"use client"

import { useQuery } from "@tanstack/react-query"
import Card from "@/components/Card"
import { CardConfigGrid } from "@/components/CardConfigGrid"
import { useBridgeNetworks } from "@/hooks/useBridgeNetworks"
import { useBridgeTokens } from "@/hooks/useBridgeTokens"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { formatDateAndTime } from "@/utils/helpers"
import { Modals } from "@/utils/modals"
import { UniversalWidgetOpenButton } from "@/components/UniversalWidgetPage/UniversalWidgetOpenButton"
import BridgeNetworkModal from "@/components/UniversalWidgetPage/BridgeNetworkModal"
import BridgeTokensModal from "@/components/UniversalWidgetPage/TokensModal"

type WidgetCardProps = {
  siloId: number
}

export const WidgetCard = ({ siloId }: WidgetCardProps) => {
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
          <UniversalWidgetOpenButton siloId={siloId} />
        </Card.Actions>
        <CardConfigGrid>
          <CardConfigGrid.Row
            title="Origin networks"
            modalKey={Modals.BridgeFromNetwork}
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
            modalKey={Modals.BridgeToNetwork}
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
            modalKey={Modals.BridgeTokens}
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
