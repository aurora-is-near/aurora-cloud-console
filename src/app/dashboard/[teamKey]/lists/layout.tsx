import { ReactNode } from "react"
import { AddListModal } from "@/app/dashboard/[teamKey]/lists/AddListModal"
import { EditListModal } from "@/app/dashboard/[teamKey]/lists/EditListModal"
import { DeleteListModal } from "@/app/dashboard/[teamKey]/lists/DeleteListModal"
import { ImportListItemsModal } from "@/app/dashboard/[teamKey]/lists/ImportListItemsModal"
import { DeleteListItemModal } from "@/app/dashboard/[teamKey]/lists/DeleteListItemModal"
import { ViewListItemDetailsModal } from "@/app/dashboard/[teamKey]/lists/ViewListItemDetailsModal"

const Layout = ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => (
  <>
    {children}
    <EditListModal />
    <AddListModal />
    <DeleteListModal teamKey={teamKey} />
    <DeleteListItemModal />
    <ImportListItemsModal teamKey={teamKey} />
    <ViewListItemDetailsModal />
  </>
)

export default Layout
