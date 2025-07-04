"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { AUTH_CALLBACK_ROUTE, LINK_SENT_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { AuthInput } from "@/components/AuthInput"
import { AuthForm } from "@/components/AuthForm"
import { EMAIL_QUERY_PARAM } from "@/constants/auth"
import { isAdminUser } from "@/utils/admin"

type Inputs = {
  email: string
}

const getErrorMessage = (originalMessage: string) => {
  if (originalMessage === "Signups not allowed for otp") {
    return "We couldn't find your account. Please sign up first."
  }

  return originalMessage
}

const LoginForm = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const signIn: SubmitHandler<Inputs> = useCallback(
    async ({ email }) => {
      // For regular users we need some additional information from them in
      // order to create an account, so we force them through the sign up flow.
      // Admin users can sign in directly, as they will have access to all teams
      // by default.
      const shouldCreateUser = isAdminUser(email)

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser,
          emailRedirectTo: `${document.location.origin}${AUTH_CALLBACK_ROUTE}`,
        },
      })

      if (error) {
        setError("email", {
          message: getErrorMessage(error.message),
        })

        return
      }

      const searchParams = new URLSearchParams()

      searchParams.set(EMAIL_QUERY_PARAM, email)

      router.push(`${LINK_SENT_ROUTE}?${searchParams}`)
    },
    [router, setError, supabase],
  )

  useEffect(() => {
    // http://localhost:3000/login#error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired
    const { hash } = window.location

    if (!hash) {
      return
    }

    const params = new URLSearchParams(hash)
    const errorDescription = params.get("error_description")

    if (!errorDescription) {
      return
    }

    setError("root", {
      message: errorDescription,
    })
  }, [setError])

  return (
    <AuthForm
      onSubmit={handleSubmit(signIn)}
      submitButtonText="Send sign-in link"
      errorMessage={errors.root?.message}
      isSubmitting={isSubmitting}
      footer={{
        text: "New to Aurora Cloud?",
        link: "/auth/signup",
        linkText: "Create account",
      }}
    >
      <AuthInput
        required
        id="email"
        name="email"
        label="Email address"
        register={register}
        registerOptions={{ required: true }}
        errorMessage={errors.email?.message}
        autoComplete="email"
      />
    </AuthForm>
  )
}

export default LoginForm
