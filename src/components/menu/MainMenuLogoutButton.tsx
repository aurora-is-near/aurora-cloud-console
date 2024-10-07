"use client"

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { MainMenuButton } from "@/components/menu/MainMenuButton"
import { LOGIN_ROUTE } from "@/constants/routes"

export const MainMenuLogoutButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const onClick = async () => {
    await supabase.auth.signOut()
    router.push(LOGIN_ROUTE)
  }

  return (
    <MainMenuButton
      name="Logout"
      onClick={onClick}
      icon={<ArrowRightOnRectangleIcon />}
    />
  )
}
