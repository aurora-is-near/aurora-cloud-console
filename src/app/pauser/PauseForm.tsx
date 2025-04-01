"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useCallback } from "react"
import { pause as sdkPause } from "@auroraisnear/pauser-sdk"
import { Button } from "@/components/Button"

type Inputs = {
  networkId: "ethereum" | "near"
  chainId: string
  accountId: string
  target?: string
  sender?: string
}

const PauseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const pause: SubmitHandler<Inputs> = useCallback(
    async ({ networkId, chainId, accountId, target, sender }) => {
      if (networkId === "near" && target) {
        await sdkPause({ networkId, chainId, accountId, target, sender })
      } else if (networkId === "ethereum") {
        const chain = parseInt(chainId, 10)

        await sdkPause({ networkId, chainId: chain, accountId })
      }
    },
    [],
  )

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-6 md:p-10 w-full md:w-[457px]">
        <form className="space-y-4" onSubmit={handleSubmit(pause)}>
          <div>
            <label
              htmlFor="networkId"
              className="block text-sm font-medium leading-none text-gray-900"
            >
              Network
            </label>
            <input
              type="text"
              id="networkId"
              className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="near | ethereum"
              required
              {...register("networkId", {
                required: "Please enter a networkId",
              })}
            />
            {!!errors.networkId?.message && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.networkId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="chainId"
              className="block text-sm font-medium leading-none text-gray-900"
            >
              Chain
            </label>
            <input
              type="text"
              id="chainId"
              className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="near: mainnet | testnet; ethereum: <number>"
              required
              {...register("chainId", {
                required: "Please enter a chainId",
              })}
            />
            {!!errors.chainId?.message && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.chainId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="accountId"
              className="block text-sm font-medium leading-none text-gray-900"
            >
              Account
            </label>
            <input
              type="text"
              id="accountId"
              className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="near: <xxx.near>; ethereum: <0x...>"
              required
              {...register("accountId", {
                required: "Please enter a valid account or 0x address",
              })}
            />
            {!!errors.accountId?.message && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.accountId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="target"
              className="block text-sm font-medium leading-none text-gray-900"
            >
              Controller Account
            </label>
            <input
              type="text"
              id="target"
              className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="controller contract e.g. controller.aurora"
              required
              {...register("target", {
                required: "Please enter a valid account",
              })}
            />
            {!!errors.target?.message && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.target.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sender"
              className="block text-sm font-medium leading-none text-gray-900"
            >
              Signer Account
            </label>
            <input
              type="text"
              id="sender"
              className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="leave this blank to sign with implicit account"
              required
              {...register("sender", {
                required: "Please enter a valid account",
              })}
            />
            {!!errors.sender?.message && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.sender.message}
              </p>
            )}
          </div>

          <Button loading={isSubmitting} size="lg" type="submit" fullWidth>
            Pause
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PauseForm
