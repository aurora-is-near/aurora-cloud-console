"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { TrashIcon } from "@heroicons/react/24/outline"
import { RuleSetting } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/RuleSetting"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import CopyButton from "@/components/CopyButton"
import { AddButton } from "@/components/AddButton"
import { AuroraOracleContract } from "@/types/aurora-oracle-api"

const ContractsConfigurationCard = () => {
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
          description={
            <Link href="#" className="text-cyan-600">
              <span>{contract.address}</span>
            </Link>
          }
        >
          <div className="flex flex-row gap-x-2">
            <CopyButton disabled value="-" />
            <Button disabled onClick={onClick} variant="border">
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
            <Button disabled variant="border">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </RuleSetting>
      ))}
      <AddButton disabled text="Add contract" onClick={onClick} />
    </div>
  )
}

export default ContractsConfigurationCard
