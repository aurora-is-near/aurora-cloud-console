"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

type AdminToastProps = {
  itemName: string
}

export const AdminToast = ({ itemName }: AdminToastProps) => {
  const wasShown = useRef(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const operation = searchParams.get("operation")

    if (!operation || wasShown.current) {
      return
    }

    toast.success(`${itemName} ${operation}`)
    wasShown.current = true
  }, [itemName, searchParams, wasShown])

  return null
}
