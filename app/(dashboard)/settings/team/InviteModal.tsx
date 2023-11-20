"use client"

import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { Modals, useModals } from "@/hooks/useModals"
import Button from "@/components/Button"
import Modal from "@/components/Modal"

type Inputs = {
  name: string
  email: string
}

const InviteModal = () => {
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.InviteTeam

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<Inputs>()

  const email = watch("email")

  const handleClose = () => {
    closeModal()
    setTimeout(() => reset(), 200)
  }

  const sendMessage: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`/api/admin/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const { message } = await res.json()

      if (!res.ok) throw new Error(message)
    } catch (error: any) {
      return setError("root.serverError", {
        message: error.message,
      })
    }
  }

  return (
    <Modal title="Invite team member" open={isOpen} close={handleClose}>
      {isSubmitSuccessful ? (
        <div className="flex flex-col items-center justify-center mt-8 text-center">
          <CheckCircleIcon
            className="w-8 h-8 text-green-600"
            aria-hidden="true"
          />
          <h2 className="mt-3 text-base font-medium leading-4 text-gray-900">
            Invitation sent!
          </h2>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Invitation was sent to <br />
            {email}
          </p>
          <Button
            onClick={handleClose}
            size="sm"
            className="mt-4"
            style="secondary"
          >
            Close
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            An invitation will be sent to the specified email address. The link
            in the email will be valid for 24 hours.
          </p>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit(sendMessage)}>
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

            <Button type="submit" loading={isSubmitting}>
              <PaperAirplaneIcon className="w-5 h-5" />
              Send invitation
            </Button>
          </form>
          {errors?.root?.serverError ? (
            <p className="mt-4 text-sm font-medium text-red-500">
              {errors.root.serverError.message}
            </p>
          ) : null}
        </>
      )}
    </Modal>
  )
}

export default InviteModal
