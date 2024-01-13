"use client"

import { SubmitHandler } from "react-hook-form"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"
import toast from "react-hot-toast"

type AdminFormProps<
  Inputs extends Record<string, unknown>,
  Item extends { id: number } & Record<string, unknown>,
> = {
  itemName: string
  item?: Item | null
  updateItem: (id: number, inputs: Inputs) => Promise<Item>
  createItem: (inputs: Inputs) => Promise<Item>
  nextPath?: string
  inputs: HorizontalFormProps<Inputs>["inputs"]
}

export const AdminForm = <
  Inputs extends Record<string, unknown>,
  Item extends { id: number } & Record<string, unknown>,
>({
  itemName,
  item,
  updateItem,
  createItem,
  nextPath,
  inputs,
}: AdminFormProps<Inputs, Item>) => {
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (item) {
      await updateItem(item.id, inputs)
      toast.success(`${itemName} updated`)

      return
    }

    const newItem = await createItem(inputs)

    if (nextPath) {
      window.location.href = `${nextPath}?operation=created&id=${newItem.id}`
    }
  }

  return (
    <>
      <HorizontalForm<Inputs> submitHandler={update} inputs={inputs} />
    </>
  )
}
