import { ReactNode } from "react"
import AddApiKeyModal from "./AddApiKeyModal"
import EditApiKeyModal from "./EditApiKeyModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddApiKeyModal />
    <EditApiKeyModal />
  </>
)

export default Layout
