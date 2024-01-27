import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "@/app/(dashboard)/settings/api-keys/ApiKeysTable"
import { HeadingRow } from "@/components/HeadingRow"

const Page = () => {
  return (
    <>
      <HeadingRow title="API Keys">
        <AddApiKeyButton />
      </HeadingRow>
      <ApiKeysTable />
    </>
  )
}

export default Page
