"use client"

import { BridgeOpenButton } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeOpenButton"
import Card from "@/components/Card"
import { CardConfigRow } from "@/components/CardConfigRow"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { formatDateAndTime } from "@/utils/helpers"
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

  console.log(bridge)

  return (
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
          content={{
            type: "labels",
            value: ["Aurora", "Ethereum", "Near", "Your Chain"],
          }}
          modalConfig={{
            showEditButton: true,
          }}
        />
        <CardConfigRow
          title="Destination networks"
          content={{
            type: "labels",
            value: ["Aurora"],
          }}
          modalConfig={{
            showEditButton: true,
          }}
        />
        <CardConfigRow
          title="Supported assets"
          content={{
            type: "text",
            value: "No token contracts deployed",
          }}
          modalConfig={{
            showEditButton: true,
          }}
        />
      </div>
    </Card>
  )
}
