import { ReactNode } from "react"
import { AddListModal } from "@/app/(dashboard)/lists/AddListModal"
import { EditListModal } from "@/app/(dashboard)/lists/EditListModal"
import { DeleteListModal } from "@/app/(dashboard)/lists/DeleteListModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <EditListModal />
    <AddListModal />
    <DeleteListModal />
  </>
)

export default Layout
