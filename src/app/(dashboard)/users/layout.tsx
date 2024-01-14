import { ReactNode } from "react"
import BlockUserModal from "./BlockUserModal"
import DeleteUserModal from "./DeleteUserModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <BlockUserModal />
    <DeleteUserModal />
  </>
)

export default Layout
