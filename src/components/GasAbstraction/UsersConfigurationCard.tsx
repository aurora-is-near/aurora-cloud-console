"use client"

import clsx from "clsx"
import Link from "next/link"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { LinkButton } from "@/components/LinkButton"
import { Button } from "@/components/Button"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { RuleContext } from "@/providers/RuleProvider"
import { AddRuleUserModal } from "@/components/GasAbstraction/AddRuleUserModal"
import { Skeleton } from "@/uikit"
import { updateDeal } from "@/actions/deals/update-deal"
import { Deal } from "@/types/types"

type Inputs = {
  open?: boolean
}

const UsersConfigurationCard = ({ deal }: { deal: Deal }) => {
  const { openModal } = useModals()
  const { register, watch } = useForm<Inputs>()

  const { ruleUsers } = useRequiredContext(RuleContext)

  const isOpen = String(watch("open") ?? deal?.open) === "true"

  const onSave = useCallback(async () => {
    if (!deal) {
      return
    }

    await updateDeal(deal.id, {
      open: !isOpen,
    })
    toast.success("Deal updated")
  }, [deal, isOpen])

  useEffect(() => {
    const subscription = watch((_value, { name, type: operation }) => {
      if (operation === "change" && name) {
        void onSave()
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, onSave])

  if (!deal) {
    return <Skeleton className="h-24" />
  }

  const openAddRuleAddressModal = () => {
    openModal(Modals.AddRuleAddress)
  }

  const radioClassName =
    "accent-green-500 checked:bg-green-500 checked:focus:bg-green-500 checked:hover:bg-green-500 focus:ring-green-500"

  return (
    <ConfigurationCard
      title="Users"
      description="Choose who will benefit from this plan."
    >
      <div className="flex flex-col gap-2">
        <div
          className={clsx(
            "rounded-md ring-1",
            isOpen ? "ring-green-600 bg-green-50" : "ring-slate-200",
          )}
        >
          <label
            htmlFor="all"
            className="flex items-start w-full cursor-pointer p-3"
          >
            <div className="flex items-center h-6">
              <input
                id="all"
                type="radio"
                value="true"
                className={radioClassName}
                checked={isOpen}
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
            !isOpen ? "ring-green-600 bg-green-50" : "ring-slate-200",
          )}
        >
          <label
            htmlFor="selected"
            className="flex items-start w-full cursor-pointer"
          >
            <div className="flex items-center h-6">
              <input
                id="selected"
                type="radio"
                value="false"
                className={radioClassName}
                checked={!isOpen}
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
                  {ruleUsers?.length} wallet address
                  {ruleUsers?.length === 1 ? "" : "es"} added
                </span>
              </div>
              <Button onClick={openAddRuleAddressModal} variant="border">
                Add manually
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddRuleUserModal />
    </ConfigurationCard>
  )
}

export default UsersConfigurationCard
