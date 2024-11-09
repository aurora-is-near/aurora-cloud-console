"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { RuleSetting } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/RuleSetting"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import CopyButton from "@/components/CopyButton"
import { AddButton } from "@/components/AddButton"
import { AuroraOracleContract } from "@/types/aurora-oracle-api"
import { Silo } from "@/types/types"

type ContractsConfigurationCardProps = {
  silo: Silo
}

const ContractsConfigurationCard = ({
  silo,
}: ContractsConfigurationCardProps) => {
  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.EditContract)
  }

  const contracts: AuroraOracleContract[] = []

  return (
    <div className="xl:w-1/2 flex flex-col gap-2">
      {contracts.map((contract) => (
        <RuleSetting
          key={contract.address}
          title={contract.name}
          description={contract.address}
          descriptionUrl={
            silo.explorer_url
              ? `${silo.explorer_url}/address/${contract.address}`
              : undefined
          }
        >
          <div className="flex flex-row gap-x-2">
            <div>
              <CopyButton hasBorder value={contract.address} size="sm" />
            </div>
            <div>
              <Button
                isSquare
                disabled
                onClick={onClick}
                variant="border"
                size="sm"
              >
                <PencilSquareIcon className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <Button isSquare disabled variant="border" size="sm">
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </RuleSetting>
      ))}
      <AddButton disabled text="Add contract" onClick={onClick} />
    </div>
  )
}

export default ContractsConfigurationCard
