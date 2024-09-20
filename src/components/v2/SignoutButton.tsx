"use client"

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const SignoutButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
      onClick={signOut}
      type="button"
      className="text-slate-300 hover:lg:text-slate-100 px-3"
    >
      <ArrowRightOnRectangleIcon className="w-6 h-6" aria-hidden="true" />
    </button>
  )
}

export default SignoutButton
