import UserInfoForm from "./UserInfoForm"
import { createServerComponentClient } from "@/supabase/create-server-component-client"
import differenceInHours from "date-fns/differenceInHours"
import { DashboardPage } from "@/components/DashboardPage"

const PENDING_EMAIL_CHANGE_MAX_HOURS = 24

const Page = async () => {
  const supabase = createServerComponentClient()

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
    <DashboardPage heading="Account">
      <UserInfoForm hasPendingEmailChange={hasPendingEmailChange} />
    </DashboardPage>
  )
}

export default Page
