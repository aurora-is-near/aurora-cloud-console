"use client"

import { SubmitHandler } from "react-hook-form"
import { Token } from "@/types/types"
import {
  HorizontalForm,
  HorizontalFormProps,
} from "@/components/HorizontalForm"

type AdminFormProps<
  Inputs extends Record<string, unknown>,
  Item extends ({ id: number } & Record<string, unknown>) | null,
> = {
  item?: Item | null
  updateItem: (id: number, inputs: Inputs) => Promise<null>
  createItem: (inputs: Inputs) => Promise<Item>
  href: string
  inputs: HorizontalFormProps<Inputs>["inputs"]
}

export const AdminForm = <
  Inputs extends Record<string, unknown>,
  Item extends ({ id: number } & Record<string, unknown>) | null,
>({
  item,
  updateItem,
  createItem,
  href,
  inputs,
}: AdminFormProps<Inputs, Item>) => {
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    if (item) {
      await updateItem(item.id, inputs)
      window.location.href = `${href}?operation=updated&id=${item.id}`

      return
    }

    const newItem = await createItem(inputs)

    window.location.href = `${href}?operation=created&id=${newItem?.id}`
  }

  return <HorizontalForm<Inputs> submitHandler={update} inputs={inputs} />
}
