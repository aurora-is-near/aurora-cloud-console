import Heading from "@/components/Heading"
import UserInfoForm from "./UserInfoForm"
import { createServerComponentClient } from "@/supabase/create-server-component-client"

const Page = async () => {
  const supabase = createServerComponentClient()

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
