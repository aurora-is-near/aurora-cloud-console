"use client"

import { useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { Deal, Limit, LimitScope } from "@/types/types"
import {
  defaultLimits,
  LimitsModal,
} from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/LimitsModal"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DealDurationSetting } from "./DealDurationSetting"
import { DealDurationModal } from "./DealDurationModal"
import { RuleSetting } from "./RuleSetting"

export const RulesCard = ({
  deal,
  limitScopes,
  limits,
}: {
  deal: Deal
  limitScopes: LimitScope[]
  limits: Limit[]
}) => {
  const [selectedLimitScope, setSelectedLimitScope] = useState<LimitScope>(
    limitScopes[0],
  )

  const { openModal } = useModals()

  const openLimitEditModal = (limitScope: LimitScope) => {
    setSelectedLimitScope(limitScope)
    openModal(Modals.EditPlanLimitsModal)
  }

  const globalLimit =
    limits.find((l) => l.limit_scope === limitScopes[0]) ??
    defaultLimits[limitScopes[0]]

  const userLimit =
    limits.find((l) => l.limit_scope === limitScopes[1]) ??
    defaultLimits[limitScopes[1]]

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
              globalLimit.limit_value === null
                ? "No limit"
                : globalLimit.limit_value.toString()
            }
          >
            <Button
              variant="border"
              onClick={() => openLimitEditModal(limitScopes[0])}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </RuleSetting>
          <RuleSetting
            title="Monthly limit, per user"
            description={
              userLimit.limit_value === null
                ? "No limit"
                : userLimit.limit_value.toString()
            }
          >
            <Button
              variant="border"
              onClick={() => openLimitEditModal(limitScopes[1])}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </RuleSetting>
        </div>
      </ConfigurationCard>
      <LimitsModal
        deal={deal}
        limitScope={selectedLimitScope}
        limits={limits}
      />
      <DealDurationModal deal={deal} />
    </>
  )
}
