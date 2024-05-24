"use client"

import BridgeNetworkModal from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeNetworkModal"
import { BridgeOpenButton } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeOpenButton"
import Card from "@/components/Card"
import { CardConfigRow } from "@/components/CardConfigRow"
import { useBridgeNetworks } from "@/hooks/useBridgeNetworks"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { formatDateAndTime } from "@/utils/helpers"
import { Modals } from "@/utils/modals"
import { useQuery } from "@tanstack/react-query"

type BridgeWidgetCardProps = {
  siloId: number
}

export const BridgeWidgetCard = ({ siloId }: BridgeWidgetCardProps) => {
  const { data: bridge, isPending } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  const { toNetworks, fromNetworks } = useBridgeNetworks(siloId)
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
        <div className="grid grid-cols-3">
          <CardConfigRow
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
          <CardConfigRow
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
          <CardConfigRow
            title="Supported assets"
            content={{
              type: "text",
              value: "No token contracts deployed",
            }}
          />
        </div>
      </Card>
      <BridgeNetworkModal siloId={siloId} type="from" />
      <BridgeNetworkModal siloId={siloId} type="to" />
    </>
  )
}
