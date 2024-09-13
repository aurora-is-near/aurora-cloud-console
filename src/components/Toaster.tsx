"use client"

import { Toaster as ReactHotToaster } from "react-hot-toast"

export const Toaster = () => {
  return (
    <ReactHotToaster position="top-right" toastOptions={{ duration: 5000 }} />
  )
}
