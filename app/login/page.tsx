import LoginForm from "@/app/login/LoginForm"
import { Heading } from "./Heading"

export default function Page() {
  return (
    <>
      <Heading className="mb-10">Sign in to your account</Heading>
      <LoginForm />
    </>
  )
}
