"use client"

import { createContext, useContext } from "react"

type RadioGroupContextValue = {
  selected: string
  isClickable: boolean
  onSelect: (v: string) => void
} | null

const RadioGroupContext = createContext<RadioGroupContextValue>(null)

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error("useRadioGroupContext must be used within a RadioGroup")
  }

  return context
}

export const RadioGroupContextProvider = RadioGroupContext.Provider
