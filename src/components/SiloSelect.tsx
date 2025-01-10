"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
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
          <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-slate-200 bg-white pl-3 pr-2 py-2 text-left font-medium text-slate-900 group hover:bg-slate-100 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="block truncate">
                {silos.find((silo) => silo.id === defaultValue)?.name ??
                  "Select silo"}
              </span>
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-slate-900"
                  aria-hidden="true"
                />
              </div>
            </div>
          </ListboxButton>
          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg text-sm lg:text-base">
            {silos.map((silo) => (
              <ListboxOption
                key={silo.id}
                className={({ focus }) =>
                  clsx(
                    "relative cursor-pointer select-none py-2 pl-4 pr-4",
                    focus ? "bg-slate-100 text-slate-900" : "text-slate-900",
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
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}
