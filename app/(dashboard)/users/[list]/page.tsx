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
      <header className="flex items-center justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">{list.name}</Heading>
          <Heading tag="span" textColorClassName="text-gray-400">
            324
          </Heading>
        </div>
        <div className="flex space-x-3">
          <SearchInput search={search} />

          <Button style="secondary">
            <ArrowDownCircleIcon className="w-5 h-5" />
            <span>Export</span>
          </Button>
          <Button>
            <Cog8ToothIcon className="w-5 h-5" />
            <span>Manage</span>
          </Button>
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
