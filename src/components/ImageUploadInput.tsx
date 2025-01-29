import clsx from "clsx"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { ComponentType, SVGProps, useCallback, useRef, useState } from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { Typography } from "@/uikit"
import { getButtonClassName } from "@/utils/buttons"
import { Button } from "@/components/Button"

type ImageUploadInputProps<Inputs extends Record<string, unknown>> = {
  className?: string
  name: Path<Inputs>
  label: string
  register?: UseFormRegister<Inputs>
  registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  defaultValue?: string
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const ImageUploadInput = <Inputs extends Record<string, unknown>>({
  className,
  name,
  label,
  register,
  registerOptions,
  defaultValue,
  Icon,
}: ImageUploadInputProps<Inputs>) => {
  const [value, setValue] = useState<string | null>(defaultValue ?? null)
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileName = event.target.value.split("\\").pop()

      if (fileName) {
        setValue(fileName)
      }

      await register?.(name, registerOptions).onChange(event)
    },
    [name, register, registerOptions],
  )

  const onDeleteClick = useCallback(() => {
    setValue(null)

    if (ref.current) {
      ref.current.value = ""
    }
  }, [])

  return (
    <div
      className={clsx(
        "p-3 border border-slate-200 rounded-[10px] shadow-sm flex flex-row justify-between items-center",
        className,
      )}
    >
      <div className="flex flex-row items-center">
        {Icon && <Icon className="mr-3" />}
        <div className="flex flex-col">
          <Typography variant="label" size={3} className="text-slate-900 mb-1">
            {label}
          </Typography>
          {value ? (
            <a
              href={value}
              className="text-cyan-600 text-xs"
              target="_blank"
              rel="noreferrer"
            >
              {value.split("/").pop()}
            </a>
          ) : (
            <Typography variant="paragraph" size={5} className="text-slate-500">
              Not uploaded
            </Typography>
          )}
        </div>
      </div>
      {value ? (
        <Button variant="border" onClick={onDeleteClick}>
          <TrashIcon className="w-5 h-5 text-gray-900" />
        </Button>
      ) : (
        <label
          htmlFor={name}
          className={clsx("cursor-pointer", getButtonClassName("border", "sm"))}
        >
          Browse
        </label>
      )}
      <input
        ref={ref}
        type="file"
        id={name}
        name={name}
        className="hidden"
        {...register?.(name, registerOptions)}
        onChange={handleChange}
      />
    </div>
  )
}
