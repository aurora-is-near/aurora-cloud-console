import { useState } from "react"
import { useForm, UseFormRegister } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/Button"

type SignupFormData = {
  firstName: string
  email: string
  companyName: string
  marketingConsent: boolean
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

const SignupForm = () => {
  const [error, setError] = useState<Error | null>(null)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormData>()

  const signUp = async (data: SignupFormData) => {
    try {
      // TODO
      console.log("Signup data:", data)
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(signUp)}>
      <FormInput
        id="email"
        type="email"
        autoComplete="email"
        placeholder="Email address"
        register={register}
      />
      <FormInput
        id="firstName"
        type="text"
        autoComplete="given-name"
        placeholder="Full name"
        register={register}
      />
      <FormInput
        id="companyName"
        type="text"
        autoComplete="organization"
        placeholder="Company name"
        register={register}
      />

      <div className="flex items-start ">
        <input
          id="marketingConsent"
          type="checkbox"
          className="h-4 w-4 bg-slate-800 rounded mt-1 border-gray-300 text-green-600 focus:ring-green-500"
          {...register("marketingConsent")}
        />
        <label
          htmlFor="marketingConsent"
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
