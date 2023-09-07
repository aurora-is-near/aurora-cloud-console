"use client"

import { Tab } from "@headlessui/react"

const Charts = () => {
  return (
    <div className="mt-6">
      <Tab.Group>
        <Tab.List className="grid grid-cols-3 gap-x-2.5 -mb-px relative z-10">
          <Tab className="rounded-t-md border border-gray-200 ui-selected:bg-white ui-selected:border-b-white ui-not-selected:bg-gray-50 text-left py-5 px-6">
            <div className="font-medium text-gray-500 text-sm leading-none">
              Transactions volume
            </div>
            <div className="text-gray-900 text-4xl font-bold mt-1.5">
              88,986
            </div>
          </Tab>
          <Tab className="rounded-t-md border border-gray-200 ui-selected:bg-white ui-selected:border-b-white ui-not-selected:bg-gray-50 text-left py-5 px-6">
            <div className="font-medium text-gray-500 text-sm leading-none">
              Total wallets
            </div>
            <div className="text-gray-900 text-4xl font-bold mt-1.5">
              12,832
            </div>
          </Tab>
          <Tab className="rounded-t-md border border-gray-200 ui-selected:bg-white ui-selected:border-b-white ui-not-selected:bg-gray-50 text-left py-5 px-6">
            <div className="font-medium text-gray-500 text-sm leading-none">
              Avg transactions per wallet
            </div>
            <div className="text-gray-900 text-4xl font-bold mt-1.5">1.34</div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="rounded-b-md bg-white shadow border border-gray-200">
          <Tab.Panel>
            <div className="px-6 pt-5 pb-6">
              <div className="w-full bg-gray-200 h-44 rounded-md" />
            </div>
            <div className="px-1 pb-1">
              <div className="bg-gray-50 w-full h-9 rounded-b-sm flex space-x-6 items-center px-5">
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-green-400" />
                  <span className="text-xs text-gray-900 leading-3 font-medium">
                    Very Big Deal
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-cyan-400" />
                  <span className="text-xs text-gray-900 leading-3 font-medium">
                    Another deal
                  </span>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="px-6 pt-5 pb-6">
              <div className="w-full bg-gray-200 h-44 rounded-md" />
            </div>
            <div className="px-1 pb-1">
              <div className="bg-gray-50 w-full h-9 rounded-b-sm flex space-x-6 items-center px-5">
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-green-400" />
                  <span className="text-xs text-gray-900 leading-3 font-medium">
                    Very Big Deal
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-cyan-400" />
                  <span className="text-xs text-gray-900 leading-3 font-medium">
                    Another deal
                  </span>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="px-6 pt-5 pb-6">
              <div className="w-full bg-gray-200 h-44 rounded-md" />
            </div>
            <div className="px-1 pb-1">
              <div className="bg-gray-50 w-full h-9 rounded-b-sm flex space-x-6 items-center px-5">
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-green-400" />
                  <span className="text-xs text-gray-900 leading-3 font-medium">
                    Very Big Deal
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-cyan-400" />
                  <span className="text-xs text-gray-900 leading-3 font-medium">
                    Another deal
                  </span>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Charts
