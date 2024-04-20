import { getApiKeys } from "@/actions/api-keys/get-api-keys"
import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "./ApiKeysTable"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const apiKeys = await getApiKeys(teamKey)

  return (
    <DashboardPage heading="API Keys" actions={<AddApiKeyButton />}>
      <ApiKeysTable apiKeys={apiKeys} />
    </DashboardPage>
  )
}

export default Page
