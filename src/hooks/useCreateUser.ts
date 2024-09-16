import { useMutation } from "@tanstack/react-query"
import { createUser } from "@/actions/users/create-user"

export function useCreateUser() {
  return useMutation({
    mutationFn: ({
      email,
      name,
      company,
      marketing_consent,
      redirect_url,
    }: {
      email: string
      name: string
      company: string
      marketing_consent: boolean
      redirect_url: string
    }) => createUser({ email, name, company, marketing_consent, redirect_url }),
  })
}
