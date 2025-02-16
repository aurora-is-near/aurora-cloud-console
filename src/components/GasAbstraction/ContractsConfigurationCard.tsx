"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { RuleSetting } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/RuleSetting"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import CopyButton from "@/components/CopyButton"
import { AddButton } from "@/components/AddButton"
import { Silo } from "@/types/types"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { RuleContext } from "@/providers/RuleProvider"
import { featureFlags } from "@/feature-flags/browser"
import { AddRuleContractModal } from "./AddRuleContractModal"

const ContractsConfigurationCard = ({ silo }: { silo: Silo }) => {
  const { rule, removeRuleContract } = useRequiredContext(RuleContext)

  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.AddRuleContract)
  }

  const disabled = !featureFlags.get("gas_plans_configuration")

  return (
    <div className="flex flex-col gap-2">
      {rule.contracts?.map((contract: string) => (
        <RuleSetting
          key={contract}
          title="Contract"
          description={contract}
          descriptionUrl={
            silo.explorer_url
              ? `${silo.explorer_url}/address/${contract}`
              : undefined
          }
        >
          <div className="flex flex-row gap-x-2">
            <div>
              <CopyButton hasBorder value={contract} size="sm" />
            </div>
            <div>
              <Button
                isSquare
                onClick={() => removeRuleContract(contract)}
                variant="border"
                size="sm"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </RuleSetting>
      ))}
      <AddButton disabled={disabled} text="Add contract" onClick={onClick} />
      <AddRuleContractModal />
    </div>
  )
}

export default ContractsConfigurationCard
