"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { RuleSetting } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/RuleSetting"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import CopyButton from "@/components/CopyButton"
import { AddButton } from "@/components/AddButton"
import { FilterEntry, Silo } from "@/types/types"
import { FilterUpdateContext } from "@/providers/FilterProvider"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { deleteFilterEntry } from "@/actions/filter-entries/delete-filter-entry"

type ContractsConfigurationCardProps = {
  silo: Silo
}

const ContractsConfigurationCard = ({
  silo,
}: ContractsConfigurationCardProps) => {
  const { filter, filterEntries } = useRequiredContext(FilterUpdateContext)

  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.AddFilterContract)
  }

  const removeAddress = async (filterEntry: FilterEntry) => {
    if (filter && filterEntry) {
      await deleteFilterEntry(filter.id, filterEntry.id)
    }
  }

  return (
    <div className="xl:w-1/2 flex flex-col gap-2">
      {filterEntries.map((contract) => (
        <RuleSetting
          key={contract.value}
          title="Contract"
          description={contract.value}
          descriptionUrl={
            silo.explorer_url
              ? `${silo.explorer_url}/address/${contract.value}`
              : undefined
          }
        >
          <div className="flex flex-row gap-x-2">
            <div>
              <CopyButton hasBorder value={contract.value} size="sm" />
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
