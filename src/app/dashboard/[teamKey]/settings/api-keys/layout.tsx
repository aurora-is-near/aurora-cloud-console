import { ReactNode } from "react"
import AddApiKeyModal from "./AddApiKeyModal"
import EditApiKeyModal from "./EditApiKeyModal"
import { DeleteApiKeyModal } from "./DeleteApiKeyModal"
import { getApiKeys } from "@/actions/api-keys/get-api-keys"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const apiKeys = await getApiKeys(teamKey)

  return (
    <>
      {children}
      <AddApiKeyModal teamKey={teamKey} />
      <EditApiKeyModal apiKeys={apiKeys} />
      <DeleteApiKeyModal />
    </>
  )
}

export default Layout
