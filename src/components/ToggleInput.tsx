"use client"

import { Toggle } from "@/components/Toggle"
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
    <Toggle
      id={id}
      name={name}
      checked={checked}
      {...register?.(name, registerOptions)}
      onChange={onChange}
      className={className}
    />
  )
}
