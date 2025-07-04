"use client"

import { paramCase } from "change-case"
import { useSearchParams } from "next/navigation"
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react"

interface Tab {
  title: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  action?: ReactNode
}

export type TabsFunctions = {
  setActiveTabIndex: (index: number) => void
}

export const Tabs = forwardRef<TabsFunctions, TabsProps>(
  ({ tabs, action }: TabsProps, ref) => {
    const searchParams = useSearchParams()

    const [activeTab, setActiveTab] = useState<Tab | undefined>(() => {
      const tabParam = searchParams.get("tab")
      const tabKeys = tabs.map(({ title }) => paramCase(title))

      const matchingTabIndex = tabKeys.findIndex(
        (tabKey) => tabKey === tabParam,
      )

      return tabs[matchingTabIndex] ?? tabs[0]
    })

    useImperativeHandle(ref, () => ({
      setActiveTabIndex: (index: number) => {
        const tab = tabs[index]

        setActiveTab(tab)
      },
    }))

    return (
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:self-start text-sm font-medium text-center w-full sm:justify-between sm:items-center gap-4">
          {!!action && <div className="sm:order-2">{action}</div>}
          <ul className="flex flex-wrap -mb-px sm:order-1">
            {tabs.map((tab) => (
              <li key={tab.title} className="me-0">
                <button
                  type="button"
                  className={
                    tab === activeTab
                      ? "inline-block px-4 h-[48px] text-slate-900 border-b-2 border-green-600 rounded-t-lg active"
                      : "inline-block px-4 h-[48px] border-b border-slate-200 rounded-t-lg hover:text-slate-600 text-slate-500 hover:border-gray-300"
                  }
                  onClick={() => {
                    setActiveTab(tab)
                  }}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full">{activeTab?.content}</div>
      </div>
    )
  },
)

Tabs.displayName = "Tabs"
