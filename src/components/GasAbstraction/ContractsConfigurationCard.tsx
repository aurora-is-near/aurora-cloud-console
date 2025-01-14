"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
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

const ContractsConfigurationCard = ({ silo }: { silo: Silo }) => {
  const { rule } = useRequiredContext(RuleContext)

  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.AddRuleContract)
  }

  const removeAddress = async (_address: string) => {
    if (rule) {
      // Delete contract from resource_definition
    }
  }

  return (
    <div className="xl:w-1/2 flex flex-col gap-2">
      {rule.resource_definition?.contracts?.map((contract: string) => (
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
              <Button isSquare onClick={onClick} variant="border" size="sm">
                <PencilSquareIcon className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <Button
                isSquare
                onClick={() => removeAddress(contract)}
                variant="border"
                size="sm"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </RuleSetting>
      ))}
      <AddButton text="Add contract" onClick={onClick} />
    </div>
  )
}

export default ContractsConfigurationCard
