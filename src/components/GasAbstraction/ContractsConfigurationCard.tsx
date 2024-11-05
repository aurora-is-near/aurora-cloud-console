"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { TrashIcon } from "@heroicons/react/24/outline"
import { RuleSetting } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/[planId]/RuleSetting"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import CopyButton from "@/components/CopyButton"

const ContractsConfigurationCard = () => {
  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.EditContract)
  }

  return (
    <div className="xl:w-1/2 flex flex-col gap-2">
      <RuleSetting
        title="Contract 1"
        description={
          <Link href="#" className="text-cyan-600">
            0x863uu3guiyg8613gf756f76f76t81g3917t
          </Link>
        }
      >
        <div className="flex flex-row gap-x-2">
          <CopyButton value="0x863uu3guiyg8613gf756f76f76t81g3917t" />
          <Button onClick={onClick} variant="border">
            <PencilSquareIcon className="w-4 h-4" />
          </Button>
          <Button variant="border">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </RuleSetting>
    </div>
  )
}

export default ContractsConfigurationCard
