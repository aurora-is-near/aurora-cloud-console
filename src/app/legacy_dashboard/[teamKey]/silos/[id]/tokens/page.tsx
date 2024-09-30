import { Suspense } from "react"
import TableLoader from "@/components/TableLoader"
import { DashboardPage } from "@/components/DashboardPage"
import TokensTable from "./TokensTable"
import { SiloHeading } from "../../SiloHeading"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <SiloHeading heading="Tokens" siloId={Number(id)} />
      <Suspense fallback={<TableLoader />}>
        <TokensTable siloId={Number(id)} />
      </Suspense>
    </DashboardPage>
  )
}

export default Page
