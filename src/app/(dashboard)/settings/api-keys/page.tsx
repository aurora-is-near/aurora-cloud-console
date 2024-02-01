import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "@/app/(dashboard)/settings/api-keys/ApiKeysTable"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
  return (
    <DashboardPage heading="API Keys" actions={<AddApiKeyButton />}>
      <ApiKeysTable />
    </DashboardPage>
  )
}

export default Page
