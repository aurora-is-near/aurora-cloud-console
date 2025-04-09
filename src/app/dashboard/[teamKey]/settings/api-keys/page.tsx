"use client"

import { useQuery } from "@tanstack/react-query"
import { getApiKeys } from "@/actions/api-keys/get-api-keys"
import { DashboardPage } from "@/components/DashboardPage"
import { Skeleton } from "@/uikit"
import { queryKeys } from "@/actions/query-keys"
import AddApiKeyModal from "@/app/dashboard/[teamKey]/settings/api-keys/AddApiKeyModal"
import EditApiKeyModal from "@/app/dashboard/[teamKey]/settings/api-keys/EditApiKeyModal"
import { DeleteApiKeyModal } from "@/app/dashboard/[teamKey]/settings/api-keys/DeleteApiKeyModal"
import AddApiKeyButton from "./AddApiKeyButton"
import { ApiKeysTable } from "./ApiKeysTable"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  const { data: apiKeys } = useQuery({
    queryKey: queryKeys.getApiKeys(teamKey),
    queryFn: async () => getApiKeys(teamKey),
  })

  return (
    <>
      <DashboardPage
        heading="API Keys"
        actions={apiKeys && apiKeys.length > 0 ? <AddApiKeyButton /> : null}
      >
        {!apiKeys ? <Skeleton.Table /> : <ApiKeysTable apiKeys={apiKeys} />}
      </DashboardPage>
      <DeleteApiKeyModal />
      <AddApiKeyModal teamKey={teamKey} />
      {apiKeys && <EditApiKeyModal apiKeys={apiKeys} />}
    </>
  )
}

export default Page
