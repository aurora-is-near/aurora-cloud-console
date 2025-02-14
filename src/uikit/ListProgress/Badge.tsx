import { InformationCircleIcon } from "@heroicons/react/24/solid"

import { Typography } from "../Typography"

import type { State } from "./types"

type Props = {
  state: State
}

export const Badge = ({ state }: Props) => {
  switch (state) {
    case "completed":
      return (
        <div className="flex items-center gap-1 bg-green-200 text-green-700 rounded-md py-0.5 px-1">
          <Typography variant="label" size={3}>
            Completed
          </Typography>
        </div>
      )
    case "failed":
      return (
        <div className="flex items-center gap-1 bg-rose-200 text-rose-700 rounded-md py-0.5 px-1">
          <Typography variant="label" size={3}>
            Failed
          </Typography>
          <InformationCircleIcon className="w-4 h-4" />
        </div>
      )
    case "current":
    case "upcoming":
    case "pending":
    default:
      return null
  }
}
