import { ReactNode } from "react"
import { AddListModal } from "@/app/(dashboard)/lists/AddListModal"
import { EditListModal } from "@/app/(dashboard)/lists/EditListModal"
import { DeleteListModal } from "@/app/(dashboard)/lists/DeleteListModal"
import { ImportListItemsModal } from "@/app/(dashboard)/lists/ImportListItemsModal"
import { DeleteListItemModal } from "@/app/(dashboard)/lists/DeleteListItemModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <EditListModal />
    <AddListModal />
    <DeleteListModal />
    <DeleteListItemModal />
    <ImportListItemsModal />
  </>
)

export default Layout
