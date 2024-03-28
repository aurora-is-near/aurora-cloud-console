"use client"

import { deleteSilo } from "@/actions/silos/delete-silo"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Silo } from "@/types/types"

type RemoveSiloButtonProps = {
  silo: Silo
}

export const RemoveSiloButton = async ({ silo }: RemoveSiloButtonProps) => {
  const onDelete = async () => deleteSilo(silo.id)

  return (
    <TableDeleteButton
      title="Remove silo"
      description={`Are you sure you want to delete the silo "${silo.name}"?`}
      onDelete={onDelete}
    />
  )
}
