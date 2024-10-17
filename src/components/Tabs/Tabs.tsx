"use client"

import { ReactNode, useState } from "react"

interface TabProps {
  title: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabProps[]
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<TabProps | undefined>(tabs[0])

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex self-start text-sm font-medium text-center">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.title} className="me-0">
              <button
                type="button"
                className={
                  tab === activeTab
                    ? "inline-block p-4 text-slate-900 border-b-2 border-green-600 rounded-t-lg active"
                    : "inline-block p-4 border-b border-slate-200 rounded-t-lg hover:text-slate-600 text-slate-500 hover:border-gray-300"
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
}
