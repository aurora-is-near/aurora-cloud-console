"use client"

import { Switch } from "@headlessui/react"
import clsx from "clsx"
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react"
import {
  Path,
  RegisterOptions,
  UseFormRegister,
  useFormContext,
} from "react-hook-form"

export type ToggleInputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  }

export const ToggleInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  className,
  register,
  registerOptions,
  defaultChecked = false,
}: ToggleInputProps<Inputs>) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked)

  const { setValue } = useFormContext()

  useEffect(() => {
    setValue(
      name,
      // @ts-ignore
      checked,
    )
  }, [checked, name, setValue])

  const onChange = (isChecked: boolean) => {
    setChecked(isChecked)
  }

  return (
    <Switch
      id={id}
      name={name}
      checked={checked}
      {...register?.(name, registerOptions)}
      onChange={onChange}
      className={clsx(
        checked ? "bg-green-500" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
        className,
      )}
    >
      <span className="sr-only">Toggle {checked ? "off" : "on"}</span>
      <span
        aria-hidden="true"
        className={clsx(
          checked ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  )
}
