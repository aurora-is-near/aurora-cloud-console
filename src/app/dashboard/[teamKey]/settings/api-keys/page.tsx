import { getApiKeys } from "@/actions/api-keys/get-api-keys"
import { DashboardPage } from "@/components/DashboardPage"
import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "./ApiKeysTable"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const apiKeys = await getApiKeys(teamKey)

  return (
    <DashboardPage
      heading="API Keys"
      actions={<AddApiKeyButton teamKey={teamKey} />}
    >
      <ApiKeysTable teamKey={teamKey} apiKeys={apiKeys} />
    </DashboardPage>
  )
}

export default Page
