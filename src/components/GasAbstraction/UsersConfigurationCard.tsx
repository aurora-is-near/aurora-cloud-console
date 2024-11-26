"use client"

import clsx from "clsx"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useFormContext } from "react-hook-form"
import { LinkButton } from "@/components/LinkButton"
import { Button } from "@/components/Button"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import Loader from "@/components/Loader"

type Inputs = {
  open: boolean
}

const UsersConfigurationCard = () => {
  const { deal, queueUpdate: _queueUpdate } =
    useRequiredContext(DealUpdateContext)

  const {
    register,
    getValues: _getValues,
    setValue,
    watch,
  } = useFormContext<Inputs>()

  useEffect(() => {
    if (!deal) {
      return
    }

    setValue("open", deal.open)
  }, [deal, setValue])

  // const isOpen = useMemo(() => {
  //   return watch("open")
  // }, [watch])

  if (!deal) {
    return <Loader />
  }

  return (
    <ConfigurationCard
      title="Users"
      description="Choose who will benefit from this plan."
    >
      <div className="xl:w-1/2 flex flex-col gap-2">
        <div
          className={clsx(
            "rounded-md ring-1",
            watch("open") ? "ring-green-600 bg-green-50" : "ring-slate-200",
          )}
        >
          <label
            htmlFor="all"
            className="flex items-start w-full cursor-pointer p-3"
          >
            <div className="flex items-center h-6">
              <input
                type="radio"
                value="true"
                className="accent-green-500 checked:bg-green-500 checked:focus:bg-green-500 checked:hover:bg-green-500 focus:ring-green-500"
                defaultChecked={deal.open}
                {...register("open")}
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
            !watch("open") ? "ring-green-600 bg-green-50" : "ring-slate-200",
          )}
        >
          <label
            htmlFor="selected"
            className="flex items-start w-full cursor-not-allowed"
          >
            <div className="flex items-center h-6">
              <input
                type="radio"
                value="false"
                className="accent-green-500 checked:bg-green-500 checked:focus:bg-green-500 checked:hover:bg-green-500 focus:ring-green-500"
                defaultChecked={!deal.open}
                {...register("open")}
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
    </ConfigurationCard>
  )
}

export default UsersConfigurationCard
