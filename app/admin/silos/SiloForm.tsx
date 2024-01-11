"use client"

import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/admin/silos/update-silo"
import { createSilo } from "@/actions/admin/silos/create-silo"
import { AdminForm } from "@/components/AdminForm"

type SiloFormProps = {
  silo?: Silo
}

export const SiloForm = ({ silo }: SiloFormProps) => {
  return (
    <AdminForm
      item={silo}
      updateItem={updateSilo}
      createItem={createSilo}
      href="/admin/silos"
      inputs={[
        {
          name: "name",
          label: "Name",
          defaultValue: silo?.name ?? "",
          autoComplete: "name",
          required: true,
        },
        {
          name: "chain_id",
          label: "Chain ID",
          defaultValue: silo?.chain_id ?? "",
          autoComplete: "chain_id",
          required: true,
        },
      ]}
    />
  )
}
