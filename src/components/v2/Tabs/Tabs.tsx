"use client"

import { ReactNode, useState } from "react"
import Card from "@/components/Card"

interface TabProps {
  title: string
  content: ReactNode
}

interface TabsProps {
  tabs: TabProps[]
}

const idleClassNames =
  "inline-block p-4 border-b border-slate-200 rounded-t-lg hover:text-slate-600 text-slate-500 hover:border-gray-300"

const activeClassNames =
  "inline-block p-4 text-slate-900 border-b-2 border-green-600 rounded-t-lg active"

// const disabledClassNames =
//   "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0])

  const setTab = (e: React.MouseEvent<HTMLAnchorElement>, tab: TabProps) => {
    e.preventDefault()
    setActiveTab(tab)
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex self-start text-sm font-medium text-center">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.title} className="me-0">
              <a
                href="#"
                className={
                  tab === activeTab ? activeClassNames : idleClassNames
                }
                onClick={(e) => setTab(e, tab)}
              >
                {tab.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full rounded-lg">
        <Card className="w-full" borderRadius="xl" tag="section">
          {activeTab.content}
        </Card>
      </div>
    </div>
  )
}

export default Tabs
