import { ReactNode } from "react"
import AddApiKeyModal from "./AddApiKeyModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddApiKeyModal />
  </>
)

export default Layout
