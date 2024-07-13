"use client"

import { useContext } from "react"
import { Toaster as ReactHotToaster } from "react-hot-toast"
import { ToastSettingsContext } from "@/providers/ToastSettingsProvider"

export const Toaster = () => {
  const toastSettings = useContext(ToastSettingsContext)

  return (
    <ReactHotToaster
      position={toastSettings.position}
      toastOptions={toastSettings.options}
    />
  )
}
