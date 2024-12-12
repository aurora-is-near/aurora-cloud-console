"use client"

import { useRouter } from "next/navigation"
import { DeleteButton } from "@/components/DeleteButton"
import { deleteBlockscoutDatabase } from "@/actions/blockscout-database/delete-blockscout-database"
import { BlockscoutDatabase } from "@/types/types"

type DeleteBlockscoutDatabaseButtonProps = {
  database: BlockscoutDatabase
}

export const DeleteBlockscoutDatabaseButton = ({
  database,
}: DeleteBlockscoutDatabaseButtonProps) => {
  const router = useRouter()

  const onConfirmClick = async () => {
    await deleteBlockscoutDatabase(database.id)
    router.push("/admin/blockscout")
  }

  return (
    <DeleteButton
      title="Delete database"
      description={`Are you sure you want to delete the database "${database.name}"?`}
      onDelete={onConfirmClick}
    />
  )
}
