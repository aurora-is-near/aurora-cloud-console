import {
  CheckIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid"

import type { State } from "./types"

type Props = {
  state: State
}

export const Icon = ({ state = "upcoming" }: Props) => {
  switch (state) {
    case "current":
      return (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-white">
          <ArrowRightIcon className="w-3 h-3 stroke-6 stroke-white" />
        </div>
      )
    case "completed":
      return (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900 text-white">
          <CheckIcon className="w-3 h-3 stroke-6 stroke-white" />
        </div>
      )
    case "failed":
      return (
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
          <ExclamationCircleIcon className="absolute w-[29px] h-[29px] text-rose-600" />
        </div>
      )
    case "upcoming":
      return (
        <div className="w-6 h-6 rounded-full bg-transparent border-[3px] border-slate-300" />
      )
    case "pending":
      return (
        <div className="w-6 h-6 border-[3px] border-slate-300 border-t-transparent rounded-full animate-spin" />
      )
    default:
      return null
  }
}
