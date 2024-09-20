import { getApiKeys } from "@/actions/api-keys/get-api-keys"
import SubTitle from "@/components/v2/dashboard/SubTitle"
import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "./ApiKeysTable"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const apiKeys = await getApiKeys(teamKey)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <SubTitle>API Keys</SubTitle>
        <AddApiKeyButton />
      </div>
      <ApiKeysTable apiKeys={apiKeys} />
    </div>
  )
}

export default Page
