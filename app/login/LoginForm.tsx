"use client"

import { Database } from "@/types/supabase"
import { useForm, SubmitHandler } from "react-hook-form"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import Button from "@/components/Button"
import { AUTH_CALLBACK_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"

type Inputs = {
  email: string
}

const LoginForm = () => {
  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>()

  const signIn: SubmitHandler<Inputs> = async ({ email }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}${AUTH_CALLBACK_ROUTE}`,
      },
    })

    if (error) {
      return setError("email", {
        message: error.message,
      })
    }
  }

  return isSubmitSuccessful ? (
    <div className="flex items-start justify-center text-white">
      <div className="flex-shrink-0">
        <CheckCircleIcon
          className="w-5 h-5 text-green-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3">
        <h2 className="text-sm font-medium text-white">Email link sent!</h2>
        <p className="mt-2 text-sm text-gray-400">
          Didn’t receive it?{" "}
          <button
            className="underline hover:text-white"
            onClick={() => reset(undefined, { keepValues: true })}
          >
            Try again.
          </button>
        </p>
      </div>
    </div>
  ) : (
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
        {errors.email && (
          <p className="text-sm text-center text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
    </form>
  )
}

export default LoginForm
