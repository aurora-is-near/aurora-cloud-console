import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

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
      className={
        "text-gray-500 w-full hover:lg:text-gray-900 hover:lg:bg-gray-100 flex items-center gap-x-2.5 rounded-lg py-3 px-3 lg:px-3.5 text-base leading-4 font-semibold"
      }
    >
      <ArrowRightOnRectangleIcon className="w-6 h-6" aria-hidden="true" />
      <span>Log out</span>
    </button>
  )
}

export default SignoutButton
