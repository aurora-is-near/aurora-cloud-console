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
import { AddRuleContractModal } from "./AddRuleContractModal"

const ContractsConfigurationCard = ({
  silo,
  disabled,
}: {
  silo: Silo
  disabled: boolean
}) => {
  const { resourceDefinition, removeRuleContract } =
    useRequiredContext(RuleContext)

  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.AddRuleContract)
  }

  return (
    <div className="xl:w-1/2 flex flex-col gap-2">
      {resourceDefinition?.contracts?.map((contract: string) => (
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
