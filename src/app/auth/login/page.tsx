import LoginForm from "@/app/auth/login/LoginForm"
import { Heading } from "./Heading"

const Page = () => {
  return (
    <>
      <Heading className="mb-10">Sign in to your account</Heading>
      <LoginForm />
    </>
  )
}

export default Page
