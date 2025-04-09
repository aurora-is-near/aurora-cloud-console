import { TeamPage } from "@/app/dashboard/[teamKey]/settings/team/TeamPage"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const authUser = await getAuthUser()

  if (!authUser) {
    throw new Error("No user found")
  }

  return <TeamPage teamKey={teamKey} authUser={authUser} />
}

export default Page
