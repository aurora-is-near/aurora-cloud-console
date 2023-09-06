import Heading from "@/components/Heading"
import UserInfoForm from "@/components/UserInfoForm"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

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
    <>
      <Heading tag="h2">Account</Heading>
      <UserInfoForm info={data} hasPendingEmailChange={!!user.new_email} />
    </>
  )
}

export default Page
