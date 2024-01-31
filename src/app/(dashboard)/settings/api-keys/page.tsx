import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "@/app/(dashboard)/settings/api-keys/ApiKeysTable"
import { DashboardPage } from "@/components/DashboardPage"
import { HeadingRow } from "@/components/HeadingRow"

const Page = () => {
  return (
    <DashboardPage>
      <HeadingRow title="API Keys">
        <AddApiKeyButton />
      </HeadingRow>
      <ApiKeysTable />
    </DashboardPage>
  )
}

export default Page
