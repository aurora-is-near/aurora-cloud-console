import { Suspense } from "react"
import UsersTable from "../UsersTable"
import Header from "./Header"
import Loader from "@/components/Loader"
import TableLoader from "@/components/TableLoader"

const Page = async ({
  searchParams,
  params: { list: listName },
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { list: string }
}) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined

  const currentSearchParams = new URLSearchParams()

  if (search) {
    currentSearchParams.set("search", search)
  }

  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <Loader className="rounded-md h-[134px] !mt-0 sm:h-20 md:h-9 lg:h-20 xl:h-9" />
        }
      >
        <Header search={search} listName={listName} />
      </Suspense>

      <section>
        <Suspense fallback={<TableLoader />}>
          <UsersTable searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  )
}

export default Page
