"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AUTH_CALLBACK_ROUTE, LINK_SENT_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { AuthInput } from "@/components/AuthInput"
import { AuthForm } from "@/components/AuthForm"

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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>()

  const signIn: SubmitHandler<Inputs> = async ({ email }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${document.location.origin}${AUTH_CALLBACK_ROUTE}`,
      },
    })

    if (error) {
      setError("root", {
        message: getErrorMessage(error.message),
      })
    }
  }

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

  // Redirect to a link sent screen once the form submission is successful
  useEffect(() => {
    if (!isSubmitSuccessful) {
      return
    }

    router.push(LINK_SENT_ROUTE)
  }, [isSubmitSuccessful, router])

  const error = errors.email ?? errors.root

  return (
    <AuthForm
      onSubmit={handleSubmit(signIn)}
      submitButtonText="Sign in"
      errorMessage={error?.message}
      isSubmitting={isSubmitting}
    >
      <AuthInput
        required
        id="email"
        name="email"
        label="Email address"
        register={register}
        registerOptions={{ required: true }}
        autoComplete="email"
      />
    </AuthForm>
  )
}

export default LoginForm
