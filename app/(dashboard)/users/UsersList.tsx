"use client"

import Button from "@/components/Button"
import Heading from "@/components/Heading"
import { Cog8ToothIcon } from "@heroicons/react/20/solid"
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"
import SearchInput from "./SearchInput"
import UsersTable from "./UsersTable"
import TableLoader from "@/components/TableLoader"
import { useUsers } from "../../../utils/api/queries"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

const PER_PAGE = 20

type UsersListProps = {
  title: string
  dealId?: number
}

const UsersList = ({ title, dealId }: UsersListProps) => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)
  const search = searchParams.get("search") ?? ""

  const { data, isLoading } = useUsers({
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
    dealId,
  })

  const exportUrl = useMemo(() => {
    const exportSearchParams = new URLSearchParams()

    if (dealId) {
      exportSearchParams.set("dealId", String(dealId))
    }

    return `/api/users/export?${exportSearchParams}`
  }, [dealId])

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">{title}</Heading>
          <Heading tag="span" textColorClassName="text-gray-400">
            {data?.total.toLocaleString()}
          </Heading>
        </div>
        <div className="flex items-start sm:flex-row flex-col-reverse gap-3">
          <SearchInput search={search} />

          <div className="flex space-x-3">
            <Button style="secondary" href={exportUrl} download="export.csv">
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
        {!data || isLoading ? (
          <TableLoader />
        ) : (
          <UsersTable users={data.users} total={data.total} />
        )}
      </section>
    </div>
  )
}

export default UsersList
