import Heading from "@/components/Heading"
import UserInfoForm from "./UserInfoForm"
import { serverSupabase } from "@/utils/supabase/server-supabase"

const Page = async () => {
  const supabase = serverSupabase()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) throw "No user found."

  return (
    <div className="space-y-4 sm:space-y-5">
      <Heading tag="h2">Account</Heading>
      <UserInfoForm hasPendingEmailChange={!!authUser.new_email} />
    </div>
  )
}

export default Page
