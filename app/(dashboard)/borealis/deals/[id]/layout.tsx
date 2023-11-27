import { ReactNode } from "react"
import AddContractModal from "./AddContractModal"
import AddListModal from "./AddListModal"
import EditContractModal from "./EditContractModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddContractModal />
    <EditContractModal />
    <AddListModal />
  </>
)

export default Layout
