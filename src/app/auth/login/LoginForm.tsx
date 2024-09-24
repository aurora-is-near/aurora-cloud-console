"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/Button"
import { AUTH_CALLBACK_ROUTE, LINK_SENT_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"

type Inputs = {
  email: string
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
        emailRedirectTo: `${document.location.origin}${AUTH_CALLBACK_ROUTE}`,
      },
    })

    if (error) {
      setError("email", {
        message: error.message,
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
    <form className="space-y-6" onSubmit={handleSubmit(signIn)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-white"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            {...register("email", { required: true })}
          />
        </div>
      </div>

      <Button loading={isSubmitting} type="submit" fullWidth>
        Sign in
      </Button>

      <div className="h-5">
        {error && (
          <p className="text-sm text-center text-red-500">{error.message}</p>
        )}
      </div>
    </form>
  )
}

export default LoginForm
