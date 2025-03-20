"use client"

import { useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { Deal, Limit } from "@/types/types"
import { LimitsModal } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/LimitsModal"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DealDurationSetting } from "./DealDurationSetting"
import { DealDurationModal } from "./DealDurationModal"
import { RuleSetting } from "./RuleSetting"

export const RulesCard = ({
  deal,
  limits,
}: {
  deal: Deal
  limits: Limit[]
}) => {
  const [selectedLimit, setSelectedLimit] = useState<Limit>(limits[0])
  const { openModal } = useModals()

  const openLimitEditModal = (limit: Limit) => {
    setSelectedLimit(limit)
    openModal(Modals.EditPlanLimitsModal)
  }

  return (
    <>
      <ConfigurationCard
        title="Define rules"
        description="Define specifics about this gas plan."
      >
        <div className="flex flex-col gap-y-2.5 w-full">
          <DealDurationSetting deal={deal} />
          <RuleSetting
            title="Total transactions limit"
            description={
              limits[0].limit_value === null
                ? "No limit"
                : limits[0].limit_value.toString()
            }
          >
            <Button
              variant="border"
              onClick={() => openLimitEditModal(limits[0])}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </RuleSetting>
          <RuleSetting
            title="Monthly limit, per user"
            description={
              limits[1].limit_value === null
                ? "No limit"
                : limits[1].limit_value.toString()
            }
          >
            <Button
              variant="border"
              onClick={() => openLimitEditModal(limits[1])}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </RuleSetting>
        </div>
      </ConfigurationCard>
      <LimitsModal deal={deal} limit={selectedLimit} />
      <DealDurationModal deal={deal} />
    </>
  )
}
