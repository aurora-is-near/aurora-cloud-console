"use client"

import Card from "@/components/Card"
import { useWidgetNetworks } from "@/hooks/useWidgetNetworks"
import NetworksForm from "./NetworksForm"

type NetworksCardProps = {
  siloId: number
}

export const NetworksCard = ({ siloId }: NetworksCardProps) => {
  const { toNetworks, fromNetworks, availableNetworks } =
    useWidgetNetworks(siloId)

  return (
    <Card>
      <div className="flex flex-col divide-y gap-5 divide-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Origin networks
            </h3>
            <p className="text-slate-500 text-sm">
              Choose the networks from which users can bridge their assets.
            </p>
          </div>
          <NetworksForm
            siloId={siloId}
            type="from"
            networks={fromNetworks}
            availableNetworks={availableNetworks}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Destination networks
            </h3>
            <p className="text-slate-500 text-sm">
              Choose the networks to which users can bridge their assets.
            </p>
          </div>
          <NetworksForm
            siloId={siloId}
            type="to"
            networks={toNetworks}
            availableNetworks={availableNetworks}
          />
        </div>
      </div>
    </Card>
  )
}
