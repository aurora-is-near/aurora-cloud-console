"use client"

import { deleteSilo } from "@/actions/silos/delete-silo"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Silo } from "@/types/types"

type DeleteSiloTableButtonProps = {
  silo: Silo
}

export const DeleteSiloTableButton = async ({
  silo,
}: DeleteSiloTableButtonProps) => {
  const onDelete = async () => deleteSilo(silo.id)

  return (
    <TableDeleteButton
      title="Delete silo"
      description={`Are you sure you want to delete the silo "${silo.name}"?`}
      onDelete={onDelete}
    />
  )
}
