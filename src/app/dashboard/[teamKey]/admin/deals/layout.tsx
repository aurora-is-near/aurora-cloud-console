"use client"

import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"

const Layout = ({ children }: { children: ReactNode }) => {
  const methods = useForm()

  return <FormProvider {...methods}>{children}</FormProvider>
}

export default Layout
