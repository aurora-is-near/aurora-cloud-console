"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import type { Team } from "@/types/types"

import { Typography } from "@/uikit"

type Props = {
  team: Team
}

export const TopPageBanner = ({ team }: Props) => (
  <Link
    href={`/dashboard/${team.team_key}/create-chain`}
    className="flex items-center justify-between w-full px-4 py-2.5 bg-slate-600 cursor-pointer"
  >
    <span />
    <Typography
      variant="label"
      size={3}
      className="text-slate-100 text-nowrap md:block hidden"
    >
      Get started and set up your Virtual Chain now!
    </Typography>
    <div className="flex items-center gap-2">
      <Typography
        variant="label"
        size={3}
        className="text-slate-100 text-nowrap"
      >
        Launch a Virtual Chain
      </Typography>
      <ArrowRightIcon className="w-4 h-4 text-white" />
    </div>
  </Link>
)
