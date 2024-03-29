import { NotAllowed } from "@/app/auth/login/NotAllowed"
import { AuthPage } from "@/components/AuthPage"

const Page = () => {
  return (
    <AuthPage>
      <NotAllowed title="404" description="Page not found." />
    </AuthPage>
  )
}

export default Page
