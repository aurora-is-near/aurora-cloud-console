import LoginForm from "@/app/auth/login/LoginForm"
import { AuthHeading } from "@/components/AuthHeading"

const Page = () => {
  return (
    <>
      <AuthHeading className="my-10">Sign in to your account</AuthHeading>
      <LoginForm />
    </>
  )
}

export default Page
