"use client"

import { ToastSettingsContext } from "@/providers/ToastSettingsProvider"
import { useContext } from "react"
import { Toaster as ReactHotToaster } from "react-hot-toast"

export const Toaster = () => {
  const toastSettings = useContext(ToastSettingsContext)

  return (
    <ReactHotToaster
      position={toastSettings.position}
      toastOptions={toastSettings.options}
    />
  )
}
