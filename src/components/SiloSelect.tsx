"use client"

import { useEffect, useState } from "react"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useTeamKey } from "@/hooks/useTeamKey"
import { Silo } from "@/types/types"

type SiloSelectProps = {
  silos: Silo[]
}

export const SiloSelect = ({ silos }: SiloSelectProps) => {
  const [option, setOption] = useState("")
  const router = useRouter()
  const teamKey = useTeamKey()
  const [, id, subroute] = useSelectedLayoutSegments()

  useEffect(() => {
    setOption(id ?? "Select silo")
  }, [id])

  return (
    <div>
      <label htmlFor="silo" className="sr-only">
        Selected silo
      </label>

      <Listbox
        value={option}
        onChange={(e) =>
          router.push(
            `/dashboard/${teamKey}/silos/${e}${
              subroute ? `/${subroute}` : "/"
            }`,
          )
        }
      >
        <div className="relative mt-1 mb-3">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-200 bg-white p-2 text-left text-slate-900 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 group hover:bg-slate-100">
            <div className="flex items-center justify-between">
              <span className="block truncate">{option ?? "Select silo"}</span>
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-slate-900"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {silos.map((silo) => (
              <Listbox.Option
                key={silo.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 pr-4 ${
                    active ? "bg-slate-100 text-slate-900" : "text-slate-900"
                  }`
                }
                value={silo.id}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {silo.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}
