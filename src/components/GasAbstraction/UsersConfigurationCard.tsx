"use client"

import clsx from "clsx"
import { useState } from "react"
import Link from "next/link"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { LinkButton } from "@/components/LinkButton"
import { Button } from "@/components/Button"

const UsersConfigurationCard = () => {
  const [value, setValue] = useState("all")

  return (
    <div className="xl:w-1/2 flex flex-col gap-2">
      <div
        className={clsx(
          "rounded-md ring-1",
          value === "all" ? "ring-green-600 bg-green-50" : "ring-slate-200",
        )}
      >
        <label
          htmlFor="all"
          className="flex items-start w-full cursor-pointer p-3"
        >
          <div className="flex items-center h-6">
            <input
              id="all"
              name="users"
              type="radio"
              value="all"
              disabled
              className="accent-green-500 checked:bg-green-500 checked:focus:bg-green-500 checked:hover:bg-green-500 focus:ring-green-500"
              checked={value === "all"}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="ml-3 text-sm leading-6 text-slate-900 font-medium flex items-center gap-x-1">
            <span>All users</span>
          </div>
        </label>
      </div>
      <div
        className={clsx(
          "rounded-md ring-1 flex flex-col gap-2 p-3",
          value === "selected"
            ? "ring-green-600 bg-green-50"
            : "ring-slate-200",
        )}
      >
        <label
          htmlFor="selected"
          className="flex items-start w-full cursor-not-allowed"
        >
          <div className="flex items-center h-6">
            <input
              id="selected"
              name="users"
              type="radio"
              value="selected"
              disabled
              className="accent-green-500 checked:bg-green-500 checked:focus:bg-green-500 checked:hover:bg-green-500 focus:ring-green-500"
              checked={value === "selected"}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="ml-3 text-sm leading-6 text-slate-900 font-medium flex items-center gap-x-1">
            <span>Only selected users</span>
          </div>
        </label>

        <div className="rounded-lg border border-slate-200 p-3 bg-white bg-opacity-50">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Import via API</span>
              <Link
                className="text-sm text-cyan-600"
                href={`${window.location.origin}/api`}
              >
                {`${window.location.origin.split("://")[1]}/api`}
              </Link>
            </div>
            <LinkButton isExternal href="/api">
              View API
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </LinkButton>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-3 bg-white bg-opacity-50">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Import manually</span>
              <span className="text-sm text-slate-500">
                0 wallet addresses added
              </span>
            </div>
            <Button disabled variant="border">
              Add manually
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersConfigurationCard
