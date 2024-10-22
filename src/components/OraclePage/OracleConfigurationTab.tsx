"use client"

import {
  ArrowsRightLeftIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import RequestOraclePriceFeedModal from "@/components/OraclePage/RequestOraclePriceFeedModal"
import { TabCard } from "@/components/TabCard/TabCard"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Tag } from "@/components/Tag"

export const OracleConfigurationTab = ({ siloId }: { siloId: number }) => {
  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.RequestOraclePriceFeed)
  }

  const mockPairs = [
    {
      from: "NEAR",
      to: "USDT",
    },
    {
      from: "AURORA",
      to: "USDT",
    },
  ]

  return (
    <TabCard>
      <div className="flex flex-col divide-y gap-5 divide-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Supported price feeds
            </h3>
            <p className="text-slate-500 text-sm">
              We already support some price feeds. You can request custom price
              feeds to your oracle before deployment.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {mockPairs.map((pair) => (
              <div
                key={`${pair.from}-${pair.to}`}
                className="flex justify-between border border-slate-200 rounded-xl p-2"
              >
                <div className="flex flex-row gap-2 justiry-start items-center font-medium uppercase text-slate-900">
                  <span className="text-sm">{pair.from}</span>
                  <ArrowsRightLeftIcon className="w-3 h-3" />
                  <span className="text-sm">{pair.to}</span>
                </div>
                <Tag size="sm" text="Deployed" color="green" Icon={CheckIcon} />
              </div>
            ))}
            <Button variant="grey" onClick={onClick}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Request Price Feed
            </Button>
          </div>
        </div>
      </div>
      <RequestOraclePriceFeedModal siloId={siloId} />
    </TabCard>
  )
}
