import Heading from "@/components/Heading"
import UserInfoForm from "./UserInfoForm"
import { serverSupabase } from "@/utils/serverSupabase"

const Page = async () => {
  const supabase = serverSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw "No user found."

  const { data } = await supabase
    .from("users")
    .select("email, name")
    .limit(1)
    .maybeSingle()

  if (!data) throw "No user data found."

  return (
    <div className="space-y-7">
      <Heading tag="h2">Account</Heading>
      <UserInfoForm info={data} hasPendingEmailChange={!!user.new_email} />
    </div>
  )
}

export default Page
