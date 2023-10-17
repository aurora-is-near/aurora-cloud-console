"use client"

import { ReactNode } from "react"
import { Tab } from "@headlessui/react"
import { subDays, subMonths } from "date-fns"
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import clsx from "clsx"

type TabType = {
  title: string
  value: string
  chart: ReactNode
  legend: string[]
}

const options = [
  {
    label: "All time",
    startDate: null,
  },
  {
    label: "1w",
    startDate: subDays(new Date(), 7),
  },
  {
    label: "1m",
    startDate: subMonths(new Date(), 1),
  },
  {
    label: "3m",
    startDate: subMonths(new Date(), 3),
  },
]

const TabCharts = ({
  children,
  tabs,
}: {
  children: ReactNode
  tabs: TabType[]
}) => {
  const [startDate, setStartDate] = useState(options[0])
  const startAt = startDate?.startDate

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        {children}

        <RadioGroup value={startDate} onChange={setStartDate}>
          <RadioGroup.Label className="sr-only">
            Choose a date range
          </RadioGroup.Label>
          <div className="flex space-x-2.5">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.label}
                value={option}
                className="justify-center rounded-md text-sm font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 px-2.5 py-1.5 ui-checked:bg-gray-200 cursor-pointer"
              >
                <RadioGroup.Label as="span">{option.label}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="mt-6">
        <Tab.Group>
          <Tab.List
            className={clsx("grid gap-x-2.5 -mb-px relative z-10", {
              "grid-cols-1": tabs.length === 1,
              "grid-cols-2": tabs.length === 2,
              "grid-cols-3": tabs.length === 3,
              "grid-cols-4": tabs.length === 4,
            })}
          >
            {tabs.map(({ title, value }) => (
              <Tab
                key={title}
                className="px-6 py-5 text-left border border-gray-200 rounded-t-md ui-selected:bg-white ui-selected:border-b-white ui-not-selected:bg-gray-50"
              >
                <div className="text-sm font-medium leading-none text-gray-500">
                  {title}
                </div>
                <div className="text-gray-900 text-4xl font-bold mt-1.5">
                  {value}
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="bg-white border border-gray-200 rounded-b-md">
            {tabs.map(({ title, chart, legend }) => (
              <Tab.Panel key={title}>
                <div className="px-6 pt-5 pb-6">
                  <div className="w-full bg-gray-200 rounded-md h-44" />
                </div>
                <div className="px-1 pb-1">
                  <div className="flex items-center w-full px-5 space-x-6 rounded-b-sm bg-gray-50 h-9">
                    {legend.map((text, i) => (
                      <div key={text} className="flex items-center space-x-2">
                        <div
                          className={clsx("h-2.5 w-2.5 rounded-sm", {
                            "bg-green-400": i === 0,
                            "bg-cyan-400": i === 1,
                            "bg-orange-400": i === 2,
                            "bg-purple-400": i === 3,
                          })}
                        />
                        <span className="text-xs font-medium leading-3 text-gray-900">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}

export default TabCharts
