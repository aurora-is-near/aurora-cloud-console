"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AUTH_CALLBACK_ROUTE, LINK_SENT_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { AuthInput } from "@/components/AuthInput"
import { AuthForm } from "@/components/AuthForm"
import { EMAIL_QUERY_PARAM, SIGNUP_QUERY_PARAM } from "@/constants/auth"

type Inputs = {
  email: string
  name: string
  company: string
  marketing_consent?: boolean
}

export const SignUpForm = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const signUp: SubmitHandler<Inputs> = async ({ email, name, company }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${document.location.origin}${AUTH_CALLBACK_ROUTE}`,

        // A database trigger that is fired on `auth.user` creation will use
        // this data to set the user's name and create a team
        data: {
          name,
          company,
        },
      },
    })

    if (error) {
      setError("root", {
        message: error.message,
      })

      return
    }

    const searchParams = new URLSearchParams()

    searchParams.set(EMAIL_QUERY_PARAM, email)
    searchParams.set(SIGNUP_QUERY_PARAM, "1")

    router.push(`${LINK_SENT_ROUTE}?${searchParams}`)
  }

  const error = errors.email ?? errors.root

  return (
    <AuthForm
      onSubmit={handleSubmit(signUp)}
      submitButtonText="Sign up"
      errorMessage={error?.message}
      isSubmitting={isSubmitting}
      footer={{
        text: "Already have an account?",
        link: "/auth/login",
        linkText: "Sign in",
      }}
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
      <AuthInput
        required
        id="name"
        name="name"
        label="Full name"
        register={register}
        registerOptions={{ required: true }}
      />
      <AuthInput
        required
        id="company"
        name="company"
        label="Company name"
        register={register}
        registerOptions={{ required: true }}
      />

      <div className="flex items-start ">
        <input
          id="marketing_consent"
          type="checkbox"
          className="h-4 w-4 bg-slate-800 rounded mt-1 border-gray-300 text-green-600 focus:ring-green-500"
          {...register("marketing_consent")}
        />
        <label
          htmlFor="marketing_consent"
          className="ml-2 block text-sm text-slate-300"
        >
          Get emails from Aurora Cloud about product updates, industry news, and
          events. Unsubscribe at any time.
          <br />
          <Link
            target="_blank"
            href="https://auroracloud.dev/privacy"
            className="text-slate-100"
          >
            Privacy Policy
          </Link>
        </label>
      </div>
    </AuthForm>
  )
}
