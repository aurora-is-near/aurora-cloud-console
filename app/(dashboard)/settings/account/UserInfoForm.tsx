"use client"

import {
  CheckIcon,
  InformationCircleIcon,
  PencilIcon,
} from "@heroicons/react/20/solid"
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Button from "@/components/Button"
import Card from "@/components/Card"
import { useCurrentUser } from "@/utils/api/queries"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"

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
  const getCurrentUserUpdater = useOptimisticUpdater('getCurrentUser')
  const { mutate: updateCurrentUser } = useMutation({
    mutationFn: apiClient.updateCurrentUser,
    onMutate: getCurrentUserUpdater.update,
    onError: getCurrentUserUpdater.revert,
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
        const supabase = createClientComponentClient<Database>()

        const { error } = await supabase.auth.updateUser(
          { email: email },
          {
            emailRedirectTo: location.origin + "/settings/account",
          }
        )

        if (error) throw "Email change failed."
      }

      if (name !== user?.name) {
        updateCurrentUser({ name })
      }

      setShowForm(false)
      router.refresh()
    } catch (error) {
      console.log(error)
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
            <div className="sm:grid sm:grid-cols-2 h-9 items-center">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-none text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                autoComplete="name"
                {...register("name", {
                  value: user?.name ?? "",
                })}
              />
            </div>
            <div className="sm:grid sm:grid-cols-2 h-9 items-center">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-none text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                autoComplete="email"
                {...register("email", {
                  value: user?.email ?? "",
                })}
              />
            </div>

            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon
                    className="h-5 w-5 text-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-blue-700">
                    Updating your email requires confirmation through links sent
                    to both the old and the new email addresses.
                  </p>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <dl className="space-y-4">
            <div className="sm:grid sm:grid-cols-2 h-9 items-center">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Name
              </dt>
              <dd className="text-sm leading-none text-gray-900 mt-2 sm:mt-0">
                {user?.name || "-"}
              </dd>
            </div>
            <div className="sm:grid sm:grid-cols-2 h-9 items-center">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Email
              </dt>
              <dd className="text-sm leading-none text-gray-900 mt-2 sm:mt-0">
                {user?.email}
              </dd>
            </div>

            {hasPendingEmailChange && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-blue-700">
                      You have requested an email change. Please confirm it
                      through the links sent to both the old and the new email
                      addresses.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </dl>
        )}
      </div>
    </Card>
  )
}

export default UserInfoForm
