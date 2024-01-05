"use client"

import React, { ReactNode, createContext } from "react"

type AdminProviderProps = {
  children: ReactNode
  isAdmin: boolean
}

export const AdminContext = createContext<{ isAdmin: boolean } | null>(null)

export const AdminProvider = ({ children, isAdmin }: AdminProviderProps) => (
  <AdminContext.Provider value={{ isAdmin }}>{children}</AdminContext.Provider>
)
