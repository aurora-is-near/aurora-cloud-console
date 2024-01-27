import { ReactNode } from "react"
import AddContractModal from "./AddContractModal"
import EditContractModal from "./EditContractModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddContractModal />
    <EditContractModal />
  </>
)

export default Layout
