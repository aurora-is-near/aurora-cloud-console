import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import {
  Path,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from "react-hook-form"
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValue,
  MultiValueRemoveProps,
  SingleValue,
} from "react-select"
import Creatable from "react-select/creatable"

export type SelectInputOption = {
  label: string
  value: string | number
}

export type SelectInputProps<Inputs extends Record<string, unknown>> = {
  id: string
  name: Path<Inputs>
  register?: UseFormRegister<Inputs>
  registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  placeholder?: string
  isClearable?: boolean
  isCreatable?: boolean
  options: SelectInputOption[]
} & (
  | {
      isMulti: true
      defaultValue?: SelectInputOption[]
      getValue?: (options: SelectInputOption[]) => unknown
    }
  | {
      isMulti?: never
      defaultValue?: SelectInputOption
      getValue?: (option?: SelectInputOption) => unknown
    }
)

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectInputOption>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="w-6" />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props: ClearIndicatorProps<SelectInputOption>) => {
  return (
    <components.ClearIndicator {...props}>
      <XMarkIcon className="w-6" />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps<SelectInputOption>) => {
  return (
    <components.MultiValueRemove {...props}>
      <XMarkIcon className="w-4" />
    </components.MultiValueRemove>
  )
}

const controlStyles = {
  base: "border rounded-lg bg-white hover:cursor-pointer",
  focus: "border-primary-600 ring-1 ring-primary-500",
  nonFocus: "border-slate-300 hover:border-slate-400",
}

const placeholderStyles = "text-slate-500 pl-1 py-0.5"
const selectInputStyles = "pl-1 py-0.5"
const valueContainerStyles = "p-1 gap-1"
const singleValueStyles = "leading-7 ml-1"
const multiValueStyles =
  "bg-slate-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5"

const multiValueLabelStyles = "leading-6 py-0.5"
const multiValueRemoveStyles =
  "border border-slate-200 bg-white hover:bg-red-50 hover:text-red-800 text-slate-500 hover:border-red-300 rounded-md"

const indicatorsContainerStyles = "p-1 gap-1"
const clearIndicatorStyles =
  "text-slate-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800"

const indicatorSeparatorStyles = "bg-slate-300"
const dropdownIndicatorStyles =
  "p-1 hover:bg-slate-100 text-slate-500 rounded-md hover:text-black"

const menuStyles = "p-1 mt-2 border border-slate-200 bg-white rounded-lg"
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-slate-500 text-sm"
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-slate-100 active:bg-slate-200",
  selected:
    "after:content-['✔'] after:ml-2 after:text-green-500 text-slate-500",
}

const noOptionsMessageStyles =
  "text-slate-500 p-2 bg-slate-50 border border-dashed border-slate-200 rounded-sm"

export const SelectInput = <Inputs extends Record<string, unknown>>({
  id,
  isMulti,
  name,
  register,
  registerOptions,
  options,
  defaultValue,
  isCreatable,
  getValue = (
    option?: MultiValue<SelectInputOption> | SingleValue<SelectInputOption>,
  ) => option,
  ...restProps
}: SelectInputProps<Inputs>) => {
  const wasDefaultSet = useRef(false)
  const { setValue, formState } = useFormContext()
  const [selectedOption, setSelectedOption] = useState<
    MultiValue<SelectInputOption> | SingleValue<SelectInputOption> | undefined
  >(defaultValue)

  const onChange = (
    option?: MultiValue<SelectInputOption> | SingleValue<SelectInputOption>,
  ) => {
    setSelectedOption(option)
    registerOptions?.onChange?.(option)
  }

  useEffect(() => {
    const contextDefaultValue = formState?.defaultValues?.[name]

    if (!selectedOption && contextDefaultValue && !wasDefaultSet.current) {
      setSelectedOption(contextDefaultValue)
      wasDefaultSet.current = true
    }
  }, [formState?.defaultValues, name, selectedOption])

  useEffect(() => {
    setValue(
      name,
      // @ts-ignore
      getValue(selectedOption),
    )
  }, [name, setValue, selectedOption, getValue])

  const Component = isCreatable ? Creatable : Select

  return (
    <Component
      instanceId={id}
      name={name}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base,
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base,
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      {...restProps}
      {...register?.(name, registerOptions)}
      options={options}
      onChange={onChange}
      value={selectedOption}
    />
  )
}
