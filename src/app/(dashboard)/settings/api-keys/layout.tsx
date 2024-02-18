import { ReactNode } from "react"
import AddApiKeyModal from "./AddApiKeyModal"
import EditApiKeyModal from "./EditApiKeyModal"
import { DeleteApiKeyModal } from "./DeleteApiKeyModal"
import { getApiKeys } from "@/actions/api-keys/get-api-keys"

const Layout = async ({ children }: { children: ReactNode }) => {
  const apiKeys = await getApiKeys()

  return (
    <>
      {children}
      <AddApiKeyModal />
      <EditApiKeyModal apiKeys={apiKeys} />
      <DeleteApiKeyModal />
    </>
  )
}

export default Layout
