import { ReactNode } from "react"
import { AddListModal } from "@/app/[team]/(dashboard)/lists/AddListModal"
import { EditListModal } from "@/app/[team]/(dashboard)/lists/EditListModal"
import { DeleteListModal } from "@/app/[team]/(dashboard)/lists/DeleteListModal"
import { ImportListItemsModal } from "@/app/[team]/(dashboard)/lists/ImportListItemsModal"
import { DeleteListItemModal } from "@/app/[team]/(dashboard)/lists/DeleteListItemModal"
import { ViewListItemDetailsModal } from "@/app/[team]/(dashboard)/lists/ViewListItemDetailsModal"

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
