"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

const Page = () => {
  const params = useParams()
  const { teamKey } = params

  return (
    <div className="full-w full-h flex flex-col">
      <div className="flex justify-between bg-white full-w border-b-2 border-slate-100 p-6">
        <div />
        <span>Set up your Aurora Chain</span>
        <Link href={`/dashboard/${teamKey}`}>
          <span>+</span>
        </Link>
      </div>
      Create
    </div>
  )
}

export default Page
