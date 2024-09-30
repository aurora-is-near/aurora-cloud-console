import { NotAllowed } from "@/components/NotAllowed"

const Page = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <NotAllowed
        title="You are not a member of this team"
        description="If you believe you should be a member of this team please contact your team administrator."
        showRefreshButton
        showLogoutButton
      />
    </div>
  )
}

export default Page
