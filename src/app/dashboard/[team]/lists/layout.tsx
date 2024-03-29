import { ReactNode } from "react"
import { AddListModal } from "@/app/dashboard/[team]/lists/AddListModal"
import { EditListModal } from "@/app/dashboard/[team]/lists/EditListModal"
import { DeleteListModal } from "@/app/dashboard/[team]/lists/DeleteListModal"
import { ImportListItemsModal } from "@/app/dashboard/[team]/lists/ImportListItemsModal"
import { DeleteListItemModal } from "@/app/dashboard/[team]/lists/DeleteListItemModal"
import { ViewListItemDetailsModal } from "@/app/dashboard/[team]/lists/ViewListItemDetailsModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <EditListModal />
    <AddListModal />
    <DeleteListModal />
    <DeleteListItemModal />
    <ImportListItemsModal />
    <ViewListItemDetailsModal />
  </>
)

export default Layout
