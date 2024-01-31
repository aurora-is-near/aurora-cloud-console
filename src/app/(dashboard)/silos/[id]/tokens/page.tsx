import TokensTable from "./TokensTable"
import { Suspense } from "react"
import TableLoader from "@/components/TableLoader"
import Header from "./Header"
import Loader from "@/components/Loader"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <div className="space-y-4 sm:space-y-5">
        <Suspense
          fallback={<Loader className="h-[76px] sm:h-9 rounded-md !mt-0" />}
        >
          <Header siloId={Number(id)} />
        </Suspense>

        <Suspense fallback={<TableLoader />}>
          <TokensTable siloId={Number(id)} />
        </Suspense>
      </div>
    </DashboardPage>
  )
}

export default Page
