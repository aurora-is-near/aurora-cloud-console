"use client"

import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import clsx from "clsx"

const options = [
  {
    title: "Open List",
    description: "Any wallet address will get free transactions.",
  },
  {
    title: "Whitelist",
    description:
      "Only the wallet addresses from the selected segments will get free transactions",
  },
]

const AccessSelector = () => {
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="px-4 pb-4 sm:pb-5 md:pb-6 sm:px-5 md:px-6">
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">
          Select user access type
        </RadioGroup.Label>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {options.map((plan) => (
            <RadioGroup.Option
              key={plan.title}
              value={plan}
              className={({ active, checked }) =>
                clsx(
                  "relative cursor-pointer rounded-[10px] p-3.5 focus:outline-none text-center flex flex-col items-center justify-center border",
                  {
                    "ring-2 ring-white ring-offset-1 ring-offset-green-600":
                      active,
                    "bg-green-100 border-green-600": checked,
                    "bg-gray-100 border-gray-300": !checked,
                  }
                )
              }
            >
              <RadioGroup.Label
                as="p"
                className="text-sm font-medium leading-none text-gray-900"
              >
                {plan.title}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="span"
                className="max-w-xs mt-1 text-sm text-gray-500"
              >
                {plan.description}
              </RadioGroup.Description>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default AccessSelector
