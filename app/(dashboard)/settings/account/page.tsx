import Heading from "@/components/Heading"
import UserInfoForm from "./UserInfoForm"
import { serverSupabase } from "@/utils/supabase/server-supabase"
import { differenceInHours } from "date-fns"

const PENDING_EMAIL_CHANGE_MAX_HOURS = 24

const Page = async () => {
  const supabase = serverSupabase()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) throw "No user found."

  // The pending email change will expire by default after 24 hours.
  const hasRecentEmailChange = authUser.email_change_sent_at
    ? differenceInHours(new Date(), new Date(authUser.email_change_sent_at)) <=
      PENDING_EMAIL_CHANGE_MAX_HOURS
    : false

  const hasPendingEmailChange = !!authUser.new_email && hasRecentEmailChange

  return (
    <div className="space-y-4 sm:space-y-5">
      <Heading tag="h2">Account</Heading>
      <UserInfoForm hasPendingEmailChange={hasPendingEmailChange} />
    </div>
  )
}

export default Page
