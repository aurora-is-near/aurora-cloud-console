"use client"

import { CalendarDaysIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import format from "date-fns/format"
import {
  Path,
  RegisterOptions,
  UseFormRegister,
  useFormContext,
  useWatch,
} from "react-hook-form"

type DateInputProps<Inputs extends Record<string, unknown>> = {
  id: string
  name: Path<Inputs>
  register?: UseFormRegister<Inputs>
  registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  placeholder?: string
  defaultValue?: string | null
}

export const DateInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  register,
  registerOptions,
  placeholder,
  defaultValue,
}: DateInputProps<Inputs>) => {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null,
  )

  const { setValue, watch } = useFormContext()
  const watchedValue = useWatch({ name })

  useEffect(() => {
    setValue(
      name,
      // @ts-ignore
      startDate?.toISOString() ?? null,
    )
  }, [startDate, name, setValue])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none Z-10">
        <CalendarDaysIcon className="w-5 h-5 text-gray-500 z-50" />
      </div>
      <DatePicker
        id={id}
        placeholderText={placeholder}
        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ps-10"
        {...register?.(name, registerOptions)}
        onChange={setStartDate}
        value={
          watchedValue
            ? format(new Date(watchedValue), "dd/MM/yyyy")
            : undefined
        }
      />
    </div>
  )
}
