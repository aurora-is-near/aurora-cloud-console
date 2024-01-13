"use client"

import { ReactNode, useState } from "react"
import { RadioGroup, Tab } from "@headlessui/react"
import clsx from "clsx"
import TabLegend, { TabLegendProps } from "@/components/TabLegend"
import { ChartColor } from "@/types/types"
import NumberEasing from "./NumberEasing"

type TabType = {
  title: string
  value?: number
  chart: ReactNode
  legend: TabLegendProps["legend"]
  dateOptions?: {
    label: string
  }
}

type TabChartsProps<T> = {
  children: ReactNode
  tabs:
    | [TabType]
    | [TabType, TabType]
    | [TabType, TabType, TabType]
    | [TabType, TabType, TabType, TabType] // 1-4 tabs
  selectedDateOption?: T
  onDateOptionChange?: (value: T) => void
  dateOptions?: {
    label: string
    value: T
  }[]
  colors?: ChartColor[]
}

const TabCharts = <T extends string | null>({
  children,
  tabs,
  selectedDateOption,
  onDateOptionChange,
  dateOptions,
  colors,
}: TabChartsProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        {children}

        {dateOptions && (
          <RadioGroup value={selectedDateOption} onChange={onDateOptionChange}>
            <RadioGroup.Label className="sr-only">
              Choose a date range
            </RadioGroup.Label>
            <div className="flex space-x-2.5">
              {dateOptions.map((option) => (
                <RadioGroup.Option
                  key={option.label}
                  value={option.value}
                  className="justify-center rounded-md text-sm font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 px-2.5 py-1.5 ui-checked:bg-gray-200 cursor-pointer"
                >
                  <RadioGroup.Label as="span">{option.label}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}
      </div>
      <div className="mt-4 md:mt-6">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="block px-4 pt-5 pb-3 bg-white border-t sm:hidden border-x rounded-t-md">
            <label htmlFor="silo" className="sr-only">
              Select tab
            </label>
            <select
              id="silo"
              name="silo"
              className="block w-full py-4 pl-3 pr-8 leading-none text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600"
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              value={selectedIndex}
            >
              {tabs.map(({ title }, index) => (
                <option key={title} value={index}>
                  {title}
                </option>
              ))}
            </select>

            <div className="mt-3 text-3xl font-bold text-gray-900">
              {tabs[selectedIndex].value}
            </div>
          </div>

          <Tab.List
            className={clsx("hidden sm:grid gap-x-2.5 -mb-px relative z-10", {
              "grid-cols-1": tabs.length === 1,
              "grid-cols-2": tabs.length === 2,
              "grid-cols-3": tabs.length === 3,
              "grid-cols-4": tabs.length === 4,
            })}
          >
            {tabs.map(({ title, value }) => (
              <Tab
                key={title}
                className="px-4 py-4 md:py-5 text-left border border-gray-200 sm:px-5 md:px-6 rounded-t-md ui-selected:bg-white ui-selected:border-b-white ui-not-selected:bg-gray-50"
              >
                <div className="text-sm font-medium leading-none text-gray-500">
                  {title}
                </div>
                <div
                  className={clsx(
                    "text-gray-900 text-3xl md:text-4xl font-bold mt-1.5",
                    {
                      "animate-pulse bg-clip-text text-transparent bg-gray-300":
                        !value,
                    },
                  )}
                >
                  <NumberEasing value={value || 0} />
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="bg-white border border-gray-200 rounded-b-md">
            {tabs.map(({ title, chart, legend }) => (
              <Tab.Panel key={title}>
                <div className="px-4 pt-5 pb-5 md:pb-6 sm:px-5 md:px-6 h-[400px]">
                  {chart ?? (
                    <div className="flex h-full w-full items-center justify-center">
                      <div
                        className="w-12 h-12 border-2 border-gray-500 rounded-full animate-spin"
                        style={{ borderRightColor: "transparent" }}
                      />
                    </div>
                  )}
                </div>
                <div className="px-1 pb-1">
                  <TabLegend legend={legend} colors={colors} />
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
