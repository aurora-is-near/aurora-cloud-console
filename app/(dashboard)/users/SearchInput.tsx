"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

const SearchInput = ({ search }: { search?: string }) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const isSearching = timeoutId || isPending

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {isSearching ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <div
                className="w-3.5 h-3.5 border-2 border-gray-500 rounded-full animate-spin"
                style={{ borderRightColor: "transparent" }}
              />
            </div>
          ) : (
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          )}
        </div>
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-transparent"
          placeholder="Search"
          defaultValue={search}
          onChange={(event) => {
            clearTimeout(timeoutId)

            const id = setTimeout(() => {
              startTransition(() => {
                const value = event.target.value
                router.push(`/users${value ? `?search=${value}` : ""}`)
                setTimeoutId(undefined)
              })
            }, 500)

            setTimeoutId(id)
          }}
        />
      </div>
    </div>
  )
}

export default SearchInput
