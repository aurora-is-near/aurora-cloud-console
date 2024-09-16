"use client"

import Link from "next/link"
import { useTeamContext } from "@/contexts/TeamContext"

const Page = () => {
  const { team } = useTeamContext()

  return (
    <div className="full-w full-h flex flex-col">
      <div className="flex justify-between bg-white full-w border-b-2 border-slate-100 p-6">
        <div />
        <span>Set up your Aurora Chain</span>
        <Link href={`/dashboard/${team.team_key}`}>
          <span>+</span>
        </Link>
      </div>
      Create
    </div>
  )
}

export default Page
