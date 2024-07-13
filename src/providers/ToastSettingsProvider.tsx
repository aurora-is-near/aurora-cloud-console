"use client"

import { createContext, ReactNode, useMemo } from "react"
import { ToastOptions, ToastPosition } from "react-hot-toast"

type ToastSettingsProviderProps = {
  children: ReactNode
  position?: ToastPosition
  options?: ToastOptions
}

type ToastSettingsContextType = {
  position: ToastPosition
  options: ToastOptions
}

const DEFAULT_POSITION: ToastPosition = "top-right"
const DEFAULT_OPTIONS: ToastOptions = { duration: 5000 }

const defaults: ToastSettingsContextType = {
  position: DEFAULT_POSITION,
  options: DEFAULT_OPTIONS,
}

export const ToastSettingsContext =
  createContext<ToastSettingsContextType>(defaults)

export const ToastSettingsProvider = ({
  children,
  position,
  options,
}: ToastSettingsProviderProps) => {
  const value = useMemo(
    (): ToastSettingsContextType => ({
      position: position ?? DEFAULT_POSITION,
      options: options ?? DEFAULT_OPTIONS,
    }),
    [position, options],
  )

  return (
    <ToastSettingsContext.Provider value={value}>
      {children}
    </ToastSettingsContext.Provider>
  )
}
