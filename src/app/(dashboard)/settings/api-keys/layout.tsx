import { ReactNode } from "react"
import AddApiKeyModal from "./AddApiKeyModal"
import EditApiKeyModal from "./EditApiKeyModal"
import { DeleteApiKeyModal } from "@/app/(dashboard)/settings/api-keys/DeleteApiKeyModal"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <AddApiKeyModal />
    <EditApiKeyModal />
    <DeleteApiKeyModal />
  </>
)

export default Layout
