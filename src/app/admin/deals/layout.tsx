"use client"

import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"

export default function Layout({ children }: { children: ReactNode }) {
  const methods = useForm()

  return <FormProvider {...methods}>{children}</FormProvider>
}
