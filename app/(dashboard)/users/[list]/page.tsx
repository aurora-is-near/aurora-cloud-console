import Heading from "@/components/Heading"
import { getUserListByName } from "@/mockApi"
import { notFound } from "next/navigation"
import SearchInput from "../SearchInput"
import Button from "@/components/Button"
import { Cog8ToothIcon } from "@heroicons/react/20/solid"
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"
import { Suspense } from "react"
import UsersTable from "../UsersTable"

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

  const list = await getUserListByName(listName)

  if (!list) notFound()

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">{list.name}</Heading>
          <Heading tag="span" textColorClassName="text-gray-400">
            324
          </Heading>
        </div>
        <div className="flex items-start sm:flex-row flex-col-reverse gap-3">
          <SearchInput search={search} />

          <div className="flex space-x-3">
            <Button style="secondary">
              <ArrowDownCircleIcon className="w-5 h-5" />
              <span>Export</span>
            </Button>
            <Button>
              <Cog8ToothIcon className="w-5 h-5" />
              <span>Manage</span>
            </Button>
          </div>
        </div>
      </header>

      <section>
        <Suspense fallback={<div>loading...</div>}>
          <UsersTable searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  )
}

export default Page
