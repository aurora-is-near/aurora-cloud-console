"use client"

import OnrampHero from "@/app/dashboard_v2/[teamKey]/onramp/OnrampHero"

const EmptyState = () => {
  return (
    <div className="divide-y flex flex-col gap-10">
      <OnrampHero />
      {/* <div className="flex flex-col pt-10 gap-5">
        <span className="text-xl text-slate-900 font-bold">Solutions</span>
      </div> */}
    </div>
  )
}

export default EmptyState
