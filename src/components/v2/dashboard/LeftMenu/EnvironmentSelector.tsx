import { useState } from "react"
import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Button from "@/components/v2/Button"
import { useTeamContext } from "@/contexts/TeamContext"
import { IconPlus } from "../../../../../public/static/v2/images/menuIcons"

type Environment = "Devnet" | "Mainnet"

// Need to figure out how to get the environments from the backend
const mockEnvironments: Environment[] = ["Devnet", "Mainnet"]

export const EnvironmentSelector = () => {
  const { team, silos } = useTeamContext()

  const teamKey = team.team_key

  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(
      mockEnvironments.length > 0 ? mockEnvironments[1] : null,
    )

  if (mockEnvironments.length === 0) {
    return null
  }

  if (silos.length === 0) {
    return (
      <Button
        title="Create Aurora Chain"
        key="Create Aurora Chain"
        path={`/dashboard_v2/${teamKey}/create_chain`}
        className="bg-slate-900 text-slate-100 hover:bg-slate-800 mb-3"
        icon={<IconPlus className="h-4 w-4" />}
      />
    )
  }

  return (
    <Listbox value={selectedEnvironment} onChange={setSelectedEnvironment}>
      <div className="relative mt-1 mb-3">
        <Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-200 bg-white p-2 text-left text-slate-900 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 group hover:bg-slate-100">
          <div className="flex items-center justify-between">
            <span className="block truncate">
              {selectedEnvironment ?? "Select Environment"}
            </span>
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400 group-hover:text-slate-900"
                aria-hidden="true"
              />
            </div>
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {mockEnvironments.map((environment) => (
            <Listbox.Option
              key={environment}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-4 pr-4 ${
                  active ? "bg-slate-100 text-slate-900" : "text-slate-900"
                }`
              }
              value={environment}
            >
              {({ selected }) => (
                <span
                  className={`block truncate ${
                    selected ? "font-medium" : "font-normal"
                  }`}
                >
                  {environment}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
