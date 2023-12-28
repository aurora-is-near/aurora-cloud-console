"use client"

import { ReactNode, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClientComponentClient } from "@/supabase/create-client-component-client"

type User = { email: string; name: string | null } | null | undefined

type UserContext = {
  user: User
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContext>({} as UserContext)

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const { data: user } = useQuery({
    queryKey: ["user"],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      supabase
        .from("users")
        .select("email, name")
        .limit(1)
        .maybeSingle()
        .then((response) => {
          if (response.error) throw response.error
          return response.data
        }),
  })

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
