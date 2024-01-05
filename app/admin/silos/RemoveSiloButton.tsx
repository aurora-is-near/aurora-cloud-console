"use client"

import { deleteSilo } from "@/actions/admin/silos/delete-silo"
import TableButton from "@/components/TableButton"
import { Silo } from "@/types/types"
import { TrashIcon } from "@heroicons/react/24/outline"

type RemoveSiloButtonProps = {
  silo: Silo
}

export const RemoveSiloButton = async ({ silo }: RemoveSiloButtonProps) => {
  const onClick = () => {
    if (!confirm(`Are you sure you want to delete the silo "${silo.name}"?`)) {
      return
    }

    deleteSilo(silo.id)
    window.location.reload()
  }

  return (
    <TableButton
      Icon={TrashIcon}
      srOnlyText={`Remove ${silo.name}`}
      onClick={onClick}
    />
  )
}
