"use client"

import Link from "next/link"
import { useCallback, useRef, useState } from "react"
import debounce from "lodash.debounce"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"
import Card from "@/components/Card"
import { Input } from "@/components/Input"
import { queryKeys } from "@/actions/query-keys"
import { getTeamSummaries } from "@/actions/teams/get-team-summaries"
import { SEARCH_DEBOUNCE_DELAY } from "@/constants/search"
import { Spinner } from "@/components/Spinner"
import { TouchContainer } from "@/uikit/TouchContainer/TouchContainer"
import { Button } from "@/components/Button"

export const TeamsList = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: teamSummariesData,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.getTeamSummaries({ searchQuery }),
    queryFn: ({
      pageParam: nextQuery,
    }: {
      pageParam: Awaited<ReturnType<typeof getTeamSummaries>>["nextPage"]
    }) => getTeamSummaries({ searchQuery, ...nextQuery }),
    initialPageParam: {},
    getNextPageParam: (lastPage) => lastPage.nextPage,
    placeholderData: keepPreviousData,
  })

  const updateSearchQueryRef = useRef(
    debounce((text: string) => {
      setSearchQuery(text)
    }, SEARCH_DEBOUNCE_DELAY),
  )

  const updateSearchQuery = useCallback((text: string) => {
    setSearchQuery(text)
    updateSearchQueryRef.current(text)
  }, [])

  const teamSummaries =
    teamSummariesData?.pages.flatMap((page) => page.teams) ?? []

  return (
    <Card>
      <div className="flex flex-row items-center gap-2 mb-4">
        <MagnifyingGlassCircleIcon className="w-7 h-7" />
        <div className="relative w-full">
          <Input
            value={searchQuery}
            onChange={(e) => {
              updateSearchQuery(e.target.value)
            }}
            placeholder="Search"
            id="search"
            name="search"
          />
          {isFetching && !!searchQuery && (
            <Spinner
              size="sm"
              className="absolute transform -translate-y-1/2 right-3 top-1/2"
            />
          )}
        </div>
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => {
              updateSearchQuery("")
            }}
          >
            <TouchContainer>
              <XMarkIcon className="w-5 h-5" />
            </TouchContainer>
          </button>
        )}
      </div>
      {teamSummaries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamSummaries.map((teamSummary) => {
            const firstSiloId = teamSummary.silo_ids[0]
            const siloPrefix = firstSiloId ? `/silos/${firstSiloId}` : ""

            return (
              <div
                key={teamSummary.id}
                className="flex flex-0 border border-gray-200 bg-white hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-700"
              >
                <Link
                  href={`/dashboard/${teamSummary.team_key}${siloPrefix}`}
                  className="w-full text-lg overflow-hidden whitespace-nowrap text-ellipsis block p-2 px-4"
                >
                  {teamSummary.name}
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="w-full h-40 flex items-center justify-center">
          {isFetching ? (
            <Spinner size="md" />
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-lg text-slate-500">No teams found</p>
            </div>
          )}
        </div>
      )}
      {hasNextPage && (
        <div className="w-full mt-8 mb-4 flex justify-center">
          <Button
            onClick={() => {
              void fetchNextPage()
            }}
            loading={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </Card>
  )
}
