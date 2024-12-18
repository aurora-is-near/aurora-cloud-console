"use client"

import { deleteBlockscoutDatabase } from "@/actions/blockscout-database/delete-blockscout-database"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { BlockscoutDatabase } from "@/types/types"

type DeleteDatabaseTableButtonProps = {
  database: BlockscoutDatabase
}

export const DeleteDatabaseTableButton = async ({
  database,
}: DeleteDatabaseTableButtonProps) => {
  const onDelete = async () => deleteBlockscoutDatabase(database.id)

  return (
    <TableDeleteButton
      title="Delete database"
      description={`Are you sure you want to delete the database "${database.name}"?`}
      onDelete={onDelete}
    />
  )
}
