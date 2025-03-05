"use client"

import { useEffect, useId, useState } from "react"
import { ArrowPathIcon } from "@heroicons/react/24/solid"

import { clsx } from "../clsx"
import { Typography } from "../Typography"
import { InfoTooltip } from "../InfoTooltip"

import { RadioGroupContextProvider, useRadioGroupContext } from "./context"

type GroupProps = {
  isClickable: boolean
  defaultSelected: string
  children: React.ReactNode[]
  onSelect: (name: string) => void
}

const Group = ({
  children,
  isClickable,
  defaultSelected,
  onSelect,
}: GroupProps) => {
  const [selected, setSelected] = useState(defaultSelected)
  const onSelectItem = (value: string) => {
    setSelected(value)
    onSelect(value)
  }

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])

  return (
    <RadioGroupContextProvider
      value={{ selected, isClickable, onSelect: onSelectItem }}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </RadioGroupContextProvider>
  )
}

type ItemProps = {
  name: string
  label: string
  tooltip?: string
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}

const Item = ({
  name,
  label,
  tooltip,
  isLoading = false,
  className,
  children,
}: ItemProps) => {
  const id = useId()
  const { isClickable, selected, onSelect } = useRadioGroupContext()

  const isChecked = selected === name
  const isInteractive = isClickable && !isLoading

  return (
    <div
      className={clsx(
        "rounded-md ring-1",
        isChecked ? "ring-green-600 bg-green-50" : "ring-slate-200",
        isLoading ? "bg-slate-50" : "",
        className,
      )}
    >
      <label
        htmlFor={id}
        className={clsx("flex items-center gap-2 w-full p-3", {
          "cursor-pointer": isInteractive,
        })}
      >
        <div className="flex items-center h-6">
          <input
            id={id}
            name={name}
            type="radio"
            checked={isChecked}
            className={clsx(
              "accent-green-500 checked:bg-green-500 checked:focus:bg-green-500 checked:hover:bg-green-500",
              isInteractive ? "focus:ring-green-500" : "focus:ring-transparent",
            )}
            onChange={(v) => {
              if (isInteractive && v.target.checked) {
                onSelect(name)
              }
            }}
          />
        </div>

        <Typography variant="label" size={3} className="text-slate-900">
          {label}
        </Typography>

        {!!tooltip && <InfoTooltip>{tooltip}</InfoTooltip>}

        {isLoading ? (
          <div className="ml-auto">
            <ArrowPathIcon className="w-4 h-4 animate-spin stroke-3 stroke-slate-500 text-slate-500" />
          </div>
        ) : (
          children && <div className="ml-auto">{children}</div>
        )}
      </label>
    </div>
  )
}

export const RadioGroup = Object.assign(Group, { Item })
