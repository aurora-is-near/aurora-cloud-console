import { ReactNode } from "react"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddOrEditApiKeyModal />
  </>
)

export default Layout
