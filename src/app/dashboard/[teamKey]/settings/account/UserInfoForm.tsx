"use client"

import { CheckIcon, PencilIcon } from "@heroicons/react/20/solid"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import Card from "@/components/Card"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { Alert } from "@/components/Alert"
import { HorizontalInput } from "@/components/HorizontalInput"
import { updateCurrentUser } from "@/actions/current-user/update-current-user"
import { User } from "@/types/types"
import { useTeamKey } from "@/hooks/useTeamKey"
import { logger } from "@/logger"
import { DashboardPage } from "@/components/DashboardPage"

// Track if the toast for email change has been shown already
let alerted = false

type Inputs = {
  name?: string
  email?: string
}

type UserInfoFormProps = {
  hasPendingEmailChange: boolean
  currentUser: User
}

const UserInfoForm = ({
  hasPendingEmailChange,
  currentUser,
}: UserInfoFormProps) => {
  const [user, setUser] = useState<User>(currentUser)
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm((prev) => !prev)
  const router = useRouter()
  const pathname = usePathname()
  const teamKey = useTeamKey()

  // Handle coming back to page from email change confirmation
  useEffect(() => {
    if (alerted || !pathname || !router) {
      return
    }

    const fragment = window.location.hash.substring(1)

    if (!fragment) {
      return
    }

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
      (name === user.name && email === user.email) ||
      (!name && email === user.email) ||
      (name === user.name && !email)
    ) {
      return toggleForm()
    }

    try {
      if (email !== user.email) {
        const supabase = createClientComponentClient()

        const { error } = await supabase.auth.updateUser(
          { email },
          {
            emailRedirectTo: `${document.location.origin}/dashboard/${teamKey}/settings/account`,
          },
        )

        if (error) {
          throw new Error("Email change failed.")
        }
      }

      if (name && name !== user.name) {
        setUser(await updateCurrentUser(user.user_id, { name }))
      }

      setShowForm(false)
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <DashboardPage
      heading="Account"
      actions={
        showForm ? (
          <>
            <Button
              variant="border"
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
          <Button variant="secondary" onClick={toggleForm}>
            <PencilIcon className="w-5 h-5" />
            <span>Edit</span>
          </Button>
        )
      }
    >
      <Card>
        <Card.Body>
          {showForm ? (
            <form onSubmit={handleSubmit(updateUser)} className="space-y-4">
              <HorizontalInput
                id="name"
                name="name"
                label="Name"
                autoComplete="name"
                register={register}
                registerOptions={{
                  value: user.name ?? "",
                }}
              />

              <HorizontalInput
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                register={register}
                registerOptions={{
                  value: user.email ?? "",
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
                <dt className="text-sm font-medium leading-none text-slate-500">
                  Name
                </dt>
                <dd className="mt-2 text-sm leading-none text-slate-900 sm:mt-0">
                  {user.name ?? "-"}
                </dd>
              </div>
              <div className="items-center sm:grid sm:grid-cols-2 h-9">
                <dt className="text-sm font-medium leading-none text-slate-500">
                  Email
                </dt>
                <dd className="mt-2 text-sm leading-none text-slate-900 sm:mt-0">
                  {user.email}
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
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default UserInfoForm
