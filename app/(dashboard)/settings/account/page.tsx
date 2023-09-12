import Heading from "@/components/Heading"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import UserInfoForm from "./UserInfoForm"

const Page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

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
