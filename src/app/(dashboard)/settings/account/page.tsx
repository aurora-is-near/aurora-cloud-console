import UserInfoForm from "./UserInfoForm"
import { createServerComponentClient } from "@/supabase/create-server-component-client"
import differenceInHours from "date-fns/differenceInHours"
import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

const PENDING_EMAIL_CHANGE_MAX_HOURS = 24

const Page = async () => {
  const supabase = createServerComponentClient()

  const [
    {
      data: { user: authUser },
    },
    currentUser,
  ] = await Promise.all([supabase.auth.getUser(), getCurrentUser()])

  if (!authUser || !currentUser) throw "No user found."

  // The pending email change will expire by default after 24 hours.
  const hasRecentEmailChange = authUser.email_change_sent_at
    ? differenceInHours(new Date(), new Date(authUser.email_change_sent_at)) <=
      PENDING_EMAIL_CHANGE_MAX_HOURS
    : false

  const hasPendingEmailChange = !!authUser.new_email && hasRecentEmailChange

  return (
    <DashboardPage heading="Account">
      <UserInfoForm
        hasPendingEmailChange={hasPendingEmailChange}
        currentUser={currentUser}
      />
    </DashboardPage>
  )
}

export default Page
