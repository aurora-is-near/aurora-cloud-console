"use client"

import { usePathname, useRouter } from "next/navigation"
import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import { Silo } from "@/types/types"

type SiloSelectProps = {
  silos: Silo[]
  defaultValue: number
}

export const SiloSelect = ({ silos, defaultValue }: SiloSelectProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div>
      <label htmlFor="silo" className="sr-only">
        Selected silo
      </label>

      <Listbox
        defaultValue={String(defaultValue)}
        onChange={(value) =>
          router.push(pathname.replace(/\/silos\/\d+/, `/silos/${value}`))
        }
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-2 text-left text-slate-900 group hover:bg-slate-100">
            <div className="flex items-center justify-between">
              <span className="block truncate">
                {silos.find((silo) => silo.id === defaultValue)?.name ??
                  "Select silo"}
              </span>
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-slate-900"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg text-sm lg:text-base">
            {silos.map((silo) => (
              <Listbox.Option
                key={silo.id}
                className={({ active }) =>
                  clsx(
                    "relative cursor-pointer select-none py-2 pl-4 pr-4",
                    active ? "bg-slate-100 text-slate-900" : "text-slate-900",
                  )
                }
                value={silo.id}
              >
                {({ selected }) => (
                  <span
                    className={clsx(
                      "block truncate",
                      selected ? "font-medium" : "font-normal",
                    )}
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
