"use client"

import { SubmitHandler } from "react-hook-form"
import { sentenceCase } from "change-case"
import { usePathname } from "next/navigation"
import { BlockscoutDatabase } from "@/types/types"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"
import { createBlockscoutDatabase } from "@/actions/blockscout-database/create-blockscout-database"
import { updateBlockscoutDatabase } from "@/actions/blockscout-database/update-blockscout-database"

type BlockscoutDatabaseFormProps = {
  database?: BlockscoutDatabase
}

const INPUTS = ["name", "database", "host", "port", "user", "password"] as const

type Inputs = Omit<BlockscoutDatabase, "id" | "created_at" | "updated_at">

export const BlockscoutDatabaseForm = ({
  database,
}: BlockscoutDatabaseFormProps) => {
  const pathname = usePathname()

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (database) {
      await updateBlockscoutDatabase(database.id, inputs)

      window.location.href = pathname.split("/").slice(0, -2).join("/")

      return
    }

    await createBlockscoutDatabase(inputs)

    window.location.href = pathname.split("/").slice(0, -1).join("/")
  }

  const inputs: HorizontalFormProps<Inputs>["inputs"] = INPUTS.map((name) => ({
    name,
    label: sentenceCase(name),
    defaultValue: database?.[name] ?? "",
    required: true,
  }))

  return <HorizontalForm submitHandler={submitHandler} inputs={inputs} />
}
