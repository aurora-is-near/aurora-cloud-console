"use client"

import { SubmitHandler } from "react-hook-form"
import { Token } from "@/types/types"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"
import { AdminAlert } from "@/components/AdminAlert"
import toast from "react-hot-toast"
import { Alert } from "@/components/Alert"
import { useState } from "react"

type AdminFormProps<
  Inputs extends Record<string, unknown>,
  Item extends ({ id: number } & Record<string, unknown>) | null,
> = {
  itemName: string
  item?: Item | null
  updateItem: (id: number, inputs: Inputs) => Promise<Item>
  createItem: (inputs: Inputs) => Promise<Item>
  href: string
  inputs: HorizontalFormProps<Inputs>["inputs"]
}

export const AdminForm = <
  Inputs extends Record<string, unknown>,
  Item extends ({ id: number } & Record<string, unknown>) | null,
>({
  itemName,
  item,
  updateItem,
  createItem,
  href,
  inputs,
}: AdminFormProps<Inputs, Item>) => {
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (item) {
      await updateItem(item.id, inputs)
      toast.success(`${itemName} updated`)

      return
    }

    const newItem = await createItem(inputs)

    window.location.href = `${href}?operation=created&id=${newItem?.id}`
  }

  return (
    <>
      <HorizontalForm<Inputs> submitHandler={update} inputs={inputs} />
    </>
  )
}
