import { ReactNode } from "react"
import AddContractModal from "./AddContractModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddContractModal />
  </>
)

export default Layout
