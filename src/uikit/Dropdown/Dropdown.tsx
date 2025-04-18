"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

import { clsx, Typography } from "@/uikit"

export type Option = {
  value: string
  label: string
}

type Props = {
  selected: Option
  options: Option[]
  className?: string
} & (
  | {
      isDisabled?: false
      onChange: (value: Option) => void
    }
  | {
      isDisabled: true
      onChange?: (value: Option) => void
    }
)

export const Dropdown = ({ options, selected, className, ...props }: Props) => {
  // HACK: Listbox throws "Too many re-renders" in test mode
  // https://github.com/tailwindlabs/headlessui/issues/3476#issuecomment-2620026394
  if (process.env.NODE_ENV === "test") return null

  return (
    <Listbox value={selected} onChange={props.onChange}>
      <div className={clsx("relative", className)}>
        <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-slate-400 bg-white py-1 pl-3 pr-2 text-left font-medium text-slate-900 group hover:bg-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <Typography
              variant="label"
              size={2}
              className="block truncate text-slate-900"
            >
              {selected.label}
            </Typography>
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <ChevronDownIcon
                className="h-6 w-6 text-gray-900 group-hover:text-slate-900 group-data-[headlessui-state=open]:rotate-180"
                aria-hidden="true"
              />
            </div>
          </div>
        </ListboxButton>
        <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg text-sm lg:text-base z-[1]">
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className={({ focus }) =>
                clsx(
                  "relative cursor-pointer select-none py-2 pl-4 pr-4",
                  focus ? "bg-slate-100 text-slate-900" : "text-slate-900",
                )
              }
            >
              {({ selected: isSelectedOption }) => (
                <Typography
                  variant="label"
                  size={3}
                  className={clsx(
                    "block truncate",
                    isSelectedOption ? "font-medium" : "font-normal",
                  )}
                >
                  {option.label}
                </Typography>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
