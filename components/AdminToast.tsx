"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

type AdminToastProps<Item extends { id: number; name: string }> = {
  items: Item[]
  itemName: string
}

export const AdminToast = <Item extends { id: number; name: string }>({
  items,
  itemName,
}: AdminToastProps<Item>) => {
  const searchParams = useSearchParams()
  const modifiedItem = items.find(
    (item) => item?.id === Number(searchParams.get("new")),
  )

  useEffect(() => {
    if (!modifiedItem) {
      return
    }

    toast.success(`${itemName} created`)
  }, [itemName, modifiedItem])

  return null
}
