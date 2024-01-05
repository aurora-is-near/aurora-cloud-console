"use client"

import { CheckIcon, PencilIcon } from "@heroicons/react/20/solid"
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import Card from "@/components/Card"
import { useCurrentUser } from "@/utils/api/queries"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { Alert } from "@/components/Alert"
import { HorizontalInput } from "@/components/HorizontalInput"

// Track if the toast for email change has been shown already
let alerted = false

type Inputs = {
  name?: string
  email?: string
}

const UserInfoForm = ({
  hasPendingEmailChange,
}: {
  hasPendingEmailChange: boolean
}) => {
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm((prev) => !prev)
  const router = useRouter()
  const pathname = usePathname()
  const { data: user } = useCurrentUser()
  const getCurrentUserUpdater = useOptimisticUpdater("getCurrentUser")
  const { mutate: updateCurrentUser } = useMutation({
    mutationFn: apiClient.updateCurrentUser,
    onMutate: getCurrentUserUpdater.update,
    onSettled: getCurrentUserUpdater.invalidate,
  })

  // Handle coming back to page from email change confirmation
  useEffect(() => {
    if (alerted || !pathname || !router) return

    const fragment = window.location.hash.substring(1)
    if (!fragment) return

    const params = new URLSearchParams(fragment)

    const message = params.get("message")
    if (message) {
      // Show toast with prompt to open second email
      toast.success(message)
      router.replace(pathname)
      alerted = true
    }

    const accessToken = params.get("access_token")
    if (accessToken) {
      // Session is gone, refresh to direct to login page
      router.refresh()
    }
  }, [pathname, router])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const updateUser: SubmitHandler<Inputs> = async ({ name, email }) => {
    if (
      (!name && !email) ||
      (name === user?.name && email === user?.email) ||
      (!name && email === user?.email) ||
      (name === user?.name && !email)
    ) {
      return toggleForm()
    }

    try {
      if (email !== user?.email) {
        const supabase = createClientComponentClient()

        const { error } = await supabase.auth.updateUser(
          { email: email },
          {
            emailRedirectTo: `${location.origin}/settings/account`,
          },
        )

        if (error) throw "Email change failed."
      }

      if (name !== user?.name) {
        updateCurrentUser({ name })
      }

      setShowForm(false)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <Card.Title tag="h3">Personal information</Card.Title>
      <Card.Actions>
        {showForm ? (
          <>
            <Button
              style="secondary"
              onClick={toggleForm}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit(updateUser)} loading={isSubmitting}>
              <CheckIcon className="w-5 h-5" />
              <span>Save</span>
            </Button>
          </>
        ) : (
          <Button style="secondary" onClick={toggleForm}>
            <PencilIcon className="w-5 h-5" />
            <span>Edit</span>
          </Button>
        )}
      </Card.Actions>
      <div className="px-6 pb-7">
        {showForm ? (
          <form onSubmit={handleSubmit(updateUser)} className="space-y-4">
            <HorizontalInput
              id="name"
              name="name"
              label="Name"
              autoComplete="name"
              register={register}
              registerOptions={{
                value: user?.name ?? "",
              }}
            />

            <HorizontalInput
              id="email"
              name="email"
              label="Email"
              autoComplete="email"
              register={register}
              registerOptions={{
                value: user?.email ?? "",
              }}
            />

            <Alert type="info">
              Updating your email requires confirmation through links sent to
              both the old and the new email addresses.
            </Alert>
          </form>
        ) : (
          <dl className="space-y-4">
            <div className="items-center sm:grid sm:grid-cols-2 h-9">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Name
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {user?.name || "-"}
              </dd>
            </div>
            <div className="items-center sm:grid sm:grid-cols-2 h-9">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Email
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {user?.email}
              </dd>
            </div>

            {hasPendingEmailChange && (
              <Alert dismissable type="info">
                You have requested an email change. Please confirm it through
                the links sent to both the old and the new email addresses.
              </Alert>
            )}
          </dl>
        )}
      </div>
    </Card>
  )
}

export default UserInfoForm
