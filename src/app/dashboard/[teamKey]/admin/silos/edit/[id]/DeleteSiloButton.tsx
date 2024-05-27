"use client"

import { deleteSilo } from "@/actions/silos/delete-silo"
import { DeleteButton } from "@/components/DeleteButton"
import { Silo } from "@/types/types"
import { useRouter } from "next/navigation"

type DeleteSiloButtonProps = {
  teamKey: string
  silo: Silo
}

export const DeleteSiloButton = ({ teamKey, silo }: DeleteSiloButtonProps) => {
  const router = useRouter()

  const onConfirmClick = async () => {
    await deleteSilo(silo.id)
    router.push(`/dashboard/${teamKey}/admin/silos`)
  }

  return (
    <DeleteButton
      title="Delete silo"
      description={`Are you sure you want to delete the silo "${silo.name}"?`}
      onDelete={onConfirmClick}
    />
  )
}
