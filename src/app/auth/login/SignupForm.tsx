import { useState } from "react"
import { useForm, UseFormRegister } from "react-hook-form"
import Link from "next/link"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/Button"
import { createUser } from "@/actions/users/create-user"
import { AUTH_CALLBACK_ROUTE } from "@/constants/routes"

type SignupFormData = {
  name: string
  email: string
  company: string
  marketing_consent: boolean
}

const FormInput = ({
  id,
  type,
  autoComplete,
  placeholder,
  register,
}: {
  id: keyof SignupFormData
  type: string
  autoComplete: string
  placeholder: string
  register: UseFormRegister<SignupFormData>
}) => (
  <div>
    <div className="mt-2">
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
        {...register(id, { required: true })}
      />
    </div>
  </div>
)

const SignupForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [error, setError] = useState<Error | null>(null)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<SignupFormData>()

  const signUp = async (data: SignupFormData) => {
    try {
      await createUser({
        ...data,
        ...{
          redirect_url: `${document.location.origin}${AUTH_CALLBACK_ROUTE}`,
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error("An unknown error occurred during signup"))
      }
    }
  }

  return isSubmitSuccessful && isValid ? (
    <div className="flex items-start justify-center text-white">
      <div className="flex-shrink-0">
        <CheckCircleIcon
          className="w-5 h-5 text-green-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3">
        <h2 className="text-sm font-medium text-white">
          Done! You will receive a link on your email to Sign In.
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Didn’t receive it?{" "}
          <button
            type="button"
            className="underline hover:text-white"
            onClick={toggleForm}
          >
            Try signing in.
          </button>
        </p>
      </div>
    </div>
  ) : (
    <form className="space-y-6" onSubmit={handleSubmit(signUp)}>
      <FormInput
        id="email"
        type="email"
        autoComplete="email"
        placeholder="Email address"
        register={register}
      />
      <FormInput
        id="name"
        type="text"
        autoComplete="given-name"
        placeholder="Full name"
        register={register}
      />
      <FormInput
        id="company"
        type="text"
        autoComplete="organization"
        placeholder="Company name"
        register={register}
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
          className="ml-2 block text-xs text-slate-300"
        >
          Get emails from Aurora Cloud about product updates, industry news, and
          events. Unsubscribe at any time.{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </label>
      </div>

      <Button loading={isSubmitting} type="submit" fullWidth>
        Sign up
      </Button>

      {error && (
        <div className="h-5">
          <p className="text-sm text-center text-red-500">{error.message}</p>
        </div>
      )}
    </form>
  )
}

export default SignupForm
