"use client"

import Heading from "@/components/Heading"
import SearchInput from "./SearchInput"
import { ListItemsTable } from "./ListItemsTable"
import TableLoader from "@/components/TableLoader"
import { useSearchParams } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import { EditListButton } from "@/app/(dashboard)/lists/EditListButton"
import { ImportListItemsButton } from "@/app/(dashboard)/lists/ImportListItemsButton"
import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"

const PER_PAGE = 20

type ListItemsListProps = {
  title: string
  listId: number
}

export const ListItems = ({ title, listId }: ListItemsListProps) => {
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: ({ pageParam: cursor }) =>
        apiClient.getListItems({ id: listId, limit: PER_PAGE, cursor }),
      queryKey: getQueryKey("getListItems", { id: listId, limit: PER_PAGE }),
      getNextPageParam: (lastPage, allPages) => {
        const hasMore = allPages.length * PER_PAGE < lastPage.total
        const lastItem = lastPage.items[lastPage.items.length - 1]

        return hasMore ? lastItem : undefined
      },
      initialPageParam: "",
    })

  const total = data?.pages[0]?.total ?? 0
  const listItems = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">{title}</Heading>
          <Heading tag="span" textColorClassName="text-gray-400">
            {total.toLocaleString()}
          </Heading>
        </div>
        <div className="flex items-start sm:flex-row flex-col-reverse gap-3">
          <SearchInput search={search} />

          <div className="flex space-x-3">
            <ImportListItemsButton id={listId} />
            <EditListButton id={listId} />
          </div>
        </div>
      </header>

      <section>
        {!data || isLoading ? (
          <TableLoader />
        ) : (
          <ListItemsTable
            listId={listId}
            listItems={listItems}
            total={total}
            perPage={PER_PAGE}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </section>
    </div>
  )
}
