import clsx from "clsx"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { ComponentType, SVGProps } from "react"
import { Typography } from "@/uikit"
import { getButtonClassName } from "@/utils/buttons"

type ImageUploadInputProps<Inputs extends Record<string, unknown>> = {
  className?: string
  name: Path<Inputs>
  label: string
  register?: UseFormRegister<Inputs>
  registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  currentValue?: string
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const ImageUploadInput = <Inputs extends Record<string, unknown>>({
  className,
  name,
  label,
  register,
  registerOptions,
  currentValue,
  Icon,
}: ImageUploadInputProps<Inputs>) => {
  return (
    <div
      className={clsx(
        "p-3 border border-slate-200 rounded-[10px] shadow-sm flex flex-row justify-between",
        className,
      )}
    >
      <div className="flex flex-row items-center">
        {Icon && <Icon className="mr-3" />}
        <div className="flex flex-col">
          <Typography variant="label" size={3} className="text-slate-900 mb-1">
            {label}
          </Typography>
          {currentValue ? (
            <a
              href={currentValue}
              className="text-cyan-600 text-xs"
              target="_blank"
              rel="noreferrer"
            >
              {currentValue.split("/").pop()}
            </a>
          ) : (
            <Typography variant="paragraph" size={5} className="text-slate-500">
              Not uploaded
            </Typography>
          )}
        </div>
      </div>
      <label
        htmlFor={name}
        className={clsx("cursor-pointer", getButtonClassName("border", "sm"))}
      >
        Browse
      </label>
      <input
        type="file"
        id={name}
        name={name}
        className="hidden"
        {...register?.(name, registerOptions)}
      />
    </div>
  )
}
