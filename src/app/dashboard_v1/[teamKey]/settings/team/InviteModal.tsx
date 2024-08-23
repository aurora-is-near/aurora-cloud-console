"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { useQueryState } from "next-usequerystate"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { toError } from "@/utils/errors"
import { inviteUser } from "@/actions/invite/invite-user"
import { Team } from "@/types/types"

type Inputs = {
  name: string
  email: string
}

type InviteModalProps = {
  team: Team
}

const InviteModal = ({ team }: InviteModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { activeModal, closeModal, openModal } = useModals()
  const isOpen = activeModal === Modals.Invite
  const [, setEmail] = useQueryState("email")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    reset: resetForm,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const email = watch("email")

  const handleClose = () => {
    closeModal()
    router.refresh()
  }

  const sendInvite: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)

    try {
      await inviteUser(team, {
        ...data,
        origin: window.location.origin,
      })
    } catch (err) {
      setIsLoading(false)
      setError("root", {
        type: "serverError",
        message: toError(err).message,
      })

      return
    }

    setIsLoading(false)
    resetForm()
    await setEmail(email)
    closeModal()
    openModal(Modals.InviteConfirmed)
  }

  return (
    <Modal title="Invite team member" open={isOpen} close={handleClose}>
      <p className="mt-2 text-sm leading-5 text-gray-500">
        An invitation will be sent to the specified email address. The link in
        the email will be valid for 24 hours.
      </p>
      <form className="mt-4 space-y-6" onSubmit={handleSubmit(sendInvite)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            required
            {...register("name", {
              required: "Please enter a name.",
            })}
          />
          {errors.name?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            required
            {...register("email", {
              required: "Please enter an email address.",
            })}
          />
          {errors.email?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" loading={isLoading}>
          <PaperAirplaneIcon className="w-5 h-5" />
          Send invitation
        </Button>
      </form>
      {errors?.root?.serverError ? (
        <p className="mt-4 text-sm font-medium text-red-500">
          {errors.root.serverError.message}
        </p>
      ) : null}
    </Modal>
  )
}

export default InviteModal
