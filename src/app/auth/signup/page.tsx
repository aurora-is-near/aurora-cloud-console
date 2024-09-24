import { SignUpForm } from "@/app/auth/signup/SignUpForm"
import { AuthHeading } from "@/components/AuthHeading"
import { FullScreenPage } from "@/components/FullScreenPage"

const Page = () => {
  return (
    <FullScreenPage>
      <AuthHeading className="my-10">Create account</AuthHeading>
      <SignUpForm />
    </FullScreenPage>
  )
}

export default Page
