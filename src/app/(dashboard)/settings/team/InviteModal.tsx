"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useQueryState } from "next-usequerystate"
import { useEffect } from "react"

type Inputs = {
  name: string
  email: string
}

const InviteModal = () => {
  const { activeModal, closeModal, openModal } = useModals()
  const isOpen = activeModal === Modals.Invite
  const [, setEmail] = useQueryState("email")
  const getTeamMembersUpdater = useOptimisticUpdater("getTeamMembers")

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
    getTeamMembersUpdater.invalidate()
    setTimeout(() => {
      resetMutation()
      resetForm()
    }, 200)
  }

  const {
    mutateAsync: inviteUser,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: apiClient.inviteUser,
    onError: (error: any) =>
      setError("root.serverError", {
        message:
          error?.responseBody || "Something went wrong. Please try again.",
      }),
  })

  const sendInvite: SubmitHandler<Inputs> = async (data) => inviteUser(data)

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    resetForm()
    resetMutation()
    setEmail(email)
    closeModal()
    openModal(Modals.InviteConfirmed)
  }, [
    isSuccess,
    closeModal,
    openModal,
    setEmail,
    email,
    resetForm,
    resetMutation,
  ])

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

        <Button type="submit" loading={isPending}>
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
