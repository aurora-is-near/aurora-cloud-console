import { ReactNode } from "react"
import AddContractModal from "./AddContractModal"
import AddListModal from "./AddListModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddContractModal />
    <AddListModal />
  </>
)

export default Layout
