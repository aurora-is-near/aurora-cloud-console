import { Alert } from "@/components/Alert"

type AdminAlertProps<Item extends { id: number; name: string }> = {
  items: Item[]
  itemName: string
  searchParams: Record<string, string>
}

export const AdminAlert = <Item extends { id: number; name: string }>({
  items,
  itemName,
  searchParams,
}: AdminAlertProps<Item>) => {
  const modifiedItem = items.find(
    (item) => item?.id === Number(searchParams["id"]),
  )

  const operation =
    searchParams["operation"] &&
    ["updated", "created"].includes(searchParams["operation"])
      ? searchParams["operation"]
      : null

  if (!modifiedItem || !operation) {
    return null
  }

  return (
    <Alert dismissable type="success" className="mb-6">
      {itemName} {operation}: {modifiedItem.name}
    </Alert>
  )
}
