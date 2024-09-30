"use client"

import { features } from "./EmptyState"

const FeatureList = () => {
  return (
    <div className="mt-5 grid w-full max-w-sm flex-1 gap-4 md:max-w-none md:grid-cols-3 md:gap-8">
      {features.map((feature) => (
        <div
          className="flex flex-col items-start justify-center rounded-[10px] bg-white p-5 pb-0 md:p-7 border border-slate-200"
          key={feature.title}
        >
          <feature.icon className="h-5 w-5 text-green-800 md:h-10 md:w-10" />
          <h3 className="mt-4 max-w-[65%] text-base font-bold leading-[18px] text-slate-900 md:mt-5 md:text-[16px]">
            {feature.title}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default FeatureList
